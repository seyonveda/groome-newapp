
# Groome - Beauty Service Marketplace

Groome is a modern, single-page application that connects customers with beauty service providers like makeup artists, hairdressers, and nail technicians. This repository serves as a production-ready starter kit built with React, Vite, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Artist Discovery**: Browse and search for beauty professionals.
- **Detailed Profiles**: View artist portfolios, services, and pricing.
- **Seamless Booking**: Easily book appointments with your chosen artist.
- **User Accounts**: Manage your profile and view your booking history.
- **Secure Authentication**: Powered by Supabase for user sign-up, login, and session management.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Backend**: Supabase (Database, Auth)

## Local Development Setup

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account and a new project.

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd groome-starter
npm install
```

### 3. Environment Variables

You need to connect the app to your Supabase project.

1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Log in to your Supabase dashboard.
3.  Go to your project's **Settings > API**.
4.  Find your **Project URL** and **anon public key**.
5.  Paste these values into your `.env` file:
    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
    ```

**Important**: Never commit your `.env` file to version control. The `.gitignore` file is already configured to prevent this. If you accidentally expose your keys, you should rotate them immediately in the Supabase dashboard.

### 4. Set up Supabase Tables

You will need to create `artists` and `bookings` tables in your Supabase database. You can use the SQL Editor in your Supabase dashboard to run the following queries:

**Artists Table:**
```sql
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT,
  location TEXT,
  bio TEXT,
  image_url TEXT,
  services JSONB,
  brands_used TEXT[],
  packages JSONB
);

-- Enable RLS
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to artists" ON artists FOR SELECT USING (true);

-- Insert some sample data (optional)
INSERT INTO artists (name, specialty, location, bio, image_url, services, brands_used, packages)
VALUES 
  ('Aisha Khan', 'Bridal Makeup', 'New York, NY', 'Specializing in creating timeless and elegant bridal looks.', 'https://picsum.photos/seed/aisha/400/400', '[{"name": "Bridal Makeup", "price": 450}, {"name": "Engagement Makeup", "price": 250}]', '{"MAC", "NARS", "Fenty Beauty"}', '[{"name": "Full Bridal Package", "price": 700, "includes": ["Makeup", "Hair Styling", "Saree Draping"]}]'),
  ('Maria Garcia', 'Hair Styling', 'Los Angeles, CA', 'Creative and passionate hairstylist with over 10 years of experience.', 'https://picsum.photos/seed/maria/400/400', '[{"name": "Haircut & Style", "price": 120}, {"name": "Updo", "price": 90}]', '{"Olaplex", "Redken", "Kerastase"}', '[{"name": "Wedding Hair Package", "price": 300, "includes": ["Bride Updo", "2 Bridesmaids"]}]');
```

**Bookings Table:**
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  artist_id UUID REFERENCES artists(id) NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  price NUMERIC NOT NULL,
  special_request TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own bookings
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create bookings for themselves
CREATE POLICY "Users can create their own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5. Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

## Deployment to Vercel

1.  Push your code to a GitHub, GitLab, or Bitbucket repository.
2.  Sign up for a [Vercel](https://vercel.com/) account and connect it to your Git provider.
3.  Create a new Vercel project and import your repository.
4.  Vercel will automatically detect that you're using Vite and configure the build settings.
5.  Go to your project's **Settings > Environment Variables** on Vercel and add your Supabase URL and anon key:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
6.  Trigger a new deployment. Vercel will build and deploy your application.

Your Groome app is now live!
