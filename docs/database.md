# Database Schema

The CampusFix database uses PostgreSQL, provided by Supabase.

## Tables

### 1. `profiles`
Stores user profile information and extends the built-in Supabase `auth.users` table.

- `id` (UUID): Primary key, references `auth.users.id`
- `full_name` (TEXT): The user's full name
- `email` (TEXT): The user's email address
- `role` (TEXT): User role (`STUDENT` or `ADMIN`)
- `created_at` (TIMESTAMP): Creation timestamp

### 2. `complaints`
Stores all student complaints.

- `id` (UUID): Primary key
- `complaint_number` (TEXT): Human-readable unique ID (e.g., CMP-1001)
- `user_id` (UUID): References `profiles.id`
- `title` (TEXT): Brief issue description
- `description` (TEXT): Detailed issue explanation
- `category` (TEXT): Type of issue (e.g., Network, Electrical)
- `location` (TEXT): Physical location of the issue
- `priority` (TEXT): LOW, MEDIUM, or HIGH
- `status` (TEXT): SUBMITTED, UNDER_REVIEW, IN_PROGRESS, RESOLVED, REJECTED
- `admin_remarks` (TEXT): Notes added by the administrator
- `created_at` (TIMESTAMP): Submission date
- `updated_at` (TIMESTAMP): Last updated date

## Relationships

- `complaints.user_id` -> `profiles.id` (Many-to-One)

## Triggers and Functions

- `generate_complaint_number()`: Automatically generates sequential CMP-XXXX numbers.
- `set_updated_at()`: Automatically updates the `updated_at` timestamp whenever a complaint is modified.
