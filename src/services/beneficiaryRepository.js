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
    fps: { code: `FPS-${102 + (index % 4)}`, name: ["Shanti Nagar", "Sadar Bazaar", "Nehru Nagar", "Lake View"][index % 4] },
    entitlement: { wheat: "5 kg", rice: "5 kg", sugar: "1 kg", kerosene: "2 L" },
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
  return "demo-local";
}

// Optional backend contract: GET ${VITE_BENEFICIARY_API_URL}/beneficiaries.
// The browser never connects to MySQL directly; without this API the demo seed is used.
export async function fetchBeneficiaries() {
  const baseUrl = import.meta.env.VITE_BENEFICIARY_API_URL;
  if (!baseUrl) return listDemoBeneficiaries();
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/beneficiaries`);
  if (!response.ok) throw new Error(`Beneficiary API returned ${response.status}`);
  const records = await response.json();
  return Array.isArray(records) && records.length ? records : listDemoBeneficiaries();
}
