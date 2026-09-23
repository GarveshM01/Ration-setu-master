ALTER TABLE beneficiaries
  ADD COLUMN fps_location VARCHAR(160) NOT NULL DEFAULT '',
  ADD COLUMN history_json JSON NULL,
  ADD COLUMN notifications_json JSON NULL;
