-- Apply to the EXISTING Unfinished Notebooks identity database before enabling bridge.
CREATE TABLE IF NOT EXISTS jpd_auth_codes (
  code_hash text PRIMARY KEY,
  user_id text NOT NULL,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS jpd_auth_codes_expiry ON jpd_auth_codes(expires_at);
