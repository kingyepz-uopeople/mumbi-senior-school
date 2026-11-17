# School Photographs Guide (`public/images`)

All imagery is served locally. Until verified school photographs are supplied, the website renders a solid crest-blue hero (with a subtle pattern drawn from the school crest) and clean neutral **"Photo coming soon"** frames rather than stock or vector illustrations.

## How to add real photographs

Place each photograph at the exact path below (keep filenames lowercase) and rebuild or redeploy the site. Each page automatically detects the file and displays it via `next/image` — no code edits are required.

### Core campus photographs

| File path | Where it appears | Recommended size |
| --- | --- | --- |
| `public/images/hero/campus.jpg` | Homepage hero (`/`) | `1600 × 1067 px` (3:2 landscape JPG) |
| `public/images/principal.jpg` | Chief Principal section on `/` | `800 × 1000 px` (4:5 portrait JPG) |
| `public/images/campus-location.jpg` | Campus location section on `/contact` | `1200 × 675 px` (16:9 landscape JPG) |

### Event gallery photographs (`/gallery`)

Recommended size: `1200 × 800 px` or `960 × 640 px` (3:2 landscape JPG). To rename albums, change captions, or add more photographs, edit `galleryAlbums` in `src/data/mock-school-data.ts`.

| Album | File paths |
| --- | --- |
| Prayer Day 2024 | `public/images/gallery/prayer-1.jpg`, `public/images/gallery/prayer-2.jpg`, `public/images/gallery/prayer-3.jpg` |
| AGM & Prize Giving 2024 | `public/images/gallery/agm-1.jpg`, `public/images/gallery/agm-2.jpg`, `public/images/gallery/agm-3.jpg` |
| STEM Innovation Fair 2024 | `public/images/gallery/stem-1.jpg`, `public/images/gallery/stem-2.jpg`, `public/images/gallery/stem-3.jpg` |
| KSSSA Sports 2024 | `public/images/gallery/sports-1.jpg`, `public/images/gallery/sports-2.jpg`, `public/images/gallery/sports-3.jpg` |

### Official brand assets (keep in place)

- `public/images/mumbi-logo.png` — Official Mumbi Girls' Senior School crest (do not alter).
- `public/images/og-image.png` — Social preview card (`1200 × 630 px`) for link sharing.
