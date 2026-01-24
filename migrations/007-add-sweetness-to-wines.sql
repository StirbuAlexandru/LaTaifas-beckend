-- Add sweetness column to wines table for filtering
-- Sweetness levels: dulce (sweet), demidulce (semi-sweet), demisec (semi-dry), sec (dry)

ALTER TABLE public.wines
ADD COLUMN IF NOT EXISTS sweetness VARCHAR(20) CHECK (sweetness IN ('dulce', 'demidulce', 'demisec', 'sec'));

CREATE INDEX IF NOT EXISTS idx_wines_sweetness ON public.wines(sweetness);

COMMENT ON COLUMN public.wines.sweetness IS 'Wine sweetness level: dulce, demidulce, demisec, sec';
