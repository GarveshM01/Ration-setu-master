const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/+$/, "");
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Persists a WhatsApp notification when a Supabase project is configured.
 * Without configuration this intentionally resolves locally so the prototype
 * remains fully usable and never requires credentials to run.
 */
export async function saveWhatsAppMessage(message) {
  const record = {
    contact_id: message.contactId,
    contact_name: message.contact,
    phone_number: message.number,
    message: message.message,
    status: message.status,
    sent_at: message.sentAt,
  };

  if (!isSupabaseConfigured) {
    return { ...message, persistence: "demo" };
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/whatsapp_messages`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error(`Supabase WhatsApp persistence failed (${response.status})`);
  }

  return { ...message, persistence: "supabase" };
}
