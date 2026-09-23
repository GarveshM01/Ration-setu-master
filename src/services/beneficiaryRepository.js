const DEMO_BENEFICIARIES = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(3, "0");
  const names = [
    ["Seema Devi", "सीमा देवी", 5],
    ["Rajesh Kumar", "राजेश कुमार", 4],
    ["Mohit Verma", "मोहित वर्मा", 3],
    ["Kavita Bai", "कविता बाई", 6],
    ["Imran Khan", "इमरान खान", 4],
    ["Sunita Devi", "सुनीता देवी", 5],
    ["Aarav Sharma", "आरव शर्मा", 3],
    ["Pooja Yadav", "पूजा यादव", 4],
    ["Ramesh Patel", "रमेश पटेल", 6],
    ["Kamla Bai", "कमला बाई", 2],
    ["Meena Joshi", "मीना जोशी", 5],
    ["Dinesh Singh", "दिनेश सिंह", 4],
  ][index];
  const fps = [
    ["FPS-102", "Shanti Nagar", "Ward 12, Bhopal"],
    ["FPS-103", "Sadar Bazaar", "Ward 4, Indore"],
    ["FPS-104", "Nehru Nagar", "Ward 9, Gwalior"],
    ["FPS-105", "Lake View", "Ward 16, Jabalpur"],
  ][index % 4];
  return {
    id: `BEN-${number}`,
    cardNo: `MP-45-${String(1234 + index).padStart(4, "0")}-${String(5678 + index).padStart(4, "0")}`,
    mobile: `987654${String(3210 + index).padStart(4, "0")}`,
    name: { en: names[0], hi: names[1] },
    categoryKey: index % 5 === 0 ? "priorityHousehold" : "priorityHousehold",
    familyCount: names[2],
    familyMembers: [
      { name: names[0], relKey: "self", age: 30 + index, ekyc: "ekycVerified" },
      { name: index % 2 ? "Rakesh Kumar" : "Sunita Devi", relKey: "spouse", age: 29 + index, ekyc: "ekycVerified" },
      { name: "Aarav Sharma", relKey: "son", age: 12, ekyc: index % 3 ? "ekycVerified" : "ekycPending" },
    ].slice(0, names[2]),
    fps: { code: fps[0], name: fps[1], location: fps[2] },
    entitlement: { wheat: "5 kg", rice: "5 kg", sugar: "1 kg", kerosene: "2 L" },
    history: [
      { month: "August 2026", token: `A${String(89 + index).padStart(3, "0")}`, status: "completed", date: `${14 - (index % 5)} August 2026`, shop: `${fps[0]} · ${fps[1]}`, txnId: `TXN-202608${14 - (index % 5)}-${89 + index}` },
      { month: "July 2026", token: `A${String(52 + index).padStart(3, "0")}`, status: "completed", date: `${12 - (index % 4)} July 2026`, shop: `${fps[0]} · ${fps[1]}`, txnId: `TXN-202607${12 - (index % 4)}-${52 + index}` },
    ],
    notifications: [
      { icon: "bell", title: { en: "Monthly entitlement available", hi: "मासिक हक़ उपलब्ध है" }, body: { en: `September 2026 entitlement is ready for ${fps[1]}.`, hi: `${fps[1]} के लिए सितंबर 2026 का हक़ उपलब्ध है।` } },
      { icon: "info", title: { en: "Carry your ration card", hi: "अपना राशन कार्ड साथ लाएं" }, body: { en: `Visit ${fps[0]} during your assigned window.`, hi: `${fps[0]} पर निर्धारित समय में आएं।` } },
    ],
  };
});

export function listDemoBeneficiaries() {
  return DEMO_BENEFICIARIES;
}

export function findBeneficiary(identifier) {
  const normalized = String(identifier || "").trim().toUpperCase();
  return DEMO_BENEFICIARIES.find((record) =>
    record.id === normalized || record.cardNo.toUpperCase() === normalized || record.mobile === normalized
  ) || null;
}

export function getBeneficiarySource() {
  return import.meta.env.VITE_BENEFICIARY_API_URL ? "mysql-api" : "demo-local";
}

export async function fetchBeneficiary(identifier) {
  const baseUrl = import.meta.env.VITE_BENEFICIARY_API_URL;
  if (!baseUrl) return findBeneficiary(identifier);
  const normalized = String(identifier || "").trim().toUpperCase();
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/beneficiaries/${encodeURIComponent(normalized)}`);
  if (!response.ok) throw new Error(`Beneficiary API returned ${response.status}`);
  return response.json();
}

export async function fetchBeneficiaries() {
  const baseUrl = import.meta.env.VITE_BENEFICIARY_API_URL;
  if (!baseUrl) return listDemoBeneficiaries();
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/beneficiaries`);
  if (!response.ok) throw new Error(`Beneficiary API returned ${response.status}`);
  const records = await response.json();
  return Array.isArray(records) && records.length ? records : listDemoBeneficiaries();
}

export async function createBeneficiaryToken(beneficiaryId, mode, scheduledTime) {
  const baseUrl = import.meta.env.VITE_BENEFICIARY_API_URL;
  if (!baseUrl) return null;
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/beneficiaries/${encodeURIComponent(beneficiaryId)}/tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, scheduledTime }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || `Token API returned ${response.status}`);
    error.status = response.status;
    error.token = payload.token;
    throw error;
  }
  return payload;
}

export async function cancelBeneficiaryToken(tokenId) {
  const baseUrl = import.meta.env.VITE_BENEFICIARY_API_URL;
  if (!baseUrl) return false;
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/tokens/${encodeURIComponent(tokenId)}`, { method: "DELETE" });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || `Token API returned ${response.status}`);
  }
  return true;
}
