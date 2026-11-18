// ============================================================
// Mumbi Girls Senior School - Public School Data
// Serves public-site content before Supabase is connected.
// All dates strictly follow DD/MM/YYYY.
// ============================================================

import {
  SchoolInfo,
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
  motto: 'Determined to Excel',
  mission:
    'To provide a holistic, inclusive, and quality education that empowers girls to become competent, ethical, and transformative leaders in a dynamic global society.',
  vision:
    'A centre of excellence nurturing empowered girls who are innovative, morally upright, and globally competitive.',
  coreValues: [
    {
      title: 'Academic Excellence',
      description:
        'Consistent classroom study, laboratory practice, and thorough preparation for national assessments.',
    },
    {
      title: 'Integrity & Accountability',
      description:
        'Honesty in schoolwork, personal responsibility, and careful stewardship of shared school property.',
    },
    {
      title: 'Discipline & Self-Governance',
      description:
        'Respect for school hours, boarding rules, and elected student council representation.',
    },
    {
      title: 'Innovation & Creativity',
      description:
        'Practical inquiry in science laboratories, computing, agriculture, music, drama, and visual arts.',
    },
    {
      title: 'Faith & Moral Uprightness',
      description:
        'Pastoral care, service to others, and weekly worship across the faith traditions present in the school.',
    },
    {
      title: 'Inclusivity & Respect',
      description:
        'A boarding community where girls from different backgrounds live and study together with mutual respect.',
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

// ── Quick Facts ─────────────────────────────────────────────
export const quickStats: QuickStat[] = [
  { label: 'Established', value: '1960', detail: "Mukuyu, Murang'a County" },
  {
    label: 'Student Enrolment',
    value: '1,200+',
    detail: "Public girls' boarding",
  },
  {
    label: 'University Transition',
    value: '78%',
    detail: 'Direct degree placement',
  },
  {
    label: 'Senior School Pathways',
    value: '3',
    detail: 'Grades 10 – 12 (CBC)',
  },
];

// ── CBC Senior School Pathways ──────────────────────────────
export const cbcPathways: CBCPathway[] = [
  {
    id: 'stem',
    name: 'STEM',
    summary:
      'Science, technology, engineering, and mathematics tracks for Grades 10–12, taught across the Mathematics, Sciences, and Technical & Applied departments.',
    tracks: [
      {
        id: 'pure-sciences',
        name: 'Pure Sciences',
        description:
          'Classroom and laboratory study in Mathematics, Physics, Chemistry, Biology, and Computer Science.',
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
      },
      {
        id: 'applied-sciences',
        name: 'Applied Sciences',
        description:
          'Applied scientific study in agriculture, home science, health, environmental management, and food technology.',
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
      },
      {
        id: 'technical-engineering',
        name: 'Technical & Engineering',
        description:
          'Practical coursework in computing, technical drawing, applied physics, and design.',
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
      },
    ],
  },
  {
    id: 'social-sciences',
    name: 'Social Sciences',
    summary:
      'Humanities, business, and language tracks preparing Grade 10–12 learners for degrees in law, economics, commerce, education, and media.',
    tracks: [
      {
        id: 'humanities',
        name: 'Humanities',
        description:
          'Study of Kenyan and world history, physical and human geography, religious education, and civic life.',
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
      },
      {
        id: 'business-studies',
        name: 'Business Studies',
        description:
          'Coursework in commerce, accounting, economics, and enterprise management.',
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
      },
      {
        id: 'languages-literature',
        name: 'Languages & Literature',
        description:
          'Written and spoken proficiency in English, Kiswahili, and foreign languages alongside set-book literary study.',
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
      },
    ],
  },
  {
    id: 'arts-sports',
    name: 'Arts & Sports Science',
    summary:
      'Structured coursework in performing arts, visual design, and physical education for learners pursuing creative and sports science qualifications.',
    tracks: [
      {
        id: 'performing-arts',
        name: 'Performing Arts',
        description:
          'Practical and theoretical training in choral and instrumental music, drama, dance, and film studies.',
        subjects: ['Music', 'Drama', 'Dance', 'Film Studies', 'Theatre Arts'],
        careers: [
          'Performing Arts',
          'Film Production',
          'Music Production',
          'Broadcasting',
          'Event Management',
        ],
      },
      {
        id: 'visual-arts',
        name: 'Visual Arts',
        description:
          'Studio work in drawing, painting, textile design, graphic design, photography, and digital media.',
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
      },
      {
        id: 'sports-science',
        name: 'Sports Science',
        description:
          'Physical education, human fitness, nutrition, coaching principles, and sports administration.',
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
      },
    ],
  },
];

// ── Top Students (KCSE Roll of Honour) ──────────────────────
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
      'Summary of the 2024 KCSE examination results, with a 78% university transition rate and result-slip collection guidance.',
    body: [
      'Mumbi Girls Senior School recorded a 78% direct university transition rate in the 2024 KCSE examinations, with candidates admitted to public and private universities across Kenya.',
      'Graduating candidates secured places in degree programmes including Medicine and Surgery, Pharmacy, Computer Science, Law, and Commerce.',
      'Candidates, parents, and guardians can review the KCSE list on the Academics page or visit the examinations office on weekdays between 08:00 and 17:00 for guidance on collecting official result slips.',
    ],
    slug: '2024-kcse-results',
  },
  {
    id: 4,
    title: 'Term 1 Opening Circular 2025',
    date: '02/01/2025',
    category: 'Circular',
    excerpt:
      'Reporting hours, fee payment verification, boarding requirements, and Grade 10 orientation schedule for Term 1.',
    body: [
      'Continuing and newly admitted students are required to report within official daytime hours in full school uniform, bringing their completed holiday assignment booklets.',
      'Parents and guardians should consult the 2025 Fee Structure and present official bank deposit slips or payment confirmations at the accounts office on reporting day.',
      'Incoming Grade 10 students will attend orientation covering dormitory allocation, CBC pathway selection, chaplaincy groups, and club registration.',
    ],
    slug: 'term-1-opening-circular-2025',
  },
  {
    id: 6,
    title: 'Grade 10 Admission & Joining Instructions 2025',
    date: '10/12/2024',
    category: 'Download',
    excerpt:
      'Admission documents, boarding items list, uniform specifications, and Senior School pathway information for incoming Grade 10 students.',
    body: [
      'Students placed at Mumbi Girls Senior School (KNEC Centre 10204102, MoE Registration F2030609) should download the joining instructions booklet ahead of reporting day. It lists required admission forms, medical certificates, boarding items, and official uniform details.',
      'During admission, the Academics & Curriculum office advises incoming Grade 10 students and parents on subject combinations under STEM, Social Sciences, and Arts & Sports Science.',
      "Download the booklet from the Downloads page or contact the administration office at P.O. Box 115 - 10200, Murang'a (Monday to Friday, 08:00 – 17:00) for assistance.",
    ],
    slug: 'admission-joining-instructions-2025',
  },
  {
    id: 2,
    title: 'December Holiday Assignment Package',
    date: '01/11/2024',
    category: 'Download',
    excerpt:
      'Departmental holiday revision papers for Grades 10–12 and Forms 3–4 across Mathematics, Sciences, Languages, and Humanities.',
    body: [
      'Subject departments have uploaded December holiday assignment booklets covering Mathematics, Sciences, Languages, and Humanities.',
      'Every student is expected to download and complete the papers for her class. Subject teachers collect and mark the booklets during the first week of term.',
      'Use the class-level and subject filters on the Downloads page to find the files for each grade or form.',
    ],
    slug: 'december-holiday-assignment-2024',
  },
  {
    id: 1,
    title: 'Term 3 Mid-Term Newsletter 2024',
    date: '15/09/2024',
    category: 'Newsletter',
    excerpt:
      'Term 3 report covering syllabus coverage, internal assessments, Prayer Day, inter-house games, and closing dates.',
    body: [
      'The Term 3 Mid-Term Newsletter reports on syllabus progress, internal examination dates, and laboratory and library preparations for Senior School classes.',
      'It also covers Prayer Day, inter-house sports fixtures, Girl Guides and St. John Ambulance activities, and key calendar dates for the close of term.',
      'Parents and guardians can download the full PDF copy from the Downloads page.',
    ],
    slug: 'term-3-mid-term-newsletter-2024',
  },
  {
    id: 5,
    title: 'STEM Fair 2024 Regional Champions',
    date: '25/08/2024',
    category: 'Event',
    excerpt:
      "Student project entries from the Sciences, Mathematics, and Technical & Applied departments at the 2024 Murang'a County STEM Innovation Fair.",
    body: [
      "Students from the Sciences, Mathematics, and Technical & Applied departments represented Mumbi Girls Senior School at the 2024 Murang'a County STEM Innovation Fair.",
      'Entries covered agriculture, environmental conservation, applied chemistry, and computing, prepared during afternoon laboratory and club sessions.',
      'Details of our STEM tracks are listed on the Academics page, and the STEM Innovation Fair album is catalogued in the Photo Gallery.',
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
    image: '/images/principal.jpg',
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
      'Oversees Senior School pathway teaching, departmental coordination, internal examinations, and KNEC registration.',
    responsibilities: [
      'Timetabling and syllabus supervision across all five departments',
      'CBC Grade 10–12 pathway placement and subject advisory',
      'Continuous assessment records and KCSE examination readiness',
    ],
  },
  {
    id: 'deputy-admin',
    role: 'Office of the Deputy Principal',
    title: 'Administration & Student Welfare',
    description:
      'Manages day-to-day school operations, boarding houses, student conduct, sanatorium coordination, and grounds maintenance.',
    responsibilities: [
      'Dormitory supervision, dining hall standards, and gate security',
      'Student discipline, guidance and counselling, and pastoral care',
      'Co-curricular calendar and official parent visiting days',
    ],
  },
  {
    id: 'student-council',
    role: 'Student Council',
    title: 'Elected Student Governance',
    description:
      'Elected annually by students and led by the School President and Deputy President to represent classes and boarding houses.',
    responsibilities: [
      'Academics, Library, and Prep Time Secretaries',
      'Boarding, Dining Hall, Health, and Environment Captains',
      'Games, Clubs, and Chaplaincy Representatives',
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
      'Core and elective mathematics instruction supporting STEM, Business Studies, and national examination classes.',
    subjects: ['Mathematics', 'Additional Mathematics', 'Statistics'],
    icon: 'Calculator',
  },
  {
    id: 'sciences',
    name: 'Sciences',
    hod: 'Dr. Susan Wanjiru',
    description:
      'Theory and scheduled practical lessons in Physics, Chemistry, Biology, and Computer Science laboratories.',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science'],
    icon: 'FlaskConical',
  },
  {
    id: 'languages',
    name: 'Languages',
    hod: 'Mrs. Janet Njoki',
    description:
      'Language, composition, and set-book literature teaching in English, Kiswahili, and French.',
    subjects: ['English', 'Kiswahili', 'Literature', 'Fasihi', 'French'],
    icon: 'Languages',
  },
  {
    id: 'humanities',
    name: 'Humanities',
    hod: 'Mr. Patrick Githinji',
    description:
      'Instruction in History and Government, Geography, Religious Education, and Business Studies.',
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
      'Practical and project-based classes in Agriculture, Home Science, Art and Design, Music, and Computer Studies.',
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
    meetingDay: 'Saturday, 14:00',
    description:
      'Parade drills, campcraft, outdoor skills, and community service under the Kenya Girl Guides programme.',
    icon: 'Compass',
  },
  {
    id: 'st-john',
    name: 'St. John Ambulance',
    category: 'Movement',
    patron: 'Mr. David Maina',
    meetingDay: 'Saturday, 14:00',
    description:
      'First-aid certification, emergency response drills, and duty cover during school sports and assemblies.',
    icon: 'HeartPulse',
  },
  {
    id: 'red-cross',
    name: 'Red Cross',
    category: 'Movement',
    patron: 'Mrs. Agnes Njeri',
    meetingDay: 'Wednesday, 16:30',
    description:
      'First-aid awareness, peer health education, disaster preparedness, and local welfare drives.',
    icon: 'Cross',
  },
  {
    id: 'journalism',
    name: 'Journalism Club',
    category: 'Club',
    patron: 'Mr. Peter Ochieng',
    meetingDay: 'Tuesday, 16:30',
    description:
      'Term newsletter reporting, assembly news briefs, debating, writing practice, and event photography.',
    icon: 'Newspaper',
  },
  {
    id: 'drama',
    name: 'Drama & Theatre',
    category: 'Club',
    patron: 'Mrs. Lucy Waithera',
    meetingDay: 'Monday, 16:30',
    description:
      'Stage plays, spoken word, choral verse, and rehearsals for the Kenya Schools and Colleges Drama and Music Festivals.',
    icon: 'Theater',
  },
  {
    id: 'wildlife',
    name: 'Wildlife Club',
    category: 'Club',
    patron: 'Mr. Joseph Kamau',
    meetingDay: 'Thursday, 16:30',
    description:
      'Tree planting on school grounds, environmental conservation projects, and field study trips.',
    icon: 'TreePine',
  },
  {
    id: 'integrity',
    name: 'Integrity Club',
    category: 'Club',
    patron: 'Mrs. Beatrice Muthoni',
    meetingDay: 'Friday, 16:30',
    description:
      'Peer discussions on honesty, school rules, ethical conduct, and civic responsibility.',
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
    meetingDay: 'Daily, 16:00',
    description:
      'School volleyball teams competing in inter-house matches and sub-county, county, and regional KSSSA fixtures.',
    icon: 'CircleDot',
  },
  {
    id: 'netball',
    name: 'Netball',
    category: 'Sport',
    patron: 'Mrs. Mary Njoroge',
    meetingDay: 'Daily, 16:00',
    description:
      "Afternoon court training, inter-house competitions, and Murang'a County secondary school tournaments.",
    icon: 'Target',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    category: 'Sport',
    patron: 'Mr. John Omondi',
    meetingDay: 'Daily, 16:00',
    description:
      'Court fundamentals, fitness conditioning, and scheduled inter-school fixtures.',
    icon: 'Circle',
  },
  {
    id: 'hockey',
    name: 'Hockey',
    category: 'Sport',
    patron: 'Mrs. Ann Wangari',
    meetingDay: 'Daily, 16:00',
    description:
      'Field hockey stickwork, positional play, and preparation for KSSSA term games.',
    icon: 'Trophy',
  },
  {
    id: 'athletics',
    name: 'Athletics',
    category: 'Sport',
    patron: 'Mr. Elijah Kipchoge',
    meetingDay: 'Daily, 05:30 & 16:00',
    description:
      'Track and field training across sprints, middle- and long-distance races, relays, jumps, and throws.',
    icon: 'Footprints',
  },
  {
    id: 'handball',
    name: 'Handball',
    category: 'Sport',
    patron: 'Mrs. Faith Wanjiku',
    meetingDay: 'Daily, 16:00',
    description:
      'Team handball coaching, inter-class matches, and KSSSA tournament participation.',
    icon: 'Hand',
  },
];

// ── Daily Routine (05:00 – 22:00) ───────────────────────────
export const dailyRoutine: DailyRoutineItem[] = [
  { time: '05:00', activity: 'Wake up and dormitory preparation' },
  { time: '05:30', activity: 'Morning preps and personal study' },
  { time: '06:30', activity: 'Breakfast in the dining hall' },
  { time: '07:00', activity: 'Morning assembly, inspection, and parade' },
  { time: '07:30', activity: 'Morning lessons begin (Period 1)' },
  { time: '10:00', activity: 'Short tea break' },
  { time: '10:20', activity: 'Mid-morning lessons' },
  { time: '12:40', activity: 'Lunch break' },
  { time: '14:00', activity: 'Afternoon lessons and laboratory practicals' },
  { time: '16:00', activity: 'Games, clubs, and co-curricular activities' },
  { time: '17:30', activity: 'Freshening up and preparation for supper' },
  { time: '18:30', activity: 'Supper' },
  { time: '19:00', activity: 'Supervised evening preps' },
  { time: '21:30', activity: 'Dormitory roll call and evening prayers' },
  { time: '22:00', activity: 'Lights out' },
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
      'Interdenominational Christian worship, Bible study, choir practice, and peer fellowship.',
    icon: 'Cross',
  },
  {
    id: 'ycs',
    name: 'Young Christian Students (YCS)',
    category: 'Faith',
    patron: 'Sr. Cecilia Wangeci',
    meetingDay: 'Sunday 09:00 & Thursday 17:00',
    description:
      'Catholic student fellowship holding weekly prayer, liturgy preparation, and service activities.',
    icon: 'Heart',
  },
  {
    id: 'sda',
    name: 'SDA Fellowship',
    category: 'Faith',
    patron: 'Mrs. Naomi Njiru',
    meetingDay: 'Saturday 09:00',
    description:
      'Seventh-Day Adventist Sabbath worship, Scripture study, and choir fellowship.',
    icon: 'Sun',
  },
  {
    id: 'muslim',
    name: 'Muslim Student Association',
    category: 'Faith',
    patron: 'Mrs. Fatma Hassan',
    meetingDay: 'Friday 13:00',
    description:
      'Scheduled prayer observance, Quran study, and fellowship for Muslim students.',
    icon: 'Moon',
  },
];

// ── Boarding, Meals & Uniform Guide ─────────────────────────
export const boardingSections: BoardingSection[] = [
  {
    id: 'meals',
    title: 'Dining Hall & Meals',
    description:
      'Meals are prepared on campus and served in the school dining hall according to a fixed weekly menu.',
    highlights: [
      'Breakfast, 10:00 tea, hot lunch, and supper served daily',
      'Weekly menu of cereals, legumes, seasonal vegetables, fruit, meat, and milk',
      'Drinking water points and routine kitchen hygiene inspection',
    ],
    icon: 'Utensils',
  },
  {
    id: 'uniform',
    title: 'Official School Uniform',
    description:
      'Students wear the official Mumbi Girls Senior School uniform in school blue and white during classes and official functions. Full item lists are issued in the joining instructions.',
    highlights: [
      'School blazer bearing the Mumbi Girls Senior School crest',
      'Pleated school skirt, white collared blouse, and school tie',
      'Black lace-up leather shoes, approved socks, and games kit',
    ],
    icon: 'Shirt',
  },
  {
    id: 'welfare',
    title: 'Dormitories, Health & Safety',
    description:
      'All students reside in supervised boarding houses on the Mukuyu compound throughout the school term.',
    highlights: [
      '24-hour gate security and house-mistress supervision in dormitories',
      'On-site school sanatorium with hospital referral procedures when required',
      'Guidance and Counselling office and teacher-mentor groups',
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
// Place real school photographs at the matching `public/images/gallery/*.jpg`
// file paths below; GalleryBrowser will display them automatically.
export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'prayer-day-2024',
    name: 'Prayer Day 2024',
    description:
      'Annual thanksgiving service, candidate dedication, and school choir presentations.',
    coverImage: '/images/gallery/prayer-1.jpg',
    year: 2024,
    images: [
      {
        id: 1,
        src: '/images/gallery/prayer-1.jpg',
        alt: 'Morning thanksgiving service and assembly dedication, Prayer Day 2024',
        event: 'Prayer Day 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 2,
        src: '/images/gallery/prayer-2.jpg',
        alt: 'Guest sermon and candidate dedication, Prayer Day 2024',
        event: 'Prayer Day 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 3,
        src: '/images/gallery/prayer-3.jpg',
        alt: 'School choir presentation during Prayer Day 2024',
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
    description:
      'Annual General Meeting of parents and the Board of Management, with subject and merit awards.',
    coverImage: '/images/gallery/agm-1.jpg',
    year: 2024,
    images: [
      {
        id: 4,
        src: '/images/gallery/agm-1.jpg',
        alt: 'Annual Prize Giving assembly, 2024',
        event: 'AGM & Prize Giving 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 5,
        src: '/images/gallery/agm-2.jpg',
        alt: 'Presentation of subject and academic merit certificates, 2024',
        event: 'AGM & Prize Giving 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 6,
        src: '/images/gallery/agm-3.jpg',
        alt: 'Parents, teachers, and Board of Management session at the 2024 AGM',
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
    description:
      "Student science, agriculture, and computing exhibits entered at the 2024 Murang'a County STEM Fair.",
    coverImage: '/images/gallery/stem-1.jpg',
    year: 2024,
    images: [
      {
        id: 7,
        src: '/images/gallery/stem-1.jpg',
        alt: 'Science and agriculture project stands, STEM Innovation Fair 2024',
        event: 'STEM Innovation Fair 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 8,
        src: '/images/gallery/stem-2.jpg',
        alt: 'Computing and applied science demonstration by STEM students, 2024',
        event: 'STEM Innovation Fair 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 9,
        src: '/images/gallery/stem-3.jpg',
        alt: 'Certificate and trophy presentation at the 2024 STEM Innovation Fair',
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
    description:
      'Inter-school athletics, volleyball fixtures, and awards from the 2024 KSSSA term games.',
    coverImage: '/images/gallery/sports-1.jpg',
    year: 2024,
    images: [
      {
        id: 10,
        src: '/images/gallery/sports-1.jpg',
        alt: 'Track and field events during the 2024 KSSSA games',
        event: 'KSSSA Sports 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 11,
        src: '/images/gallery/sports-2.jpg',
        alt: 'School volleyball fixture during the 2024 KSSSA tournament',
        event: 'KSSSA Sports 2024',
        year: 2024,
        width: 960,
        height: 640,
      },
      {
        id: 12,
        src: '/images/gallery/sports-3.jpg',
        alt: 'Awards presentation at the close of the 2024 KSSSA games',
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
