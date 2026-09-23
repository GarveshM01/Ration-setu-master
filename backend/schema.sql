CREATE TABLE IF NOT EXISTS beneficiaries (
  id VARCHAR(20) PRIMARY KEY,
  card_no VARCHAR(32) NOT NULL UNIQUE,
  mobile VARCHAR(15) NOT NULL UNIQUE,
  name_json JSON NOT NULL,
  category_key VARCHAR(64) NOT NULL,
  family_count TINYINT UNSIGNED NOT NULL,
  family_members_json JSON NOT NULL,
  fps_code VARCHAR(20) NOT NULL,
  fps_name VARCHAR(120) NOT NULL,
  fps_location VARCHAR(160) NOT NULL,
  entitlement_json JSON NOT NULL,
  history_json JSON NOT NULL,
  notifications_json JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tokens (
  token_id VARCHAR(32) PRIMARY KEY,
  beneficiary_id VARCHAR(20) NOT NULL,
  mode ENUM('online', 'qr') NOT NULL,
  status ENUM('waiting', 'serving', 'completed', 'cancelled', 'noshow') NOT NULL DEFAULT 'waiting',
  scheduled_time VARCHAR(32) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tokens_beneficiary FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id),
  INDEX idx_tokens_beneficiary_status (beneficiary_id, status)
);
