You are an expert full-stack web developer and autonomous coding agent.

I want you to BUILD a complete, working, production-quality MVP web application called:

==================================================
CAMPUSFIX
College Complaint & Issue Tracking System
==================================================

IMPORTANT CONTEXT:

I am a college student and I need to complete this project within a very
short period of time.

Therefore, DO NOT over-engineer this project.

The priority is:

1. A fully working application
2. Real authentication
3. Real database
4. Real student/admin roles
5. Real complaint submission
6. Real complaint tracking
7. Real admin status updates
8. Professional UI
9. Clean GitHub repository
10. Easy deployment

Do NOT add unnecessary advanced features.

Do NOT add:
- AI chatbot
- Amazon Bedrock
- AWS Lambda
- AWS AppSync
- DynamoDB
- payment systems
- email notification systems
- SMS
- complicated microservices
- WebSockets
- complicated backend servers
- unnecessary third-party APIs
- unnecessary animations

Use a simple architecture that can realistically be completed quickly.

==================================================
1. TECHNOLOGY STACK
==================================================

Frontend:

- React
- Vite
- JavaScript
- Tailwind CSS

Backend / Database / Authentication:

- Supabase
- Supabase Authentication
- Supabase PostgreSQL database
- Supabase Row Level Security

Deployment:

- Vercel

Version control:

- Git
- GitHub

Use the official Supabase JavaScript client.

Do NOT use Firebase.

Do NOT use MongoDB.

Do NOT create an Express backend.

Do NOT introduce another backend framework unless absolutely necessary.

==================================================
2. CORE IDEA
==================================================

CampusFix is a college campus complaint management system.

Students can report problems such as:

- Wi-Fi not working
- Classroom projector not working
- Broken lights
- Water problems
- Electrical problems
- Cleaning issues
- Broken desks/chairs
- Laboratory equipment problems
- College bus issues
- Other campus problems

The system allows students to:

- Create an account
- Login
- Submit complaints
- Receive a unique complaint ID
- View their complaints
- Track complaint status
- View admin remarks
- See when their complaint was updated

Administrators can:

- Login
- View all complaints
- Search complaints
- Filter complaints
- View complete complaint details
- Change complaint status
- Change complaint priority
- Add admin remarks
- Resolve/reject complaints

==================================================
3. APPLICATION ARCHITECTURE
==================================================

Use this simple architecture:

                 CAMPUSFIX
                     |
          ┌──────────┴──────────┐
          |                     |
       STUDENT                ADMIN
          |                     |
          └──────────┬──────────┘
                     |
                React App
                     |
                 Supabase
              /            \
       Authentication     PostgreSQL
                           Database

Supabase should handle:

- Authentication
- User profiles
- Complaints
- Database operations
- Row Level Security

==================================================
4. USER ROLES
==================================================

There are exactly two roles:

STUDENT
ADMIN

Every authenticated user must have a role.

STUDENT permissions:

- Register
- Login
- Logout
- View own dashboard
- Submit complaints
- View own complaints
- Track own complaints
- View admin remarks
- View complaint status
- Update their own basic profile

Students MUST NOT:

- View other students' complaints
- Change complaint status
- Access admin dashboard
- Access admin-only data

ADMIN permissions:

- Login
- Logout
- View admin dashboard
- View all complaints
- Search complaints
- Filter complaints
- View complaint details
- Change complaint status
- Change complaint priority
- Add admin remarks

There must NOT be a public admin registration page.

The admin account should be created manually through Supabase.

==================================================
5. AUTHENTICATION
==================================================

Use Supabase Authentication.

Student registration should contain:

- Full Name
- Email
- Password
- Confirm Password

Student login:

- Email
- Password

Admin login:

Use the same Supabase authentication system, but after login determine
the user's role from the profiles table.

Routing:

If role = STUDENT:

/student/dashboard

If role = ADMIN:

/admin/dashboard

Implement protected routes.

If a user is not authenticated:

Redirect them to login.

If a student attempts to access an admin route:

Show an unauthorized page or redirect to student dashboard.

If an admin attempts to access student-only functionality:

Handle appropriately.

Include:

- Logout
- Session persistence
- Loading state while checking authentication
- Authentication error messages

Do not store passwords manually in the database.

Use Supabase Auth.

==================================================
6. DATABASE
==================================================

Use Supabase PostgreSQL.

Create two main tables:

--------------------------------------------------
TABLE 1: profiles
--------------------------------------------------

Fields:

id
- UUID
- Primary Key
- References auth.users.id

full_name
- TEXT
- NOT NULL

email
- TEXT
- NOT NULL

role
- TEXT
- NOT NULL
- Allowed values:
  STUDENT
  ADMIN

created_at
- TIMESTAMP WITH TIME ZONE
- Default current timestamp

--------------------------------------------------
TABLE 2: complaints
--------------------------------------------------

Fields:

id
- UUID
- Primary Key
- Automatically generated

complaint_number
- TEXT
- UNIQUE
- Example:
  CMP-1001

user_id
- UUID
- References profiles.id

title
- TEXT
- NOT NULL

description
- TEXT
- NOT NULL

category
- TEXT
- NOT NULL

location
- TEXT
- NOT NULL

priority
- TEXT
- Default MEDIUM

Allowed priority values:

LOW
MEDIUM
HIGH

status
- TEXT
- Default SUBMITTED

Allowed status values:

SUBMITTED
UNDER_REVIEW
IN_PROGRESS
RESOLVED
REJECTED

admin_remarks
- TEXT
- Nullable

created_at
- TIMESTAMP WITH TIME ZONE
- Default current timestamp

updated_at
- TIMESTAMP WITH TIME ZONE
- Default current timestamp

==================================================
7. COMPLAINT ID
==================================================

Every complaint must receive a human-readable complaint number.

Example:

CMP-1001
CMP-1002
CMP-1003

The complaint number must be unique.

Do NOT use only the UUID as the visible complaint number.

Students should see the human-readable complaint number.

Example:

"Your complaint has been submitted successfully."

"Complaint ID: CMP-1001"

==================================================
8. ROW LEVEL SECURITY
==================================================

This is very important.

Implement Supabase Row Level Security properly.

Students:

- Can read their own profile
- Can read their own complaints
- Can insert complaints belonging to themselves
- Cannot read other students' complaints
- Cannot modify another user's complaints
- Cannot change status
- Cannot change priority
- Cannot modify admin remarks

Admins:

- Can read all complaints
- Can update complaints
- Can change status
- Can change priority
- Can add admin remarks

Do not rely only on frontend hiding.

Use actual database security policies.

Create the necessary SQL policies.

==================================================
9. PAGES
==================================================

Create these pages:

PUBLIC:

/
Landing Page

/login
Login Page

/register
Student Registration

/unauthorized
Unauthorized Page

404
Not Found Page


STUDENT:

/student/dashboard
Student Dashboard

/student/complaints
My Complaints

/student/complaints/new
Submit Complaint

/student/complaints/:id
Complaint Details / Tracking

/student/profile
Student Profile


ADMIN:

/admin/dashboard
Admin Dashboard

/admin/complaints
All Complaints

/admin/complaints/:id
Admin Complaint Details

/admin/profile
Admin Profile

==================================================
10. LANDING PAGE
==================================================

Create a polished modern SaaS-style landing page.

Main branding:

CAMPUSFIX

Tagline:

"Report. Track. Resolve."

Description:

"CampusFix makes it easier for students to report campus problems
and track them until they are resolved."

Primary button:

"Report a Problem"

Secondary button:

"Track Complaint"

Include a "How It Works" section:

1. Report
Student reports a campus issue.

2. Track
Student receives a complaint ID and tracks progress.

3. Resolve
College administrators update and resolve the issue.

Include example categories:

Network
Electrical
Classroom
Water
Laboratory
Cleaning
Transport
Other

Include a simple footer.

The landing page should look like a real software product,
not a basic college assignment.

==================================================
11. LOGIN
==================================================

Create a clean login page.

Fields:

Email
Password

Button:

Login

Links:

Create Student Account
Back to Home

After successful login:

STUDENT -> Student Dashboard

ADMIN -> Admin Dashboard

Show useful authentication error messages.

==================================================
12. STUDENT REGISTRATION
==================================================

Fields:

Full Name
Email
Password
Confirm Password

Validation:

- All fields required
- Valid email
- Password minimum length
- Password confirmation must match

After successful registration:

Create Supabase Auth account.

Create corresponding profile.

Default role:

STUDENT

Then redirect to student dashboard or login.

Do not allow the user to choose ADMIN during registration.

==================================================
13. STUDENT DASHBOARD
==================================================

Create a professional dashboard.

Header:

CampusFix

Welcome, [Student Name]

Display statistics:

Total Complaints
Submitted
In Progress
Resolved

Example:

Total Complaints: 5
Submitted: 1
In Progress: 2
Resolved: 2

Show recent complaints.

Example:

CMP-1001
Wi-Fi not working
Network
Block A
HIGH
IN PROGRESS

CMP-1002
Projector problem
Classroom
Block B
RESOLVED

Buttons:

Report New Issue
View My Complaints

==================================================
14. SUBMIT COMPLAINT
==================================================

Create a clean complaint form.

Fields:

Title
Description
Category
Location
Priority

Category options:

Network / Wi-Fi
Electrical
Water
Classroom
Laboratory
Cleaning
Transport
Other

Priority options:

Low
Medium
High

Required fields must be validated.

Button:

Submit Complaint

On submission:

1. Validate form
2. Insert complaint into Supabase
3. Generate complaint number
4. Set initial status to SUBMITTED
5. Set created_at
6. Set updated_at
7. Display success screen

Success screen:

"Complaint Submitted Successfully"

"Your Complaint ID"

CMP-1001

Button:

Track Complaint

==================================================
15. MY COMPLAINTS
==================================================

Show only complaints belonging to the logged-in student.

Use cards or a responsive table.

Each complaint should show:

Complaint ID
Title
Category
Location
Priority
Status
Created Date

Add:

Search
Status Filter
Category Filter

Possible status filters:

All
Submitted
Under Review
In Progress
Resolved
Rejected

Clicking a complaint opens:

/student/complaints/:id

==================================================
16. STUDENT COMPLAINT TRACKING
==================================================

This is one of the most important features.

Display:

Complaint ID
Title
Description
Category
Location
Priority
Current Status
Created Date
Last Updated
Admin Remarks

Create a visual status tracker:

✓ Submitted
|
✓ Under Review
|
● In Progress
|
○ Resolved

The current status must be highlighted.

Example:

SUBMITTED
Completed

UNDER REVIEW
Completed

IN PROGRESS
Current

RESOLVED
Pending

The status must come from Supabase.

Do NOT hardcode tracking information.

If admin changes the status, the student should see the updated status
when the complaint is loaded again.

==================================================
17. ADMIN DASHBOARD
==================================================

Create a separate professional admin dashboard.

Display cards:

Total Complaints
Submitted
Under Review
In Progress
Resolved

Example:

Total: 24
Submitted: 6
Under Review: 5
In Progress: 8
Resolved: 5

Show recent complaints.

Create a responsive complaints table.

Columns:

Complaint ID
Title
Student
Category
Location
Priority
Status
Date
Action

Action:

View

==================================================
18. ADMIN COMPLAINT MANAGEMENT
==================================================

Admin can open:

/admin/complaints/:id

Display:

Complaint ID
Student Name
Student Email
Title
Description
Category
Location
Priority
Status
Created Date
Updated Date
Admin Remarks

Admin can modify:

Status:

SUBMITTED
UNDER_REVIEW
IN_PROGRESS
RESOLVED
REJECTED

Priority:

LOW
MEDIUM
HIGH

Admin can enter:

Admin Remarks

Button:

Update Complaint

When clicked:

- Update Supabase database
- Update updated_at
- Show success message

The student must see the updated information.

==================================================
19. ADMIN SEARCH AND FILTER
==================================================

Admin complaints page must include:

Search box.

Search by:

Complaint ID
Title
Student name
Category

Filters:

Status
Priority
Category

Allow admin to clear filters.

==================================================
20. PROFILE
==================================================

Student profile:

Display:

Name
Email
Role

Allow student to update:

Name

Do not allow changing role.

Admin profile:

Display:

Name
Email
Role

Do not allow admin to change their role from the UI.

==================================================
21. NAVIGATION
==================================================

Student navbar/sidebar:

CampusFix

Dashboard
My Complaints
Report Issue
Profile
Logout

Admin navbar/sidebar:

CampusFix

Dashboard
All Complaints
Profile
Logout

Use different navigation based on role.

Do not expose admin navigation to students.

==================================================
22. DESIGN
==================================================

The UI must look modern and professional.

Design style:

- Modern SaaS dashboard
- Clean
- Minimal
- Professional
- Responsive
- Easy to understand

Suggested visual direction:

Primary:
Dark navy / deep blue

Accent:
Blue / teal

Background:
Light gray / white

Use:

- Cards
- Rounded corners
- Subtle shadows
- Status badges
- Clean tables
- Progress tracker
- Modern forms
- Consistent spacing

Use status badge colors appropriately:

Submitted
Under Review
In Progress
Resolved
Rejected

Do not use excessive gradients.

Do not use excessive animations.

Use subtle hover transitions only.

==================================================
23. RESPONSIVE DESIGN
==================================================

The application must work on:

Desktop
Laptop
Tablet
Mobile

Important:

- Navbar should work on mobile
- Dashboard cards should stack properly
- Tables should remain usable
- Forms should be mobile friendly
- Complaint tracking should work on mobile

==================================================
24. LOADING STATES
==================================================

Whenever data is being loaded:

Show a loading indicator.

Examples:

Loading complaints...
Loading dashboard...
Submitting complaint...
Updating complaint...

Do not show blank screens while waiting.

==================================================
25. ERROR HANDLING
==================================================

Handle errors properly.

Examples:

Invalid login:
"Invalid email or password."

Duplicate email:
"An account with this email already exists."

Missing fields:
"Please fill in all required fields."

Database error:
"Something went wrong. Please try again."

Unauthorized:
"You do not have permission to access this page."

Complaint not found:
"Complaint not found."

Use user-friendly messages.

Do not expose raw database errors to normal users.

==================================================
26. EMPTY STATES
==================================================

If a student has no complaints:

"No complaints yet."

Button:

Report Your First Issue

If admin has no complaints:

"No complaints found."

If a filter returns no results:

"No complaints match your filters."

==================================================
27. SECURITY
==================================================

Do not expose:

- Supabase service role key
- Passwords
- Secret keys

Use:

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

Create:

.env.example

Add .env to .gitignore.

Only the public Supabase client credentials should be used
in the frontend.

Database security must be handled using RLS.

==================================================
28. PROJECT STRUCTURE
==================================================

Use a clean maintainable structure similar to:

src/
  components/
  pages/
    public/
    student/
    admin/
  layouts/
  lib/
  services/
  hooks/
  context/
  utils/

Keep components reusable.

Create a central Supabase client.

Separate database/service logic from UI where practical.

Do not create hundreds of unnecessary files.

Keep the code understandable.

==================================================
29. SUPABASE SETUP
==================================================

Create the SQL needed to set up:

profiles table
complaints table

Create:

- Primary keys
- Foreign keys
- Required fields
- Appropriate indexes
- RLS policies
- Necessary constraints

Create a SQL file:

supabase/schema.sql

This file must contain the database setup.

If appropriate, create helper functions/triggers for:

- Creating profile after registration
- Generating complaint numbers
- Updating updated_at

Keep these mechanisms simple and reliable.

==================================================
30. ADMIN ACCOUNT
==================================================

Do NOT create an admin registration form.

Provide documentation explaining:

1. Create a user in Supabase Authentication.
2. Add/update the corresponding profile.
3. Set:

role = ADMIN

Provide the exact SQL or instructions necessary.

Make sure the application correctly recognizes the admin.

==================================================
31. ENVIRONMENT VARIABLES
==================================================

Create:

.env.example

Containing:

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

Do not place real credentials in source code.

==================================================
32. GITHUB
==================================================

Prepare the project for GitHub.

Create:

.gitignore

Ensure the following are NOT committed:

.env
node_modules
build/dist files where appropriate
local secrets

Create a professional README.md.

README must contain:

# CampusFix

## Overview

## Problem Statement

## Features

## User Roles

## Technology Stack

## Application Architecture

## Database Structure

## Authentication

## How Complaint Tracking Works

## Supabase Setup

## Environment Variables

## Running Locally

## Creating Admin Account

## Deployment

## GitHub

## Future Improvements

## Screenshots

==================================================
33. DOCUMENTATION
==================================================

Create:

docs/
  architecture.md
  database.md

architecture.md:

Explain:

Student
   |
React
   |
Supabase Auth
   |
Supabase PostgreSQL
   |
Admin
   |
Status Update
   |
Student Tracking

database.md:

Explain:

profiles table

complaints table

Relationships

Roles

RLS

==================================================
34. SAMPLE DATA
==================================================

Create optional sample data for demonstration.

Example complaints:

CMP-1001
Wi-Fi not working
Network / Wi-Fi
Block A - 2nd Floor
HIGH
IN_PROGRESS

CMP-1002
Classroom light not working
Electrical
Block B
MEDIUM
RESOLVED

CMP-1003
Projector not working
Classroom
Block C
HIGH
UNDER_REVIEW

Do not hardcode these into the React frontend.

If sample SQL is created, place it separately:

supabase/seed.sql

==================================================
35. IMPORTANT: ACTUALLY BUILD THE APPLICATION
==================================================

Do NOT merely describe the code.

Actually create the files.

Actually implement the application.

Actually install required dependencies.

Actually run the development/build commands.

Actually check for compilation errors.

Actually fix errors you encounter.

Do not stop after generating the frontend.

The final result must be a functional full-stack application.

==================================================
36. TESTING
==================================================

After implementation, test the important flows.

Test:

1. Student registration
2. Student login
3. Student logout
4. Student dashboard
5. Submit complaint
6. Complaint appears in database
7. Complaint appears in student's complaints
8. Complaint tracking works
9. Admin login
10. Admin dashboard
11. Admin sees complaints
12. Admin updates status
13. Admin updates priority
14. Admin adds remarks
15. Student sees updated status
16. Student cannot access admin dashboard
17. Student cannot see another student's complaints
18. Admin can access all complaints
19. Protected routes work
20. Production build succeeds

Fix any errors discovered during testing.

==================================================
37. DEPLOYMENT
==================================================

Prepare the project for deployment on Vercel.

Make sure:

- npm run build works
- environment variables are documented
- routing works correctly
- Supabase URL/key are configured
- no secrets are committed

Provide deployment instructions in README.

==================================================
38. FINAL PROJECT QUALITY
==================================================

Before finishing, inspect the entire project.

Remove:

- unused imports
- unused files
- unnecessary packages
- console errors
- placeholder text
- fake functionality
- broken links
- unfinished components

Make sure:

- UI is consistent
- navigation works
- authentication works
- database works
- roles work
- complaint tracking works
- admin updates work
- responsive design works
- production build works

==================================================
39. DO NOT CHANGE THE SCOPE
==================================================

The following are OUT OF SCOPE:

❌ AI chatbot
❌ AI complaint classification
❌ Amazon Bedrock
❌ AWS services
❌ Payment
❌ SMS
❌ Email automation
❌ Push notifications
❌ Maps
❌ File upload
❌ Chat
❌ Real-time WebSockets
❌ Multiple institutions
❌ Complex analytics
❌ Mobile app
❌ Microservices

Do not add these features.

If you think an additional feature would be useful, DO NOT implement it.
Keep the project focused on the requested MVP.

==================================================
40. FINAL RESPONSE AFTER BUILDING
==================================================

After completing the implementation, provide a concise report containing:

1. What was built
2. Project structure
3. Technologies used
4. Supabase setup required
5. Environment variables required
6. How to create the admin account
7. How to run locally
8. How to deploy
9. How to push to GitHub
10. Features completed
11. Any remaining manual steps
12. Any known limitations

MOST IMPORTANT:

Do not just generate a theoretical solution.

BUILD THE COMPLETE CAMPUSFIX APPLICATION NOW.

Use your coding tools/terminal to create, modify, run and test the project.

If you encounter errors while building, diagnose and fix them yourself.

Prioritize a working MVP over additional features.