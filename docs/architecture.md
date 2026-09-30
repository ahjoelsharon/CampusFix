# CampusFix Architecture

## Overview

CampusFix uses a modern full-stack architecture optimized for fast delivery and high scalability.
It leverages React for the frontend and Supabase (PostgreSQL + Auth) for the backend.

## System Flow

```
     Student                       Admin
        |                            |
        v                            v
  +-----------+                +-----------+
  |           |                |           |
  | React SPA |                | React SPA |
  |           |                |           |
  +-----+-----+                +-----+-----+
        |                            |
        v                            v
  +----------------------------------------+
  |              Supabase Auth             |
  +----------------------------------------+
        |                            |
        v                            v
  +----------------------------------------+
  |       Supabase PostgreSQL Database     |
  |            (with RLS policies)         |
  +----------------------------------------+
```

## Security (Row Level Security)

All database security is enforced at the database level using Supabase Row Level Security (RLS).
- Students can only read and write their own complaints.
- Admins can read and update all complaints.
- The UI reacts to these rules and presents the correct views based on the authenticated user's role.
