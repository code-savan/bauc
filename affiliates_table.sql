-- Create affiliates table
CREATE TABLE public.affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  country TEXT NOT NULL,
  interest_reason TEXT NOT NULL,
  experience TEXT NOT NULL,
  marketing_methods TEXT[] NOT NULL,
  other_method TEXT,
  account_name TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  bank_country TEXT NOT NULL,
  terms_agreed BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Add RLS policies
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting data (allows anyone to insert)
CREATE POLICY "Allow public inserts" ON public.affiliates
  FOR INSERT WITH CHECK (true);

-- Create policy for selecting data (only authenticated users can view)
CREATE POLICY "Allow authenticated reads" ON public.affiliates
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create index on email for faster lookups
CREATE INDEX affiliates_email_idx ON public.affiliates (email);

-- Add unique constraint on email
ALTER TABLE public.affiliates ADD CONSTRAINT unique_affiliate_email UNIQUE (email);

-- Add comment to table
COMMENT ON TABLE public.affiliates IS 'Table for storing BAUC affiliate applications';
