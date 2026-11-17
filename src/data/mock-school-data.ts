// ============================================================
// Mumbi Girls Senior School - Mock Data
// Serves as full public-site data before Supabase is connected.
// All dates strictly follow DD/MM/YYYY.
// ============================================================

import {
  SchoolInfo,
  HeroSlide,
  QuickStat,
  TopStudent,
  NewsItem,
  Principal,
  BOMChairperson,
  GovernanceRole,
  Department,
  Club,
  DailyRoutineItem,
  BoardingSection,
  DownloadItem,
  GalleryAlbum,
  CBCPathway,
} from '@/types';

// ── School Profile ──────────────────────────────────────────
export const schoolInfo: SchoolInfo = {
  name: 'Mumbi Girls Senior School',
  motto: 'Education for Empowerment',
  mission:
    'To provide a holistic, inclusive, and quality education that empowers girls to become competent, ethical, and transformative leaders in a dynamic global society.',
  vision:
    'A centre of excellence nurturing empowered girls who are innovative, morally upright, and globally competitive.',
  coreValues: [
    {
      title: 'Academic Excellence',
      description:
        'Pursuing mastery across every subject, continuous inquiry, and strong national examination readiness.',
    },
    {
      title: 'Integrity & Accountability',
      description:
        'Upholding honesty, personal responsibility, and ethical stewardship in academic and campus life.',
    },
    {
      title: 'Discipline & Self-Governance',
      description:
        'Respecting time, community standards, and democratic student leadership inside and outside class.',
    },
    {
      title: 'Innovation & Creativity',
      description:
        'Encouraging scientific curiosity, artistic expression, digital literacy, and practical problem-solving.',
    },
    {
      title: 'Faith & Moral Uprightness',
      description:
        'Nurturing character, compassion, service, and spiritual growth across diverse faith traditions.',
    },
    {
      title: 'Inclusivity & Respect for Diversity',
      description:
        'Fostering a welcoming boarding sisterhood where every learner is valued, supported, and heard.',
    },
  ],
  knecCode: '10204102',
  moeReg: 'F2030609',
  postalAddress: "P.O. Box 115 - 10200, Murang'a",
  physicalLocation:
    "Mukuyu Sub-location, Kiharu Constituency, Murang'a East, Murang'a County, Kenya",
  officeHours: 'Monday – Friday: 08:00 – 17:00 | Weekends: Closed',
  officeHoursShort: 'Mon–Fri: 08:00 – 17:00',
  email: 'info@mumbiseniorschool.sc.ke',
  phonePlaceholder: '+254 (0) 700 000 000 (Office Line Placeholder)',
  founded: 1960,
  category: "C2 Public Girls' Boarding Senior School",
  domain: 'mumbiseniorschool.sc.ke',
};

// ── Hero Slides ─────────────────────────────────────────────
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "Est. 1960 • Mukuyu, Murang'a",
    title: 'Welcome to Mumbi Girls Senior School',
    subtitle:
      'Empowering young women through quality education, discipline, and innovation since 1960.',
    image: '/images/hero/admin-block.webp',
    alt: 'Illustrated campus backdrop of Mumbi Girls Senior School administration block in crest blue and white',
    ctaLabel: 'Discover Our Heritage',
    ctaHref: '/about',
  },
  {
    id: 2,
    eyebrow: 'Character & Governance',
    title: 'Student Leadership & Parade',
    subtitle:
      "Nurturing tomorrow's leaders through democratic student council governance and disciplined formations.",
    image: '/images/hero/parade.webp',
    alt: 'Illustrated ceremonial parade plaza backdrop representing student leadership at Mumbi Girls Senior School',
    ctaLabel: 'Explore Student Life',
    ctaHref: '/explore',
  },
  {
    id: 3,
    eyebrow: 'CBC Senior School Pathways',
    title: 'Science & STEM Excellence',
    subtitle:
      'Well-equipped laboratories driving discovery across Pure Sciences, Applied Sciences, and Technical & Engineering tracks.',
    image: '/images/hero/stem-lab.webp',
    alt: 'Illustrated science and STEM geometry backdrop for Mumbi Girls Senior School laboratories',
    ctaLabel: 'Explore CBC Pathways',
    ctaHref: '/academics#pathways',
  },
  {
    id: 4,
    eyebrow: 'Talent & Expression',
    title: 'Cultural & Music Festival Champions',
    subtitle:
      'Celebrating creative excellence through drama, choral music, visual arts, and cultural showcases.',
    image: '/images/hero/cultural.webp',
    alt: 'Illustrated stage spotlight backdrop representing music, drama, and cultural festivals',
    ctaLabel: 'View Campus Gallery',
    ctaHref: '/gallery',
  },
  {
    id: 5,
    eyebrow: 'Service & Sisterhood',
    title: 'Girl Guides & St. John Ambulance',
    subtitle:
      'Building resilience, civic duty, and compassionate community service through uniformed movements.',
    image: '/images/hero/guides.webp',
    alt: 'Illustrated compass and service emblem backdrop representing Girl Guides and St. John Ambulance',
    ctaLabel: 'Clubs & Movements',
    ctaHref: '/explore#clubs',
  },
];

// ── Quick Stats ─────────────────────────────────────────────
export const quickStats: QuickStat[] = [
  { label: 'Founded', value: '1960', icon: 'Calendar' },
  { label: 'Student Enrolment', value: '1,200+', icon: 'Users' },
  { label: 'University Transition Rate', value: '78%', icon: 'GraduationCap' },
  { label: 'CBC Pathways Offered', value: '3', icon: 'Route' },
];

// ── CBC Pathways ────────────────────────────────────────────
export const cbcPathways: CBCPathway[] = [
  {
    id: 'stem',
    name: 'STEM',
    summary:
      'Analytical, experimental, and design-focused tracks preparing learners for medicine, engineering, computing, agriculture, and scientific research.',
    tracks: [
      {
        id: 'pure-sciences',
        name: 'Pure Sciences',
        description:
          'Rigorous grounding in Mathematics, Physics, Chemistry, and Biology for research and medical careers.',
        subjects: [
          'Mathematics',
          'Physics',
          'Chemistry',
          'Biology',
          'Computer Science',
        ],
        careers: [
          'Medicine',
          'Engineering',
          'Research Science',
          'Pharmacy',
          'Data Science',
        ],
        icon: 'FlaskConical',
      },
      {
        id: 'applied-sciences',
        name: 'Applied Sciences',
        description:
          'Practical applications of science in agriculture, health, environment, and food technology.',
        subjects: [
          'Agriculture',
          'Home Science',
          'Health Sciences',
          'Environmental Science',
          'Food Technology',
        ],
        careers: [
          'Agricultural Science',
          'Nutrition',
          'Environmental Management',
          'Public Health',
          'Food Science',
        ],
        icon: 'Microscope',
      },
      {
        id: 'technical-engineering',
        name: 'Technical & Engineering',
        description:
          'Hands-on technical skills in computing, design, and engineering fundamentals.',
        subjects: [
          'Computer Science',
          'Mathematics',
          'Technical Drawing',
          'Physics',
          'Innovation & Design',
        ],
        careers: [
          'Software Engineering',
          'Civil Engineering',
          'Architecture',
          'IT Management',
          'Mechatronics',
        ],
        icon: 'Cpu',
      },
    ],
  },
  {
    id: 'social-sciences',
    name: 'Social Sciences',
    summary:
      'Inquiry into society, governance, economics, commerce, and world languages for future jurists, economists, communicators, and public leaders.',
    tracks: [
      {
        id: 'humanities',
        name: 'Humanities',
        description:
          'Critical thinking through History, Geography, Religious Education, and Social Studies.',
        subjects: [
          'History & Government',
          'Geography',
          'CRE / IRE',
          'Life Skills',
          'Social Studies',
        ],
        careers: [
          'Law',
          'Diplomacy',
          'Public Administration',
          'Social Work',
          'Journalism',
        ],
        icon: 'Globe',
      },
      {
        id: 'business-studies',
        name: 'Business Studies',
        description:
          'Foundation in business, commerce, accounting, and entrepreneurship.',
        subjects: [
          'Business Studies',
          'Economics',
          'Commerce',
          'Accounting',
          'Entrepreneurship',
        ],
        careers: [
          'Finance',
          'Banking',
          'Business Management',
          'Marketing',
          'Accounting',
        ],
        icon: 'TrendingUp',
      },
      {
        id: 'languages-literature',
        name: 'Languages & Literature',
        description:
          'Mastery of English, Kiswahili, and foreign languages with literary analysis.',
        subjects: [
          'English Language',
          'Kiswahili',
          'Literature in English',
          'Fasihi ya Kiswahili',
          'French / German',
        ],
        careers: [
          'Translation',
          'Publishing',
          'Media & Communication',
          'Teaching',
          'Creative Writing',
        ],
        icon: 'BookOpen',
      },
    ],
  },
  {
    id: 'arts-sports',
    name: 'Arts & Sports Science',
    summary:
      'Structured creative arts, design, and sports science training that turns artistic and athletic talent into recognised academic and career qualifications.',
    tracks: [
      {
        id: 'performing-arts',
        name: 'Performing Arts',
        description:
          'Creative expression through music, drama, dance, and film production.',
        subjects: ['Music', 'Drama', 'Dance', 'Film Studies', 'Theatre Arts'],
        careers: [
          'Performing Arts',
          'Film Production',
          'Music Production',
          'Broadcasting',
          'Event Management',
        ],
        icon: 'Music',
      },
      {
        id: 'visual-arts',
        name: 'Visual Arts',
        description:
          'Visual creativity through fine art, design, photography, and digital media.',
        subjects: [
          'Art & Design',
          'Photography',
          'Graphic Design',
          'Textile Design',
          'Digital Media',
        ],
        careers: [
          'Graphic Design',
          'Fashion Design',
          'Architecture',
          'Photography',
          'UI/UX Design',
        ],
        icon: 'Palette',
      },
      {
        id: 'sports-science',
        name: 'Sports Science',
        description:
          'Science of sports, physical education, coaching, and sports management.',
        subjects: [
          'Physical Education',
          'Sports Science',
          'Health & Fitness',
          'Nutrition',
          'Sports Management',
        ],
        careers: [
          'Sports Science',
          'Physiotherapy',
          'Coaching',
          'Sports Administration',
          'Recreation Management',
        ],
        icon: 'Trophy',
      },
    ],
  },
];

// ── Top Students (KCSE Wall of Fame) ────────────────────────
export const topStudents: TopStudent[] = [
  {
    id: 1,
    name: 'Grace Wanjiku Muthoni',
    year: 2024,
    meanGrade: 'A',
    points: 84,
    university: 'University of Nairobi',
    course: 'Bachelor of Medicine & Surgery',
  },
  {
    id: 2,
    name: 'Faith Njeri Kamau',
    year: 2024,
    meanGrade: 'A',
    points: 82,
    university: 'Kenyatta University',
    course: 'Bachelor of Pharmacy',
  },
  {
    id: 3,
    name: 'Mercy Wambui Githinji',
    year: 2024,
    meanGrade: 'A-',
    points: 79,
    university: 'JKUAT',
    course: 'BSc. Computer Science',
  },
  {
    id: 4,
    name: 'Joy Mumbi Karanja',
    year: 2024,
    meanGrade: 'A-',
    points: 78,
    university: 'Moi University',
    course: 'Bachelor of Law (LLB)',
  },
  {
    id: 5,
    name: 'Hope Nyambura Waweru',
    year: 2023,
    meanGrade: 'A',
    points: 83,
    university: 'University of Nairobi',
    course: 'BSc. Actuarial Science',
  },
  {
    id: 6,
    name: 'Charity Muthoni Njoroge',
    year: 2023,
    meanGrade: 'A-',
    points: 80,
    university: 'Egerton University',
    course: 'BSc. Biomedical Science',
  },
  {
    id: 7,
    name: 'Agnes Wairimu Ndirangu',
    year: 2023,
    meanGrade: 'A-',
    points: 78,
    university: 'Strathmore University',
    course: 'Bachelor of Commerce',
  },
  {
    id: 8,
    name: 'Esther Nyokabi Muiruri',
    year: 2022,
    meanGrade: 'A',
    points: 81,
    university: 'University of Nairobi',
    course: 'Bachelor of Architecture',
  },
];

// ── News & Circulars ────────────────────────────────────────
export const newsItems: NewsItem[] = [
  {
    id: 3,
    title: '2024 KCSE Results Release',
    date: '20/03/2025',
    category: 'Event',
    excerpt:
      'Mumbi Girls records strong KCSE results with a 78% university transition rate across science, humanities, and creative degree programmes.',
    body: [
      'Mumbi Girls Senior School celebrates the achievements of the 2024 KCSE graduating cohort, sustaining a 78% direct university transition rate across public and private universities in Kenya.',
      'Top scholars earned placements in competitive degree programmes including Medicine and Surgery, Pharmacy, Computer Science, Law, and Commerce — reflecting consistent preparation by our teaching departments and strong boarding study routines.',
      'Parents, guardians, and alumnae can view highlighted top scholars on the KCSE Wall of Fame under the Academics section or contact the examinations office during official working hours for result-slip collection guidance.',
    ],
    slug: '2024-kcse-results',
  },
  {
    id: 4,
    title: 'Term 1 Opening Circular 2025',
    date: '02/01/2025',
    category: 'Circular',
    excerpt:
      'Important reporting schedules, fee payment reminders, boarding requirements, and new student orientation details for Term 1.',
    body: [
      'All continuing and incoming learners are expected to report strictly within official daytime hours in complete, neat school uniform accompanied by cleared holiday assignment booklets.',
      'Parents and guardians are reminded to review the official Fee Structure and ensure banking slips or official payment confirmations are presented at the accounts desk upon arrival.',
      'New Grade 10 learners will take part in a structured campus orientation covering dormitory allocation, academic pathway mentorship, chaplaincy fellowship, and co-curricular club registration.',
    ],
    slug: 'term-1-opening-circular-2025',
  },
  {
    id: 6,
    title: 'Grade 10 Admission & Joining Instructions 2025',
    date: '10/12/2024',
    category: 'Download',
    excerpt:
      'Complete joining instructions, boarding checklist, uniform specifications, and pathway selection guidance for newly admitted learners.',
    body: [
      'Congratulations to all learners placed at Mumbi Girls Senior School (KNEC Centre 10204102). The joining instructions package outlines admission documentation, medical and boarding essentials, and official uniform guidelines.',
      'Incoming Senior School learners and their parents will also receive guidance from the Academics & Curriculum office on selecting tracks across STEM, Social Sciences, and Arts & Sports Science.',
      'Download the admission package from the Downloads Hub or reach out to our administration office Monday to Friday between 08:00 and 17:00 for any clarification.',
    ],
    slug: 'admission-joining-instructions-2025',
  },
  {
    id: 2,
    title: 'December Holiday Assignment Package',
    date: '01/11/2024',
    category: 'Download',
    excerpt:
      'Comprehensive holiday revision and research assignment packs for all Senior School grades and forms across every department.',
    body: [
      'Academic departments have compiled structured December holiday assignments covering Mathematics, Sciences, Languages, Humanities, and Technical & Applied subjects.',
      'Each learner should download and complete all papers assigned to her class level. Subject teachers will review completed work during the opening week of the new term as part of continuous academic follow-up.',
      'Use the class-level and subject filters in the Downloads Hub to locate the exact assignment files for your grade or form.',
    ],
    slug: 'december-holiday-assignment-2024',
  },
  {
    id: 1,
    title: 'Term 3 Mid-Term Newsletter 2024',
    date: '15/09/2024',
    category: 'Newsletter',
    excerpt:
      'Updates on academic progress, CBC Senior School readiness, chaplaincy events, and upcoming cultural activities.',
    body: [
      'The Term 3 Mid-Term Newsletter highlights syllabus milestones, internal assessment feedback, and ongoing laboratory and library upgrades supporting Senior School pathways.',
      'The edition also recaps Prayer Day, inter-house sports competitions, Girl Guides and St. John Ambulance service initiatives, and key dates for the remainder of the academic calendar.',
      'Parents and guardians are encouraged to download the full newsletter from the Downloads Hub and keep in close communication with class teachers.',
    ],
    slug: 'term-3-mid-term-newsletter-2024',
  },
  {
    id: 5,
    title: 'STEM Fair 2024 Regional Champions',
    date: '25/08/2024',
    category: 'Event',
    excerpt:
      "Mumbi Girls student innovators earn top honours at the Murang'a County STEM Innovation Fair.",
    body: [
      "Learners from the Sciences, Mathematics, and Technical & Applied departments represented Mumbi Girls Senior School with distinction at the 2024 Murang'a County STEM Innovation Fair.",
      'Student teams showcased practical projects in sustainable agriculture, environmental conservation, applied chemistry, and computing, demonstrating strong research and presentation skills.',
      'Visit our Photo & Media Gallery to browse highlights from the STEM Innovation Fair album and explore our STEM pathway tracks on the Academics page.',
    ],
    slug: 'stem-fair-2024-champions',
  },
];

// ── Principals Timeline ─────────────────────────────────────
export const principals: Principal[] = [
  { id: 1, name: 'Mrs. Mary Wambui Kamau', period: '1960 – 1972' },
  { id: 2, name: 'Mrs. Hannah Njeri Mwangi', period: '1973 – 1985' },
  { id: 3, name: 'Mrs. Grace Wanjiku Kariuki', period: '1986 – 1998' },
  { id: 4, name: 'Mrs. Margaret Nyambura Gitau', period: '1999 – 2010' },
  { id: 5, name: "Mrs. Agnes Muthoni Ndung'u", period: '2011 – 2020' },
  {
    id: 6,
    name: 'Mrs. Eunice Wangari Muturi',
    period: '2021 – Present',
    isCurrent: true,
    image: '/images/principal-placeholder.webp',
  },
];

// ── BOM Chairpersons Timeline ───────────────────────────────
export const bomChairpersons: BOMChairperson[] = [
  { id: 1, name: 'Mr. Joseph Kamau Ndirangu', period: '1960 – 1975' },
  { id: 2, name: 'Mr. Peter Mwangi Gitonga', period: '1976 – 1990' },
  { id: 3, name: 'Mrs. Dorothy Wanjiru Njoroge', period: '1991 – 2005' },
  { id: 4, name: 'Dr. Samuel Kariuki Maina', period: '2006 – 2018' },
  {
    id: 5,
    name: 'Hon. Patrick Njoroge Waithaka',
    period: '2019 – Present',
    isCurrent: true,
  },
];

// ── Deputies & Student Council Governance ───────────────────
export const governanceRoles: GovernanceRole[] = [
  {
    id: 'deputy-academics',
    role: 'Office of the Deputy Principal',
    title: 'Academics & Curriculum',
    description:
      'Leads CBC Senior School pathway delivery, departmental coordination, internal assessments, and KNEC examination preparedness.',
    responsibilities: [
      'Timetabling & syllabus supervision across all 5 departments',
      'CBC Grade 10–12 pathway placement & career guidance',
      'Continuous assessment tracking & KCSE readiness',
    ],
  },
  {
    id: 'deputy-admin',
    role: 'Office of the Deputy Principal',
    title: 'Administration & Student Welfare',
    description:
      'Coordinates daily campus operations, boarding standards, student discipline, health and safety, and facility stewardship.',
    responsibilities: [
      'Dormitory welfare, catering quality & campus security',
      'Student conduct, guidance & pastoral support coordination',
      'Co-curricular calendar & parent visitation logistics',
    ],
  },
  {
    id: 'student-council',
    role: 'Student Council',
    title: 'Democratic Student Governance',
    description:
      'Elected annually by fellow learners and headed by the School President and Deputy President to champion student voice and peer leadership.',
    responsibilities: [
      'Academics, Library & Prep Time Secretaries',
      'Boarding, Dining Hall, Health & Environment Captains',
      'Games, Clubs, Entertainment & Chaplaincy Representatives',
    ],
  },
];

// ── Departments ─────────────────────────────────────────────
export const departments: Department[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    hod: 'Mr. James Mwangi',
    description:
      'Building strong numerical, logical, and analytical foundations across STEM and Business pathways.',
    subjects: ['Mathematics', 'Additional Mathematics', 'Statistics'],
    icon: 'Calculator',
  },
  {
    id: 'sciences',
    name: 'Sciences',
    hod: 'Dr. Susan Wanjiru',
    description:
      'Hands-on experimental science instruction supported by dedicated Physics, Chemistry, Biology, and computing laboratories.',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science'],
    icon: 'FlaskConical',
  },
  {
    id: 'languages',
    name: 'Languages',
    hod: 'Mrs. Janet Njoki',
    description:
      'Cultivating articulate communication, literary appreciation, and multilingual fluency in English, Kiswahili, and French.',
    subjects: ['English', 'Kiswahili', 'Literature', 'Fasihi', 'French'],
    icon: 'Languages',
  },
  {
    id: 'humanities',
    name: 'Humanities',
    hod: 'Mr. Patrick Githinji',
    description:
      'Deepening understanding of history, geography, ethics, enterprise, and civic governance for informed leadership.',
    subjects: [
      'History & Government',
      'Geography',
      'CRE',
      'IRE',
      'Business Studies',
    ],
    icon: 'Globe',
  },
  {
    id: 'technical',
    name: 'Technical & Applied',
    hod: 'Mrs. Esther Wambui',
    description:
      'Equipping learners with practical, creative, and technological competencies across applied sciences and the arts.',
    subjects: [
      'Agriculture',
      'Home Science',
      'Art & Design',
      'Music',
      'Computer Studies',
    ],
    icon: 'Wrench',
  },
];

// ── Clubs & Activities ──────────────────────────────────────
export const clubs: Club[] = [
  {
    id: 'girl-guides',
    name: 'Girl Guides',
    category: 'Movement',
    patron: 'Mrs. Sarah Kimani',
    meetingDay: 'Saturday • 14:00',
    description:
      'Character building, outdoor skills, community service, and scouting leadership programmes.',
    icon: 'Compass',
  },
  {
    id: 'st-john',
    name: 'St. John Ambulance',
    category: 'Movement',
    patron: 'Mr. David Maina',
    meetingDay: 'Saturday • 14:00',
    description:
      'First aid training, emergency preparedness, campus event coverage, and community health outreach.',
    icon: 'HeartPulse',
  },
  {
    id: 'red-cross',
    name: 'Red Cross',
    category: 'Movement',
    patron: 'Mrs. Agnes Njeri',
    meetingDay: 'Wednesday • 16:30',
    description:
      'Humanitarian service, disaster awareness, peer health education, and community outreach initiatives.',
    icon: 'Cross',
  },
  {
    id: 'journalism',
    name: 'Journalism Club',
    category: 'Club',
    patron: 'Mr. Peter Ochieng',
    meetingDay: 'Tuesday • 16:30',
    description:
      'School newsletter reporting, public speaking, creative writing, event photography, and media literacy.',
    icon: 'Newspaper',
  },
  {
    id: 'drama',
    name: 'Drama & Theatre',
    category: 'Club',
    patron: 'Mrs. Lucy Waithera',
    meetingDay: 'Monday • 16:30',
    description:
      'Acting, spoken word, scriptwriting, and stage productions for Kenya Music and Drama Festivals.',
    icon: 'Theater',
  },
  {
    id: 'wildlife',
    name: 'Wildlife Club',
    category: 'Club',
    patron: 'Mr. Joseph Kamau',
    meetingDay: 'Thursday • 16:30',
    description:
      'Environmental conservation, campus tree planting, ecological excursions, and biodiversity stewardship.',
    icon: 'TreePine',
  },
  {
    id: 'integrity',
    name: 'Integrity Club',
    category: 'Club',
    patron: 'Mrs. Beatrice Muthoni',
    meetingDay: 'Friday • 16:30',
    description:
      'Values-based leadership, honesty campaigns, peer accountability, and civic education.',
    icon: 'Shield',
  },
];

// ── Sports ──────────────────────────────────────────────────
export const sports: Club[] = [
  {
    id: 'volleyball',
    name: 'Volleyball',
    category: 'Sport',
    patron: 'Mr. Stephen Gitau',
    meetingDay: 'Daily • 16:00',
    description:
      'Competitive volleyball squads participating in sub-county, county, and regional KSSSA championships.',
    icon: 'CircleDot',
  },
  {
    id: 'netball',
    name: 'Netball',
    category: 'Sport',
    patron: 'Mrs. Mary Njoroge',
    meetingDay: 'Daily • 16:00',
    description:
      "Fast-paced team netball with structured drills, inter-house leagues, and consistent county tournament play.",
    icon: 'Target',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    category: 'Sport',
    patron: 'Mr. John Omondi',
    meetingDay: 'Daily • 16:00',
    description:
      'Court conditioning, tactical teamwork, and regular inter-school basketball fixtures.',
    icon: 'Circle',
  },
  {
    id: 'hockey',
    name: 'Hockey',
    category: 'Sport',
    patron: 'Mrs. Ann Wangari',
    meetingDay: 'Daily • 16:00',
    description:
      'Field hockey training focusing on stick skills, endurance, sportsmanship, and tournament readiness.',
    icon: 'Trophy',
  },
  {
    id: 'athletics',
    name: 'Athletics',
    category: 'Sport',
    patron: 'Mr. Elijah Kipchoge',
    meetingDay: 'Daily • 05:30 & 16:00',
    description:
      'Track and field events spanning sprints, middle- and long-distance running, relays, jumps, and throws.',
    icon: 'Footprints',
  },
  {
    id: 'handball',
    name: 'Handball',
    category: 'Sport',
    patron: 'Mrs. Faith Wanjiku',
    meetingDay: 'Daily • 16:00',
    description:
      'Agile team handball coaching, inter-class competitions, and KSSSA fixture representation.',
    icon: 'Hand',
  },
];

// ── Daily Routine (05:00 – 22:00) ───────────────────────────
export const dailyRoutine: DailyRoutineItem[] = [
  { time: '05:00', activity: 'Wake Up & Personal Preparation' },
  { time: '05:30', activity: 'Morning Preps & Personal Study' },
  { time: '06:30', activity: 'Breakfast in the Dining Hall' },
  { time: '07:00', activity: 'Morning Assembly, Inspection & Parade' },
  { time: '07:30', activity: 'Morning Lessons Begin (Period 1)' },
  { time: '10:00', activity: 'Short Tea Break' },
  { time: '10:20', activity: 'Mid-Morning Lessons Continue' },
  { time: '12:40', activity: 'Lunch Break & Rest' },
  { time: '14:00', activity: 'Afternoon Lessons & Lab Practicals' },
  { time: '16:00', activity: 'Games, Clubs & Co-Curricular Activities' },
  { time: '17:30', activity: 'Evening Freshening Up & Supper Prep' },
  { time: '18:30', activity: 'Supper' },
  { time: '19:00', activity: 'Supervised Evening Preps & Revision' },
  { time: '21:30', activity: 'Dormitory Roll Call & Evening Devotions' },
  { time: '22:00', activity: 'Lights Out' },
];

// ── Faith Groups ────────────────────────────────────────────
export const faithGroups: Club[] = [
  {
    id: 'cu',
    name: 'Christian Union (CU)',
    category: 'Faith',
    patron: 'Mrs. Rachael Mukami',
    meetingDay: 'Sunday 09:00 & Wednesday 17:00',
    description:
      'Interdenominational Christian fellowship, praise and worship, Bible study, and peer mentorship.',
    icon: 'Cross',
  },
  {
    id: 'ycs',
    name: 'Young Christian Students (YCS)',
    category: 'Faith',
    patron: 'Sr. Cecilia Wangeci',
    meetingDay: 'Sunday 09:00 & Thursday 17:00',
    description:
      'Catholic student movement centred on prayer, liturgy, compassionate service, and moral formation.',
    icon: 'Heart',
  },
  {
    id: 'sda',
    name: 'SDA Fellowship',
    category: 'Faith',
    patron: 'Mrs. Naomi Njiru',
    meetingDay: 'Saturday 09:00',
    description:
      'Seventh-Day Adventist fellowship, Sabbath worship, choir ministry, and community service.',
    icon: 'Sun',
  },
  {
    id: 'muslim',
    name: 'Muslim Student Association',
    category: 'Faith',
    patron: 'Mrs. Fatma Hassan',
    meetingDay: 'Friday 13:00',
    description:
      'Dedicated prayer observance, Quran study, moral reflection, and Muslim student fellowship.',
    icon: 'Moon',
  },
];

// ── Boarding, Meals & Uniform Guide ─────────────────────────
export const boardingSections: BoardingSection[] = [
  {
    id: 'meals',
    title: 'Boarding Dining & Nutrition',
    description:
      'Balanced, freshly prepared meals are served in a clean communal dining hall on a structured weekly menu supporting active adolescent learners.',
    highlights: [
      'Daily breakfast, 10:00 tea break, hot lunch, and evening supper',
      'Balanced rotation of cereals, legumes, vegetables, fruits, beef, and milk',
      'Clean drinking water points and strict kitchen hygiene supervision',
    ],
    icon: 'Utensils',
  },
  {
    id: 'uniform',
    title: 'Official School Uniform',
    description:
      "Our uniform reflects the pride, modesty, and identity of Mumbi Girls Senior School in the school's official blue and crisp white colours.",
    highlights: [
      'Official school blazer bearing the Mumbi Girls Senior School crest',
      'Pleated school skirt, white collared blouse, and official school tie',
      'Black lace-up leather shoes, approved socks, and official PE/games kit',
    ],
    icon: 'Shirt',
  },
  {
    id: 'welfare',
    title: 'Dormitories, Health & Safety',
    description:
      'A supportive, well-supervised boarding environment designed to be a safe, orderly home away from home throughout the school term.',
    highlights: [
      'Round-the-clock campus security and supervised dormitory houses',
      'School sanatorium with nursing care and hospital referral procedures',
      'Active Guidance & Counselling department and teacher-mentor families',
    ],
    icon: 'Shield',
  },
];

// ── Downloads ───────────────────────────────────────────────
export const downloads: DownloadItem[] = [
  {
    id: 6,
    title: 'Term 1 2025 Exam Timetable',
    category: 'Exam Timetable',
    level: 'All',
    subject: 'General',
    fileSize: '1.2 MB',
    uploadDate: '20/01/2025',
    department: 'Examinations',
    fileUrl: '#',
  },
  {
    id: 9,
    title: 'Term 1 2025 Opening & Reporting Circular',
    category: 'Circular',
    level: 'All',
    subject: 'General',
    fileSize: '640 KB',
    uploadDate: '02/01/2025',
    department: 'Administration',
    fileUrl: '#',
  },
  {
    id: 4,
    title: 'Grade 10 Joining Instructions 2025',
    category: 'Admission & Joining Instructions',
    level: 'Grade 10',
    subject: 'General',
    fileSize: '3.1 MB',
    uploadDate: '10/12/2024',
    department: 'Admissions',
    fileUrl: '#',
  },
  {
    id: 5,
    title: 'Official Fee Structure 2025',
    category: 'Fee Structure',
    level: 'All',
    subject: 'General',
    fileSize: '890 KB',
    uploadDate: '05/12/2024',
    department: 'Finance',
    fileUrl: '#',
  },
  {
    id: 7,
    title: 'December 2024 Holiday Assignment — Integrated Sciences',
    category: 'Holiday Assignment',
    level: 'Grade 10',
    subject: 'Sciences',
    fileSize: '3.5 MB',
    uploadDate: '01/11/2024',
    department: 'Sciences',
    fileUrl: '#',
  },
  {
    id: 10,
    title: 'December 2024 Holiday Assignment — Biology & Chemistry',
    category: 'Holiday Assignment',
    level: 'Grade 11',
    subject: 'Sciences',
    fileSize: '2.9 MB',
    uploadDate: '01/11/2024',
    department: 'Sciences',
    fileUrl: '#',
  },
  {
    id: 11,
    title: 'December 2024 Holiday Assignment — History & Geography',
    category: 'Holiday Assignment',
    level: 'Grade 12',
    subject: 'Humanities',
    fileSize: '2.1 MB',
    uploadDate: '01/11/2024',
    department: 'Humanities',
    fileUrl: '#',
  },
  {
    id: 1,
    title: 'December 2024 Holiday Assignment — Mathematics',
    category: 'Holiday Assignment',
    level: 'Form 4',
    subject: 'Mathematics',
    fileSize: '2.4 MB',
    uploadDate: '01/11/2024',
    department: 'Mathematics',
    fileUrl: '#',
  },
  {
    id: 2,
    title: 'December 2024 Holiday Assignment — English & Literature',
    category: 'Holiday Assignment',
    level: 'Form 3',
    subject: 'English',
    fileSize: '1.8 MB',
    uploadDate: '01/11/2024',
    department: 'Languages',
    fileUrl: '#',
  },
  {
    id: 3,
    title: 'Term 3 2024 School Newsletter',
    category: 'Newsletter',
    level: 'All',
    subject: 'General',
    fileSize: '5.2 MB',
    uploadDate: '15/09/2024',
    department: 'Administration',
    fileUrl: '#',
  },
  {
    id: 8,
    title: 'Term 2 2024 School Newsletter',
    category: 'Newsletter',
    level: 'All',
    subject: 'General',
    fileSize: '4.8 MB',
    uploadDate: '15/06/2024',
    department: 'Administration',
    fileUrl: '#',
  },
];

// ── Gallery Albums ──────────────────────────────────────────
export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'prayer-day-2024',
    name: 'Prayer Day 2024',
    description: 'Thanksgiving worship, candidate dedication, and choral presentations.',
    coverImage: '/images/gallery/prayer-1.webp',
    year: 2024,
    images: [
      {
        id: 1,
        src: '/images/gallery/prayer-1.webp',
        alt: 'Morning thanksgiving prayers and assembly dedication during Prayer Day 2024',
        event: 'Prayer Day 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 2,
        src: '/images/gallery/prayer-2.webp',
        alt: 'Guest speaker keynote and candidate blessing during Prayer Day 2024',
        event: 'Prayer Day 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 3,
        src: '/images/gallery/prayer-3.webp',
        alt: 'Mumbi Girls Senior School choir performing during Prayer Day 2024',
        event: 'Prayer Day 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
    ],
  },
  {
    id: 'agm-prize-giving-2024',
    name: 'AGM & Prize Giving 2024',
    description: 'Celebrating top scholars, subject awards, and parent-school partnership.',
    coverImage: '/images/gallery/agm-1.webp',
    year: 2024,
    images: [
      {
        id: 4,
        src: '/images/gallery/agm-1.webp',
        alt: 'Annual Prize Giving ceremony honouring academic and leadership excellence',
        event: 'AGM & Prize Giving 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 5,
        src: '/images/gallery/agm-2.webp',
        alt: 'Top performing students receiving academic merit certificates and trophies',
        event: 'AGM & Prize Giving 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 6,
        src: '/images/gallery/agm-3.webp',
        alt: 'Parents, teachers, and Board of Management plenary session during the 2024 AGM',
        event: 'AGM & Prize Giving 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
    ],
  },
  {
    id: 'stem-fair-2024',
    name: 'STEM Innovation Fair 2024',
    description: 'Student science exhibitions, robotics prototypes, and county fair honours.',
    coverImage: '/images/gallery/stem-1.webp',
    year: 2024,
    images: [
      {
        id: 7,
        src: '/images/gallery/stem-1.webp',
        alt: 'Student science project exhibitions at the 2024 STEM Innovation Fair',
        event: 'STEM Innovation Fair 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 8,
        src: '/images/gallery/stem-2.webp',
        alt: 'Computing and robotics prototype showcase by STEM pathway learners',
        event: 'STEM Innovation Fair 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 9,
        src: '/images/gallery/stem-3.webp',
        alt: 'Regional STEM Innovation Fair award presentation to Mumbi Girls team',
        event: 'STEM Innovation Fair 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
    ],
  },
  {
    id: 'ksssa-sports-2024',
    name: 'KSSSA Sports 2024',
    description: 'Track and field athletics, volleyball finals, and championship medals.',
    coverImage: '/images/gallery/sports-1.webp',
    year: 2024,
    images: [
      {
        id: 10,
        src: '/images/gallery/sports-1.webp',
        alt: 'Mumbi Girls athletes competing at the 2024 KSSSA track and field meet',
        event: 'KSSSA Sports 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 11,
        src: '/images/gallery/sports-2.webp',
        alt: 'Mumbi Girls volleyball team in action during the 2024 KSSSA finals',
        event: 'KSSSA Sports 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 12,
        src: '/images/gallery/sports-3.webp',
        alt: 'Medal and trophy presentation ceremony at the 2024 KSSSA games',
        event: 'KSSSA Sports 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
    ],
  },
];

// ── School Anthems ──────────────────────────────────────────
export const schoolAnthem = {
  english: {
    title: 'School Anthem',
    verses: [
      "Hail Mumbi Girls, our pride and joy,\nStanding tall through every test,\nWith wisdom's light we forge ahead,\nStriving always for the best.",
      'In halls of learning, strong we grow,\nWith faith and honour as our guide,\nEmpowered daughters of this land,\nWe carry forth our name with pride.',
      'Education lights our way,\nEmpowerment our lasting song,\nMumbi Girls, forever strong,\nTogether we shall march along.',
    ],
  },
  kiswahili: {
    title: 'Wimbo wa Shule',
    verses: [
      'Mumbi Wasichana, fahari yetu,\nTwasimama imara kila wakati,\nKwa nuru ya hekima twasonga mbele,\nTukijitahidi daima kwa ubora.',
      'Katika nyumba za elimu, twakua,\nImani na heshima ndiyo mwongozo wetu,\nBinti walioimarishwa wa nchi hii,\nTwabeba jina letu kwa kiburi.',
      'Elimu inaangazia njia yetu,\nUwezo ndio wimbo wetu wa milele,\nMumbi Wasichana, nguvu daima,\nPamoja tutaendelea kusonga.',
    ],
  },
};
