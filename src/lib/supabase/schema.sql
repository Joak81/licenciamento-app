-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  alert_preferences JSONB DEFAULT '{"email_enabled": true, "days_before_expiry": [30, 60, 90]}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create licenses table
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resumo TEXT NOT NULL,
  estado VARCHAR(50) NOT NULL CHECK (estado IN ('ativo', 'terminado', 'a_contratar')),
  fornecedor_codigo VARCHAR(255),
  conta_cg VARCHAR(255),
  centro_atividade VARCHAR(255),
  estrutura VARCHAR(255),
  codigo_epico VARCHAR(255),
  proposta VARCHAR(255),
  licenciamento TEXT NOT NULL,
  periodo_inicio DATE NOT NULL,
  periodo_fim DATE NOT NULL,
  preco_sem_iva DECIMAL(15,2) NOT NULL,
  valor_mensal_sem_iva DECIMAL(15,2) NOT NULL,
  preco_com_iva DECIMAL(15,2) NOT NULL,
  valor_mensal_com_iva DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Create alerts table
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
  alert_date DATE NOT NULL,
  days_before INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_licenses_estado ON licenses(estado);
CREATE INDEX idx_licenses_periodo_fim ON licenses(periodo_fim);
CREATE INDEX idx_licenses_fornecedor ON licenses(fornecedor_codigo);
CREATE INDEX idx_alerts_license_id ON alerts(license_id);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_alert_date ON alerts(alert_date);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_licenses_updated_at BEFORE UPDATE ON licenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate alerts
CREATE OR REPLACE FUNCTION generate_license_alerts()
RETURNS void AS $$
DECLARE
    lic RECORD;
    alert_days INT[] := ARRAY[30, 60, 90];
    days INT;
BEGIN
    -- Loop through active licenses
    FOR lic IN
        SELECT * FROM licenses
        WHERE estado = 'ativo'
        AND periodo_fim >= CURRENT_DATE
    LOOP
        -- For each alert day configuration
        FOREACH days IN ARRAY alert_days
        LOOP
            -- Check if alert should be created
            IF lic.periodo_fim - INTERVAL '1 day' * days <= CURRENT_DATE AND
               NOT EXISTS (
                   SELECT 1 FROM alerts
                   WHERE license_id = lic.id
                   AND days_before = days
                   AND status != 'dismissed'
               ) THEN
                -- Create alert
                INSERT INTO alerts (license_id, alert_date, days_before)
                VALUES (lic.id, lic.periodo_fim - INTERVAL '1 day' * days, days);
            END IF;
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY users_policy ON users
    FOR ALL USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY licenses_select_policy ON licenses
    FOR SELECT USING (true);

CREATE POLICY licenses_insert_policy ON licenses
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'editor')
    ));

CREATE POLICY licenses_update_policy ON licenses
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'editor')
    ));

CREATE POLICY licenses_delete_policy ON licenses
    FOR DELETE USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY alerts_policy ON alerts
    FOR ALL USING (true);