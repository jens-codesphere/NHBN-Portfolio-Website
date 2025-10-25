/*
  # Portfolio Database Schema

  ## Overview
  Creates tables to store portfolio content including projects, honors, extracurriculars, 
  leadership positions, work experience, and gallery items.

  ## New Tables

  ### `projects`
  - `id` (uuid, primary key)
  - `title` (text) - Project name
  - `description` (text) - Project description
  - `tech_stack` (text[]) - Array of technologies used
  - `github_url` (text, optional) - GitHub repository link
  - `live_url` (text, optional) - Live project link
  - `image_url` (text, optional) - Project screenshot
  - `display_order` (integer) - Order for display
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `honors`
  - `id` (uuid, primary key)
  - `title` (text) - Award title
  - `category` (text) - Category (e.g., "City-level English Olympiad")
  - `description` (text) - Award description
  - `date_received` (date) - When award was received
  - `icon_type` (text) - Icon identifier for display
  - `display_order` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `extracurriculars`
  - `id` (uuid, primary key)
  - `title` (text) - Activity title
  - `role` (text) - Your role
  - `start_date` (date)
  - `end_date` (date, optional) - null for ongoing
  - `description` (text)
  - `highlights` (text[]) - Array of key achievements
  - `tags` (text[]) - Skills/categories
  - `icon_type` (text)
  - `display_order` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `leadership`
  - `id` (uuid, primary key)
  - `title` (text) - Position title
  - `organization` (text) - Organization name
  - `role` (text) - Your leadership role
  - `start_date` (date)
  - `end_date` (date, optional)
  - `description` (text)
  - `impact_metrics` (text[]) - Key achievements/metrics
  - `icon_type` (text)
  - `display_order` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `work_experience`
  - `id` (uuid, primary key)
  - `title` (text) - Job title
  - `company` (text) - Company name
  - `start_date` (date)
  - `end_date` (date, optional)
  - `description` (text)
  - `responsibilities` (text[])
  - `skills` (text[])
  - `icon_type` (text)
  - `display_order` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `gallery_items`
  - `id` (uuid, primary key)
  - `category` (text) - Gallery category (e.g., 'major-conquest', 'piano')
  - `title` (text) - Item title
  - `description` (text) - Item description
  - `image_url` (text, optional) - Image URL
  - `display_order` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Public read access for portfolio content
  - Authenticated-only write access for content management

  ## Notes
  - All tables use UUID primary keys for scalability
  - Timestamps track creation and updates
  - display_order allows custom sorting
  - Arrays store multiple values (tags, highlights, etc.)
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  github_url text,
  live_url text,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create honors table
CREATE TABLE IF NOT EXISTS honors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  date_received date NOT NULL,
  icon_type text DEFAULT 'award',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create extracurriculars table
CREATE TABLE IF NOT EXISTS extracurriculars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  role text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL,
  highlights text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  icon_type text DEFAULT 'activity',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leadership table
CREATE TABLE IF NOT EXISTS leadership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  role text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL,
  impact_metrics text[] DEFAULT '{}',
  icon_type text DEFAULT 'leadership',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create work_experience table
CREATE TABLE IF NOT EXISTS work_experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL,
  responsibilities text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  icon_type text DEFAULT 'briefcase',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE honors ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracurriculars ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access for honors"
  ON honors FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access for extracurriculars"
  ON extracurriculars FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access for leadership"
  ON leadership FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access for work_experience"
  ON work_experience FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access for gallery_items"
  ON gallery_items FOR SELECT
  TO anon
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS projects_display_order_idx ON projects(display_order);
CREATE INDEX IF NOT EXISTS honors_display_order_idx ON honors(display_order);
CREATE INDEX IF NOT EXISTS honors_date_idx ON honors(date_received DESC);
CREATE INDEX IF NOT EXISTS extracurriculars_display_order_idx ON extracurriculars(display_order);
CREATE INDEX IF NOT EXISTS leadership_display_order_idx ON leadership(display_order);
CREATE INDEX IF NOT EXISTS work_experience_display_order_idx ON work_experience(display_order);
CREATE INDEX IF NOT EXISTS gallery_items_category_idx ON gallery_items(category, display_order);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_honors_updated_at
  BEFORE UPDATE ON honors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_extracurriculars_updated_at
  BEFORE UPDATE ON extracurriculars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leadership_updated_at
  BEFORE UPDATE ON leadership
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_experience_updated_at
  BEFORE UPDATE ON work_experience
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_items_updated_at
  BEFORE UPDATE ON gallery_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
