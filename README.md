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
- **Official School Office Contact:** `+254711461192` · `mumbigirls1968@gmail.com`
- **Chief Principal:** Mrs. Florence Wahito Thumbi (January 2025 – Present)
- **School Motto:** *"Determined to Excel"*
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
   - Static crest hero with the official school crest, serif display heading, motto, provenance (`Mukuyu, Murang'a County · Est. 1960`), and automatic real photo slot (`public/images/hero/campus.jpg`).
   - Key school figures (Established 1960, 1,200+ students, 2025 KCSE mean of 7.1926 (C+), 3 CBC Senior School pathways).
   - Chief Principal's welcome message with portrait photo slot (`public/images/principal.jpg`).
   - Motto, Mission, Vision, and six Core Values.
   - 3-tab CBC Senior School Pathways overview (Grades 10–12).
   - Filterable KCSE Roll of Honour table.
   - School office notices, circulars, and downloads register.
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
   - 2026 KCSE school mean target (8.3+++) and a feature on Mr. Kiruri, Dean of Studies.
   - 2022–2025 KCSE results by year: school mean, candidate count, C+ attainment, grade distribution, and stream results.
   - KCSE Roll of Honour with reported ranks (including ties), shared with the home page.
5. **Student Life / Explore (`/explore`):**
   - Uniformed movements and clubs (Girl Guides, St. John Ambulance, Red Cross, Journalism, Drama, Wildlife, Integrity).
   - Competitive sports & games (Volleyball, Netball, Basketball, Hockey, Athletics, Handball).
   - Daily school routine timeline from morning prep (05:00 AM) to lights out (10:00 PM).
   - Chaplaincy & faith societies (CU, YCS, SDA, and Muslim Student Association).
   - Boarding, nutrition, and school uniform guide, with photos of the boarding area.
6. **Downloads & Resources Hub (`/downloads`):**
   - Client-side search and instant filter pills by Category, Target Class/Level, and Subject.
   - One-click file downloads with file size, upload date (`DD/MM/YYYY`), and uploader department.
7. **Photo & Media Gallery (`/gallery`):**
   - Filterable event albums with interactive lightbox viewer.
8. **Contact & Inquiries (`/contact`):**
   - Validated preview inquiry form; submissions are not delivered to the school office.
   - Mukuyu campus address card, contact numbers, and embedded map placeholder.
9. **Progressive Web App (PWA):**
   - Native `src/app/manifest.ts` configured for standalone installation.
   - Dismissible smart install banner for mobile users.
10. **Grade 10 Admissions (`/admissions`):**
    - Reporting date and checklist, Ministry of Education placement link, school fee guidance, and a full-size uniform colour reference photo.

### Updating KCSE results

- Add verified cohorts in `src/data/kcse.ts` and list them from newest to oldest. The newest published cohort opens by default on Academics and the home page Roll of Honour.
- Copy the stated school mean and stream means as printed. Add grade counts and ranked performers, retaining ties. Candidate counts and C+ or higher totals are calculated from the grade counts.
- Do not publish the source reports, admission numbers, staff IDs, or unverified placements. Keep targets separate from results; a C+ attainment rate is not a university transition rate.

### Updating the Grade 10 intake

- Edit `src/data/admissions.ts` to change the intake year or reporting date (`YYYY-MM-DD`). Keep `reportingDateProvisional` set to `true` until the school confirms the date.
- Populate `fees.amounts` with approved amounts in Kenyan shillings and a label specifying what each amount covers (for example, a term or annual total). Set `fees.scheduleUrl` if the school publishes an approved fee schedule. Otherwise the site directs families to the school office to confirm the fee.
- The uniform reference uses an existing school prize-giving photo. If a dedicated school-approved photo replaces it, update the image source, dimensions, and description in `src/app/admissions/page.tsx`.

---

## Adding Real School Photographs

Drop JPG files at the paths below and rebuild/redeploy — pages detect them automatically without code changes (see [`public/images/README.md`](public/images/README.md) for recommended dimensions):

- **Homepage hero:** `public/images/hero/campus.jpg`
- **Chief Principal portrait:** `public/images/principal.jpg`
- **Campus location (`/contact`):** `public/images/campus-location.jpg`
- **Event gallery (`/gallery`):** `public/images/gallery/prayer-{1,2,3}.jpg`, `agm-{1,2,3}.jpg`, `stem-{1,2,3}.jpg`, `sports-{1,2,3}.jpg`

---

## Tech Stack
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript
- **Typography:** Source Serif 4 (display & headings) + Inter (body), bundled locally via `next/font/local`
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Backend & Database:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`) — deferred to portal phase

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
