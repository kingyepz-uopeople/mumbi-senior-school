# Mumbi Girls Senior School (`mumbiseniorschool.sc.ke`)
### Official School Website, CBC Senior School Pathways Hub & PWA Student/Staff Portal

A production-ready, modern web platform for **Mumbi Girls Senior School**, built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide Icons, and Supabase.

---

## School Profile & Registry
- **Official Name:** Mumbi Girls Senior School
- **Category:** C2 Public Girls' Boarding Senior School
- **KNEC Centre Code:** `10204102`
- **MoE Registration No:** `F2030609`
- **Postal Address:** P.O. Box 115 - 10200, Murang'a
- **Physical Location:** Mukuyu Sub-location, Kiharu Constituency, Murang'a East, Murang'a County, Kenya
- **Office Hours:** Monday – Friday: 08:00 AM – 05:00 PM | Weekends: Closed
- **School Motto:** *"Education for Empowerment"*
- **Brand Colors (Official Crest Palette):**
  - **Primary:** Crest Blue (`#115191`) with Deep Crest Blue (`#0C3D6E`) for hover states & dark sections
  - **Secondary:** Crisp White (`#FFFFFF`)
  - **Accent (small highlights, badges & underlines):** Crest Red (`#C22F2F`)
  - **Background:** Clean Slate (`#F8FAFC`)

---

## Key Features & Site Architecture

1. **Top Utility Bar & Sticky Navigation:**
   - Displays KNEC Centre Code `10204102`, postal address, office hours, student/staff login shortcuts, and mobile PWA install trigger.
2. **Home (`/`):**
   - 5-slide interactive Hero Carousel.
   - Quick statistics strip (Founded 1960, 1,200+ students, 78% university transition rate, 3 CBC pathways).
   - Chief Principal's welcome message and signature block.
   - Foundational pillars (Motto, Mission, Vision, and Core Values).
   - Interactive 3-tab CBC Senior School Pathways preview.
   - KCSE Wall of Fame filterable top scholars grid.
   - Latest circulars, newsletters, and quick downloads.
3. **About Us (`/about`):**
   - Historical background and transition to Mumbi Girls Senior School.
   - Dual School Anthems card (English *School Anthem* & Kiswahili *Wimbo wa Shule*).
   - Roll of Principals timeline (1960 to Present).
   - Board of Management (BOM) Chairpersons timeline.
   - Administrative Deputies and democratic Student Council governance.
4. **Academics & CBC Pathways (`/academics`):**
   - Comprehensive CBC Senior School Pathways Explorer for Grades 10–12:
     - **STEM:** Pure Sciences, Applied Sciences, Technical & Engineering.
     - **Social Sciences:** Humanities, Business Studies, Languages & Literature.
     - **Arts & Sports Science:** Performing Arts, Visual Arts, Sports Science.
   - Academic Departments directory with HOD profiles and subject distributions.
   - Full KCSE Wall of Fame filterable by examination year.
5. **Student Life / Explore (`/explore`):**
   - Uniformed movements and clubs (Girl Guides, St. John Ambulance, Red Cross, Journalism, Drama, Wildlife, Integrity).
   - Competitive sports & games (Volleyball, Netball, Basketball, Hockey, Athletics, Handball).
   - Daily school routine timeline from morning prep (05:00 AM) to lights out (10:00 PM).
   - Chaplaincy & faith societies (CU, YCS, SDA, and Muslim Student Association).
   - Boarding, nutrition, and school uniform guide.
6. **Downloads & Resources Hub (`/downloads`):**
   - Client-side search and instant filter pills by Category, Target Class/Level, and Subject.
   - One-click file downloads with file size, upload date (`DD/MM/YYYY`), and uploader department.
7. **Photo & Media Gallery (`/gallery`):**
   - Filterable event albums with interactive lightbox viewer.
8. **Contact & Inquiries (`/contact`):**
   - Validated interactive inquiry form with Supabase database integration and local fallback.
   - Mukuyu campus address card, contact numbers, and embedded map placeholder.
9. **Progressive Web App (PWA):**
   - Native `src/app/manifest.ts` configured for standalone installation.
   - Dismissible smart install banner for mobile users.

---

## Tech Stack
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend & Database:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`) with automatic mock fallback

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(The application works 100% out-of-the-box using built-in mock data if Supabase credentials are not provided.)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
