-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('STUDENT', 'ADMIN')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT
    USING ( true );

CREATE POLICY "Users can insert their own profile."
    ON public.profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
    ON public.profiles FOR UPDATE
    USING ( auth.uid() = id );

-- Table: complaints
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    priority TEXT DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    status TEXT DEFAULT 'SUBMITTED' CHECK (status IN ('SUBMITTED', 'UNDER_REVIEW', 'IN_PROGRESS', 'RESOLVED', 'REJECTED')),
    admin_remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on complaints
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Complaints Policies

-- Student can view their own complaints
CREATE POLICY "Students can view own complaints"
    ON public.complaints FOR SELECT
    USING ( auth.uid() = user_id );

-- Student can insert their own complaints
CREATE POLICY "Students can insert own complaints"
    ON public.complaints FOR INSERT
    WITH CHECK ( auth.uid() = user_id );

-- Admins can view all complaints
CREATE POLICY "Admins can view all complaints"
    ON public.complaints FOR SELECT
    USING ( 
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'
        )
    );

-- Admins can update all complaints
CREATE POLICY "Admins can update all complaints"
    ON public.complaints FOR UPDATE
    USING ( 
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'
        )
    );

-- Function to generate complaint number automatically
CREATE OR REPLACE FUNCTION generate_complaint_number()
RETURNS TRIGGER AS $$
DECLARE
    next_id INT;
BEGIN
    -- Get the next sequence value or start at 1001
    SELECT COALESCE(MAX(NULLIF(regexp_replace(complaint_number, '\D', '', 'g'), '')::INT), 1000) + 1
    INTO next_id
    FROM public.complaints;
    
    NEW.complaint_number := 'CMP-' || next_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function on insert
CREATE TRIGGER set_complaint_number
BEFORE INSERT ON public.complaints
FOR EACH ROW
WHEN (NEW.complaint_number IS NULL OR NEW.complaint_number = '')
EXECUTE FUNCTION generate_complaint_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at timestamp
CREATE TRIGGER set_complaints_updated_at
BEFORE UPDATE ON public.complaints
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
