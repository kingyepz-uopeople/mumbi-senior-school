# School Photographs Guide (`public/images`)

All imagery is served locally. The school's supplied photographs are stored in `public/images/school/` and displayed with `next/image`. Until a verified Chief Principal portrait is supplied, the homepage keeps its neutral portrait placeholder rather than misidentifying another person.

## How to add or replace photographs

Place each photograph at the exact path below (keep filenames lowercase) and rebuild or redeploy the site. The pages detect the campus and principal photo slots automatically; the gallery and feature images reference their paths in the source.

### Core school photographs

| File path | Where it appears | Supplied size |
| --- | --- | --- |
| `public/images/school/hero-assembly.jpg` | Homepage campus hero (`/`) | `1599 × 899 px` landscape JPG |
| `public/images/school/gallery-04.jpg` | Campus entrance on `/contact` | `1599 × 899 px` landscape JPG |
| `public/images/school/academics-study.jpg` | Feature image on `/academics` | `1599 × 899 px` landscape JPG |
| `public/images/school/dean-of-studies.jpg` | Mr. Kiruri, Dean of Studies, beside the KCSE target on `/academics#kcse-target` | `900 × 1600 px` portrait JPG |
| `public/images/school/boarding-1.jpg` and `boarding-2.jpg` | Boarding corridor and wash area on `/explore#boarding` | `1600 × 900 px` landscape JPGs |
| `public/images/school/about-prize-1.jpg` and `about-prize-2.jpg` | Prize-giving photographs on `/about` | Portrait JPGs |
| `public/images/principal.jpg` | Chief Principal section on `/` | `800 × 1000 px` portrait JPG |

### Event gallery photographs (`/gallery`)

The uploaded gallery photographs are assigned to the existing event albums in `src/data/mock-school-data.ts`. Gallery cards and the lightbox use responsive `next/image` sizes.

| Album | File paths |
| --- | --- |
| Prayer Day 2024 | `gallery-05.jpg`, `gallery-08.jpg`, `gallery-17.jpg` |
| AGM & Prize Giving 2024 | `gallery-06.jpg`, `gallery-07.jpg`, `gallery-09.jpg`, `gallery-12.jpg` |
| STEM Innovation Fair 2024 | `gallery-04.jpg`, `gallery-11.jpg`, `gallery-14.jpg`, `gallery-15.jpg` |
| KSSSA Sports 2024 | `gallery-10.jpg`, `gallery-18.jpg`, `gallery-19.jpg`, `gallery-23.jpg` |

All event gallery files are under `public/images/school/`. Recommended gallery source size is around `1200 × 800 px` or larger in a 3:2 landscape ratio.

### Official brand assets (keep in place)

- `public/images/mumbi-logo.png` — Official Mumbi Girls' Senior School crest (do not alter).
- `public/images/og-image.png` — Social preview card (`1200 × 630 px`) for link sharing.
