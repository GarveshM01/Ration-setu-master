import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { randomUUID } from "node:crypto";

const app = express();
const port = Number(process.env.API_PORT || 8787);
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: Number(process.env.MYSQL_POOL_SIZE || 5),
  ssl: process.env.MYSQL_SSL === "true" ? { rejectUnauthorized: true } : undefined,
});

app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((value) => value.trim()) : true }));
app.use(express.json({ limit: "32kb" }));

const ACTIVE_STATUSES = ["waiting", "serving"];
const idPattern = /^BEN-\d{3}$/;

function normalizeId(value) {
  return String(value || "").trim().toUpperCase();
}

function parseJson(value, fallback) {
  if (value && typeof value === "object") return value;
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function mapBeneficiary(row) {
  return {
    id: row.id,
    cardNo: row.card_no,
    mobile: row.mobile,
    name: parseJson(row.name_json, {}),
    categoryKey: row.category_key,
    familyCount: row.family_count,
    familyMembers: parseJson(row.family_members_json, []),
    fps: { code: row.fps_code, name: row.fps_name, location: row.fps_location },
    entitlement: parseJson(row.entitlement_json, {}),
    history: parseJson(row.history_json, []),
    notifications: parseJson(row.notifications_json, []),
  };
}

function mapToken(row) {
  return { id: row.token_id, mode: row.mode, status: row.status, time: row.scheduled_time, ownerId: row.beneficiary_id };
}

app.get("/health", async (_req, res, next) => {
  try { await pool.query("SELECT 1"); res.json({ ok: true, database: "mysql" }); } catch (error) { next(error); }
});

app.get("/beneficiaries", async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM beneficiaries ORDER BY id");
    res.json(rows.map(mapBeneficiary));
  } catch (error) { next(error); }
});

app.get("/beneficiaries/:id", async (req, res, next) => {
  const identifier = String(req.params.id || "").trim();
  const id = normalizeId(identifier);
  if (!idPattern.test(id) && !/^MP-\d{2}-\d{4}-\d{4}$/.test(id) && !/^\d{10}$/.test(id)) return res.status(400).json({ error: "Use a BEN ID, ration card number, or 10-digit mobile number." });
  try {
    const [rows] = await pool.query("SELECT * FROM beneficiaries WHERE id = ? OR card_no = ? OR mobile = ? LIMIT 1", [id, id, id]);
    if (!rows[0]) return res.status(404).json({ error: "Beneficiary not found." });
    res.json(mapBeneficiary(rows[0]));
  } catch (error) { next(error); }
});

app.get("/beneficiaries/:id/tokens", async (req, res, next) => {
  const id = normalizeId(req.params.id);
  if (!idPattern.test(id)) return res.status(400).json({ error: "Invalid beneficiary ID." });
  try {
    const [rows] = await pool.query("SELECT token_id, beneficiary_id, mode, status, scheduled_time FROM tokens WHERE beneficiary_id = ? ORDER BY created_at DESC", [id]);
    res.json(rows.map(mapToken));
  } catch (error) { next(error); }
});

app.post("/beneficiaries/:id/tokens", async (req, res, next) => {
  const id = normalizeId(req.params.id);
  const mode = String(req.body?.mode || "").trim().toLowerCase();
  if (!idPattern.test(id) || !["online", "qr"].includes(mode)) return res.status(400).json({ error: "Valid beneficiary ID and mode (online or qr) are required." });
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [beneficiaries] = await connection.query("SELECT id FROM beneficiaries WHERE id = ? FOR UPDATE", [id]);
    if (!beneficiaries[0]) { await connection.rollback(); return res.status(404).json({ error: "Beneficiary not found." }); }
    const [active] = await connection.query("SELECT token_id, status FROM tokens WHERE beneficiary_id = ? AND status IN (?, ?) LIMIT 1 FOR UPDATE", [id, ...ACTIVE_STATUSES]);
    if (active[0]) {
      await connection.rollback();
      return res.status(409).json({ error: "An active token already exists. Cancel it before generating another token.", token: mapToken(active[0]) });
    }
    const tokenId = `API-${randomUUID().slice(0, 8).toUpperCase()}`;
    const scheduledTime = req.body?.scheduledTime || "10:30 AM";
    await connection.query("INSERT INTO tokens (token_id, beneficiary_id, mode, status, scheduled_time) VALUES (?, ?, ?, 'waiting', ?)", [tokenId, id, mode, scheduledTime]);
    await connection.commit();
    res.status(201).json({ id: tokenId, ownerId: id, mode, status: "waiting", time: scheduledTime });
  } catch (error) { await connection.rollback(); next(error); } finally { connection.release(); }
});

app.delete("/tokens/:tokenId", async (req, res, next) => {
  const tokenId = String(req.params.tokenId || "").trim();
  if (!/^API-[A-Z0-9-]{8,}$/.test(tokenId)) return res.status(400).json({ error: "Invalid API token ID." });
  try {
    const [result] = await pool.query("UPDATE tokens SET status = 'cancelled' WHERE token_id = ? AND status = 'waiting'", [tokenId]);
    if (!result.affectedRows) return res.status(404).json({ error: "Waiting token not found or already resolved." });
    res.status(204).end();
  } catch (error) { next(error); }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Database service error." });
});

app.listen(port, () => console.log(`RationSetu API listening on http://localhost:${port}`));
