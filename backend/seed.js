import "dotenv/config";
import mysql from "mysql2/promise";

const names = [
  ["Seema Devi", "सीमा देवी", 5], ["Rajesh Kumar", "राजेश कुमार", 4], ["Mohit Verma", "मोहित वर्मा", 3],
  ["Kavita Bai", "कविता बाई", 6], ["Imran Khan", "इमरान खान", 4], ["Sunita Devi", "सुनीता देवी", 5],
  ["Aarav Sharma", "आरव शर्मा", 3], ["Pooja Yadav", "पूजा यादव", 4], ["Ramesh Patel", "रमेश पटेल", 6],
  ["Kamla Bai", "कमला बाई", 2], ["Meena Joshi", "मीना जोशी", 5], ["Dinesh Singh", "दिनेश सिंह", 4],
];
const fpsNames = ["Shanti Nagar", "Sadar Bazaar", "Nehru Nagar", "Lake View"];
const rows = names.map(([en, hi, familyCount], index) => [
  `BEN-${String(index + 1).padStart(3, "0")}`,
  `MP-45-${String(1234 + index).padStart(4, "0")}-${String(5678 + index).padStart(4, "0")}`,
  `987654${String(3210 + index).padStart(4, "0")}`,
  JSON.stringify({ en, hi }),
  "priorityHousehold",
  familyCount,
  JSON.stringify([{ name: en, relKey: "self", age: 30 + index, ekyc: "ekycVerified" }, { name: "Rakesh Kumar", relKey: "spouse", age: 29 + index, ekyc: "ekycVerified" }, { name: "Aarav Sharma", relKey: "son", age: 12, ekyc: "ekycPending" }].slice(0, familyCount)),
  `FPS-${102 + (index % 4)}`,
  fpsNames[index % 4],
  ["Ward 12, Bhopal", "Ward 4, Indore", "Ward 9, Gwalior", "Ward 16, Jabalpur"][index % 4],
  JSON.stringify({ wheat: "5 kg", rice: "5 kg", sugar: "1 kg", kerosene: "2 L" }),
  JSON.stringify([{ month: "August 2026", token: `A${String(89 + index).padStart(3, "0")}`, status: "completed", date: `${14 - (index % 5)} August 2026`, shop: `FPS-${102 + (index % 4)} · ${fpsNames[index % 4]}`, txnId: `TXN-202608${14 - (index % 5)}-${89 + index}` }, { month: "July 2026", token: `A${String(52 + index).padStart(3, "0")}`, status: "completed", date: `${12 - (index % 4)} July 2026`, shop: `FPS-${102 + (index % 4)} · ${fpsNames[index % 4]}`, txnId: `TXN-202607${12 - (index % 4)}-${52 + index}` }]),
  JSON.stringify([{ icon: "bell", title: { en: "Monthly entitlement available", hi: "मासिक हक़ उपलब्ध है" }, body: { en: "September 2026 entitlement is ready.", hi: "सितंबर 2026 का हक़ उपलब्ध है।" } }]),
]);

const pool = mysql.createPool({ host: process.env.MYSQL_HOST, port: Number(process.env.MYSQL_PORT || 3306), user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE });
try {
  await pool.query("INSERT INTO beneficiaries (id, card_no, mobile, name_json, category_key, family_count, family_members_json, fps_code, fps_name, entitlement_json, fps_location, history_json, notifications_json) VALUES ? ON DUPLICATE KEY UPDATE card_no=VALUES(card_no), mobile=VALUES(mobile), name_json=VALUES(name_json), family_count=VALUES(family_count), family_members_json=VALUES(family_members_json), fps_code=VALUES(fps_code), fps_name=VALUES(fps_name), entitlement_json=VALUES(entitlement_json), fps_location=VALUES(fps_location), history_json=VALUES(history_json), notifications_json=VALUES(notifications_json)", [rows]);
  console.log(`Seeded ${rows.length} beneficiaries.`);
} finally { await pool.end(); }
