# School Photographs Guide (`public/images`)

All imagery is served locally and displayed with `next/image`. Campus and gallery photographs are in `public/images/school/`. The homepage uses the supplied portrait of Mrs. Florence Wahito Thumbi at `public/images/principal.jpg`, with a neutral fallback if the file is missing.

## How to add or replace photographs

Place each photograph at the exact path below (keep filenames lowercase) and rebuild or redeploy the site. The pages detect the campus and principal photo slots automatically; the gallery and feature images reference their paths in the source. If the principal portrait changes size or proportions, update its dimensions and frame ratio in `src/components/home/PrincipalWelcome.tsx`.

### Core school photographs

| File path | Where it appears | Supplied size |
| --- | --- | --- |
| `public/images/school/hero-assembly.jpg` | Homepage campus hero (`/`) | `1599 × 899 px` landscape JPG |
| `public/images/school/gallery-campus-gate.jpg` | Main gate on `/contact` and in the School Serenity Environ album | `1600 × 900 px` landscape JPG |
| `public/images/school/academics-study.jpg` | Feature image on `/academics` | `1599 × 899 px` landscape JPG |
| `public/images/school/dean-of-studies.jpg` | Mr. Kiruri, Dean of Studies, beside the KCSE target on `/academics#kcse-target` | `900 × 1600 px` portrait JPG |
| `public/images/school/boarding-1.jpg` and `boarding-2.jpg` | Boarding corridor and wash area on `/explore#boarding` | `1600 × 900 px` landscape JPGs |
| `public/images/school/about-prize-1.jpg` and `about-prize-2.jpg` | Prize-giving photographs on `/about` | Portrait JPGs |
| `public/images/principal.jpg` | Mrs. Florence Wahito Thumbi, Chief Principal, on `/` | `514 × 528 px` portrait JPG |

### Gallery photographs (`/gallery`)

The supplied photographs and captions are assigned to albums in `src/data/mock-school-data.ts`. Gallery cards and the lightbox use responsive `next/image` sizes.

| Album | File paths |
| --- | --- |
| School Serenity Environ | `gallery-campus-serenity.jpg`, `gallery-campus-green-walk.jpg`, `gallery-campus-gate.jpg`, `gallery-campus-tahidi.jpg`, `gallery-campus-learning-corridors.jpg`, `gallery-campus-academic-block.jpg` |
| Prefect Body 2025/26 | `gallery-17.jpg`, `gallery-14.jpg` |
| 10th Technical Contest | `gallery-12.jpg` |
| Prayer Day 2025 | `gallery-05.jpg`, `gallery-08.jpg` |
| Prize Giving 2025 | `gallery-06.jpg`, `gallery-07.jpg`, `gallery-09.jpg` |
| STEM Innovation Fair 2025 | `gallery-04.jpg`, `gallery-11.jpg`, `gallery-15.jpg` |
| KSSSA Sports 2025 | `gallery-10.jpg`, `gallery-18.jpg`, `gallery-19.jpg`, `gallery-23.jpg` |

All gallery files are under `public/images/school/`. Recommended gallery source size is around `1200 × 800 px` or larger in a 3:2 landscape ratio.

### Official brand assets (keep in place)

- `public/images/mumbi-logo.png` — Official Mumbi Girls' Senior School crest (do not alter).
- `public/images/og-image.png` — Social preview card (`1200 × 630 px`) for link sharing.
