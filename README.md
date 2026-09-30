# CampusFix

## Overview
CampusFix is a modern, responsive web application for college campuses that allows students to report, track, and manage campus issues efficiently. It provides dedicated dashboards for both students and administrators.

## Problem Statement
College campuses often lack a streamlined process for reporting infrastructure and facility issues. Students struggle to track the progress of their complaints, while administrators lack a centralized system to manage and resolve them. CampusFix solves this by providing a unified platform.

## Features
- **Student Portal**: Register, login, submit complaints, and track their real-time status.
- **Admin Portal**: View all complaints, filter/search, update statuses, change priorities, and add remarks.
- **Real-time Tracking**: Visual progress tracker for complaints.
- **Role-based Access**: Secure routing and data access based on user roles (STUDENT vs ADMIN).
- **Responsive Design**: Works flawlessly on desktop, tablet, and mobile devices.

## User Roles
- **STUDENT**: Can submit complaints and view only their own complaints.
- **ADMIN**: Can view and manage all complaints across the entire campus.

## Technology Stack
- **Frontend**: React (Vite), JavaScript, Tailwind CSS, React Router, Lucide React (Icons)
- **Backend/Database**: Supabase (Authentication, PostgreSQL Database, Row Level Security)
- **Deployment**: Vercel (Recommended)

## Application Architecture
See [docs/architecture.md](docs/architecture.md) for details.

## Database Structure
See [docs/database.md](docs/database.md) for details.

## Authentication
Uses Supabase Auth for secure email/password login. Passwords are encrypted and managed securely by Supabase.

## How Complaint Tracking Works
1. Student submits a complaint (Status: `SUBMITTED`).
2. An automatic human-readable ID (e.g., `CMP-1001`) is generated.
3. Admin reviews and updates the status (`UNDER_REVIEW`, `IN_PROGRESS`, `RESOLVED`, `REJECTED`).
4. Student views the updated status and any admin remarks in their dashboard.

## Supabase Setup
1. Create a new project in [Supabase](https://supabase.com).
2. Go to the SQL Editor.
3. Copy the contents of `supabase/schema.sql` and run it to create tables, functions, triggers, and RLS policies.
4. (Optional) Run `supabase/seed.sql` to insert sample data.

## Environment Variables
Create a `.env` file in the root directory based on `.env.example`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running Locally
1. Clone the repository.
2. Install dependencies: `npm install`
3. Setup environment variables (`.env`).
4. Start development server: `npm run dev`

## Creating Admin Account
There is no public registration for admins for security reasons. To create an admin:
1. Register a user normally through the Student Registration page (or manually in Supabase Auth dashboard).
2. Go to the Supabase Table Editor.
3. Open the `profiles` table.
4. Find the row for the new user and change their `role` from `STUDENT` to `ADMIN`.

## Deployment
1. Push the code to GitHub.
2. Go to [Vercel](https://vercel.com) and create a new project.
3. Connect your GitHub repository.
4. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Environment Variables in Vercel.
5. Deploy.

## Future Improvements
- Add email notifications when complaint status changes.
- Allow image uploads for complaints (e.g., photo of a broken chair).
- Implement campus location mapping.
