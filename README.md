# Next.js MySQL SSR Dashboard

A simple Next.js application demonstrating **Server-Side Rendering (SSR)** with MySQL, pagination, and a clean Tailwind-based UI.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- MySQL
- Tailwind CSS
- mysql2

---

## Features

- Server-side rendering (SSR)
- MySQL database integration
- Pagination using query parameters
- Clean and minimal UI using Tailwind CSS
- Service-layer architecture for database logic
- Basic error handling for database operations

---

## Project Structure
src/

app → Pages (App Router) / Global CSS  
lib → DB connection  
services → Business logic (queries)

---

## Setup Instructions

```bash
### 1. Clone the repository

git clone https://github.com/donovanakessler-prog/next-mysql-app
cd next-mysql-app

### 2. Install dependencies

npm install

### 3. Setup environment variables
Under your '.env', that is provided to according to your localhost

DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=sample_db

### 4. Create database & seed database

npm run seed

### 5. Start the development server


npm run dev

### 6. Open in browser
http://localhost:3000
