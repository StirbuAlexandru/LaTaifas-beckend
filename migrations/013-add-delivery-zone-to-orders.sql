-- Add delivery_zone_id column to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_zone_id UUID;

-- Add foreign key constraint
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_delivery_zone 
FOREIGN KEY (delivery_zone_id) 
REFERENCES delivery_zones(id) 
ON DELETE SET NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_delivery_zone ON orders(delivery_zone_id);
