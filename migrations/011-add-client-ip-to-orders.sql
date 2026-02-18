-- Add client_ip column to orders table for fraud detection and chargeback defense
-- Conform ghid ING WebPay - secțiunea 1.4.2 (Abordarea riscului)

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS client_ip VARCHAR(45);

-- Add index for efficient IP tracking queries
CREATE INDEX IF NOT EXISTS idx_orders_client_ip ON orders(client_ip);

-- Add comment
COMMENT ON COLUMN orders.client_ip IS 'IP address of client for fraud detection and chargeback defense (ING WebPay compliance)';
