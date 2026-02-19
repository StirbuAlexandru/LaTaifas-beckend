-- Add ing_order_id column to orders table to store ING WebPay mdOrder
-- This is the orderId returned by register.do and used for getOrderStatusExtended.do

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS ing_order_id VARCHAR(255);

-- Add index for efficient lookups by ING order ID
CREATE INDEX IF NOT EXISTS idx_orders_ing_order_id ON orders(ing_order_id);

-- Add comment
COMMENT ON COLUMN orders.ing_order_id IS 'ING WebPay mdOrder (orderId) returned by register.do, used for payment verification';
