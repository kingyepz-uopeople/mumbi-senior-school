// ============================================================
// Mumbi Girls Senior School - Mock Data
// All data serves as fallback when Supabase is not configured
// ============================================================

import {
  SchoolInfo,
  HeroSlide,
  QuickStat,
  TopStudent,
  NewsItem,
  Principal,
  BOMChairperson,
  Department,
  Club,
  DailyRoutineItem,
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
    'Academic Excellence',
    'Integrity & Accountability',
    'Discipline & Self-Governance',
    'Innovation & Creativity',
    'Faith & Moral Uprightness',
    'Inclusivity & Respect for Diversity',
  ],
  knecCode: '10204102',
  moeReg: 'F2030609',
  postalAddress: 'P.O. Box 115 - 10200, Murang\'a',
  physicalLocation:
    'Mukuyu Sub-location, Kiharu Constituency, Murang\'a East, Murang\'a County, Kenya',
  officeHours: 'Monday - Friday: 08:00 AM - 05:00 PM | Weekends: Closed',
  founded: 1960,
  category: 'C2 Public Girls\' Boarding Senior School',
  domain: 'mumbiseniorschool.sc.ke',
};

// ── Hero Slides ─────────────────────────────────────────────
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Welcome to Mumbi Girls Senior School',
    subtitle:
      'Empowering young women through quality education, discipline, and innovation since 1960.',
    image: '/images/hero-admin-block.jpg',
    alt: 'Mumbi Girls Senior School Administration Block',
  },
  {
    id: 2,
    title: 'Student Leadership & Parade',
    subtitle:
      'Nurturing tomorrow\'s leaders through student council governance and disciplined formations.',
    image: '/images/hero-parade.jpg',
    alt: 'Students on parade at Mumbi Girls Senior School',
  },
  {
    id: 3,
    title: 'Science & STEM Excellence',
    subtitle:
      'State-of-the-art laboratories driving innovation in Pure Sciences, Applied Sciences, and Engineering.',
    image: '/images/hero-stem-lab.jpg',
    alt: 'Students in STEM laboratory',
  },
  {
    id: 4,
    title: 'Cultural & Music Festival Champions',
    subtitle:
      'Celebrating artistic expression through drama, music, and cultural festivals at national level.',
    image: '/images/hero-cultural.jpg',
    alt: 'Students performing at cultural festival',
  },
  {
    id: 5,
    title: 'Girl Guides & St. John Ambulance',
    subtitle:
      'Building character, resilience, and community service through uniformed movements.',
    image: '/images/hero-guides.jpg',
    alt: 'Girl Guides and St. John Ambulance brigade',
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
    id: 1,
    title: 'Term 3 Mid-Term Newsletter 2024',
    date: '15/09/2024',
    category: 'Newsletter',
    excerpt:
      'Updates on academic progress, CBC pathways implementation, and upcoming cultural festivals.',
    slug: 'term-3-mid-term-newsletter-2024',
  },
  {
    id: 2,
    title: 'December Holiday Assignment Package',
    date: '01/11/2024',
    category: 'Download',
    excerpt:
      'Comprehensive holiday assignment packs for all Grades and Forms across all subjects.',
    slug: 'december-holiday-assignment-2024',
  },
  {
    id: 3,
    title: '2024 KCSE Results Release',
    date: '20/03/2025',
    category: 'Event',
    excerpt:
      'Mumbi Girls records outstanding performance with 78% university transition rate.',
    slug: '2024-kcse-results',
  },
  {
    id: 4,
    title: 'Term 1 Opening Circular 2025',
    date: '02/01/2025',
    category: 'Circular',
    excerpt:
      'Important dates, fees structure, reporting requirements, and new student orientation details.',
    slug: 'term-1-opening-circular-2025',
  },
  {
    id: 5,
    title: 'STEM Fair 2024 Regional Champions',
    date: '25/08/2024',
    category: 'Event',
    excerpt:
      'Our students clinch top positions at the Murang\'a County STEM Innovation Fair.',
    slug: 'stem-fair-2024-champions',
  },
  {
    id: 6,
    title: 'Form 1 Admission & Joining Instructions 2025',
    date: '10/12/2024',
    category: 'Download',
    excerpt:
      'Complete joining instructions for newly admitted Grade 10 and Form 1 students.',
    slug: 'admission-joining-instructions-2025',
  },
];

// ── Principals Timeline ─────────────────────────────────────
export const principals: Principal[] = [
  { id: 1, name: 'Mrs. Mary Wambui Kamau', period: '1960 – 1972' },
  { id: 2, name: 'Mrs. Hannah Njeri Mwangi', period: '1973 – 1985' },
  { id: 3, name: 'Mrs. Grace Wanjiku Kariuki', period: '1986 – 1998' },
  { id: 4, name: 'Mrs. Margaret Nyambura Gitau', period: '1999 – 2010' },
  { id: 5, name: 'Mrs. Agnes Muthoni Ndung\'u', period: '2011 – 2020' },
  { id: 6, name: 'Mrs. Eunice Wangari Muturi', period: '2021 – Present' },
];

// ── BOM Chairpersons Timeline ───────────────────────────────
export const bomChairpersons: BOMChairperson[] = [
  { id: 1, name: 'Mr. Joseph Kamau Ndirangu', period: '1960 – 1975' },
  { id: 2, name: 'Mr. Peter Mwangi Gitonga', period: '1976 – 1990' },
  { id: 3, name: 'Mrs. Dorothy Wanjiru Njoroge', period: '1991 – 2005' },
  { id: 4, name: 'Dr. Samuel Kariuki Maina', period: '2006 – 2018' },
  { id: 5, name: 'Hon. Patrick Njoroge Waithaka', period: '2019 – Present' },
];

// ── Departments ─────────────────────────────────────────────
export const departments: Department[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    hod: 'Mr. James Mwangi',
    description:
      'Building strong numerical and analytical foundations for STEM pathways.',
    subjects: ['Mathematics', 'Additional Mathematics', 'Statistics'],
    icon: 'Calculator',
  },
  {
    id: 'sciences',
    name: 'Sciences',
    hod: 'Dr. Susan Wanjiru',
    description:
      'Comprehensive science education with well-equipped laboratories.',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science'],
    icon: 'FlaskConical',
  },
  {
    id: 'languages',
    name: 'Languages',
    hod: 'Mrs. Janet Njoki',
    description:
      'Proficiency in English, Kiswahili, and foreign languages for global competence.',
    subjects: [
      'English',
      'Kiswahili',
      'Literature',
      'Fasihi',
      'French',
    ],
    icon: 'Languages',
  },
  {
    id: 'humanities',
    name: 'Humanities',
    hod: 'Mr. Patrick Githinji',
    description:
      'Understanding society, history, and governance for informed citizenship.',
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
      'Practical skills in agriculture, home science, and technical subjects.',
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
    meetingDay: 'Saturday 2:00 PM',
    description:
      'Character building, outdoor skills, community service, and international scouting activities.',
    icon: 'Compass',
  },
  {
    id: 'st-john',
    name: 'St. John Ambulance',
    category: 'Movement',
    patron: 'Mr. David Maina',
    meetingDay: 'Saturday 2:00 PM',
    description:
      'First aid training, emergency preparedness, and community health outreach.',
    icon: 'HeartPulse',
  },
  {
    id: 'red-cross',
    name: 'Red Cross',
    category: 'Movement',
    patron: 'Mrs. Agnes Njeri',
    meetingDay: 'Wednesday 4:30 PM',
    description:
      'Humanitarian service, disaster preparedness, and blood donation drives.',
    icon: 'Cross',
  },
  {
    id: 'journalism',
    name: 'Journalism Club',
    category: 'Club',
    patron: 'Mr. Peter Ochieng',
    meetingDay: 'Tuesday 4:30 PM',
    description:
      'School newsletter, creative writing, photography, and media production.',
    icon: 'Newspaper',
  },
  {
    id: 'drama',
    name: 'Drama & Theatre',
    category: 'Club',
    patron: 'Mrs. Lucy Waithera',
    meetingDay: 'Monday 4:30 PM',
    description:
      'Acting, scriptwriting, and theatrical performances for Kenya Music & Drama Festivals.',
    icon: 'Theater',
  },
  {
    id: 'wildlife',
    name: 'Wildlife Club',
    category: 'Club',
    patron: 'Mr. Joseph Kamau',
    meetingDay: 'Thursday 4:30 PM',
    description:
      'Environmental conservation, nature walks, tree planting, and wildlife awareness.',
    icon: 'TreePine',
  },
  {
    id: 'integrity',
    name: 'Integrity Club',
    category: 'Club',
    patron: 'Mrs. Beatrice Muthoni',
    meetingDay: 'Friday 4:30 PM',
    description:
      'Anti-corruption awareness, ethical leadership, and civic education.',
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
    meetingDay: 'Daily 4:00 PM',
    description: 'Indoor and outdoor volleyball teams competing at county and national level.',
    icon: 'CircleDot',
  },
  {
    id: 'netball',
    name: 'Netball',
    category: 'Sport',
    patron: 'Mrs. Mary Njoroge',
    meetingDay: 'Daily 4:00 PM',
    description: 'Premier girls\' sport with consistent county championship participation.',
    icon: 'Target',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    category: 'Sport',
    patron: 'Mr. John Omondi',
    meetingDay: 'Daily 4:00 PM',
    description: 'Competitive basketball training and inter-school tournaments.',
    icon: 'Circle',
  },
  {
    id: 'hockey',
    name: 'Hockey',
    category: 'Sport',
    patron: 'Mrs. Ann Wangari',
    meetingDay: 'Daily 4:00 PM',
    description: 'Field hockey with modern equipment and experienced coaching.',
    icon: 'Slash',
  },
  {
    id: 'athletics',
    name: 'Athletics',
    category: 'Sport',
    patron: 'Mr. Elijah Kipchoge',
    meetingDay: 'Daily 5:30 AM & 4:00 PM',
    description: 'Track and field events including sprints, long-distance, and field events.',
    icon: 'Footprints',
  },
  {
    id: 'handball',
    name: 'Handball',
    category: 'Sport',
    patron: 'Mrs. Faith Wanjiku',
    meetingDay: 'Daily 4:00 PM',
    description: 'Team handball training and competitive fixtures.',
    icon: 'Hand',
  },
];

// ── Daily Routine ───────────────────────────────────────────
export const dailyRoutine: DailyRoutineItem[] = [
  { time: '05:00 AM', activity: 'Wake Up & Morning Prep' },
  { time: '05:30 AM', activity: 'Morning Preps / Personal Study' },
  { time: '06:30 AM', activity: 'Breakfast' },
  { time: '07:00 AM', activity: 'Morning Assembly & Parade' },
  { time: '07:30 AM', activity: 'Lessons Begin (Period 1)' },
  { time: '10:00 AM', activity: 'Short Break (Tea)' },
  { time: '10:20 AM', activity: 'Lessons Continue' },
  { time: '12:40 PM', activity: 'Lunch Break' },
  { time: '02:00 PM', activity: 'Afternoon Lessons' },
  { time: '04:00 PM', activity: 'Games, Clubs & Co-curricular Activities' },
  { time: '05:30 PM', activity: 'Evening Break & Supper Prep' },
  { time: '06:30 PM', activity: 'Supper' },
  { time: '07:00 PM', activity: 'Evening Preps / Personal Study' },
  { time: '09:30 PM', activity: 'Roll Call & Devotions' },
  { time: '10:00 PM', activity: 'Lights Out' },
];

// ── Faith Groups ────────────────────────────────────────────
export const faithGroups: Club[] = [
  {
    id: 'cu',
    name: 'Christian Union (CU)',
    category: 'Faith',
    patron: 'Mrs. Rachael Mukami',
    meetingDay: 'Sunday 9:00 AM & Wednesday 5:00 PM',
    description: 'Interdenominational Christian fellowship, Bible study, and spiritual growth.',
    icon: 'Cross',
  },
  {
    id: 'ycs',
    name: 'Young Christian Students (YCS)',
    category: 'Faith',
    patron: 'Sr. Cecilia Wangeci',
    meetingDay: 'Sunday 9:00 AM & Thursday 5:00 PM',
    description: 'Catholic student movement focused on faith, service, and social justice.',
    icon: 'Heart',
  },
  {
    id: 'sda',
    name: 'SDA Fellowship',
    category: 'Faith',
    patron: 'Mrs. Naomi Njiru',
    meetingDay: 'Saturday 9:00 AM',
    description: 'Seventh-Day Adventist fellowship, Sabbath observance, and community service.',
    icon: 'Sun',
  },
  {
    id: 'muslim',
    name: 'Muslim Student Association',
    category: 'Faith',
    patron: 'Mrs. Fatma Hassan',
    meetingDay: 'Friday 1:00 PM',
    description: 'Islamic prayers, Quran study, and Muslim student community.',
    icon: 'Moon',
  },
];

// ── Downloads ───────────────────────────────────────────────
export const downloads: DownloadItem[] = [
  {
    id: 1,
    title: 'December 2024 Holiday Assignment - Mathematics',
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
    title: 'December 2024 Holiday Assignment - English',
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
    title: 'Term 3 2024 Newsletter',
    category: 'Newsletter',
    level: 'All',
    fileSize: '5.2 MB',
    uploadDate: '15/09/2024',
    department: 'Administration',
    fileUrl: '#',
  },
  {
    id: 4,
    title: 'Grade 10 Joining Instructions 2025',
    category: 'Admission & Joining Instructions',
    level: 'Grade 10',
    fileSize: '3.1 MB',
    uploadDate: '10/12/2024',
    department: 'Admissions',
    fileUrl: '#',
  },
  {
    id: 5,
    title: 'Fee Structure 2025',
    category: 'Fee Structure',
    level: 'All',
    fileSize: '890 KB',
    uploadDate: '05/12/2024',
    department: 'Finance',
    fileUrl: '#',
  },
  {
    id: 6,
    title: 'Term 1 2025 Exam Timetable',
    category: 'Exam Timetable',
    level: 'All',
    fileSize: '1.2 MB',
    uploadDate: '20/01/2025',
    department: 'Examinations',
    fileUrl: '#',
  },
  {
    id: 7,
    title: 'December 2024 Holiday Assignment - Sciences',
    category: 'Holiday Assignment',
    level: 'Grade 10',
    subject: 'Sciences',
    fileSize: '3.5 MB',
    uploadDate: '01/11/2024',
    department: 'Sciences',
    fileUrl: '#',
  },
  {
    id: 8,
    title: 'Term 2 2024 Newsletter',
    category: 'Newsletter',
    level: 'All',
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
    coverImage: '/images/gallery/prayer-day-cover.jpg',
    year: 2024,
    images: [
      { id: 1, src: '/images/gallery/prayer-1.jpg', alt: 'Morning prayers', event: 'Prayer Day 2024', year: 2024 },
      { id: 2, src: '/images/gallery/prayer-2.jpg', alt: 'Guest speaker address', event: 'Prayer Day 2024', year: 2024 },
      { id: 3, src: '/images/gallery/prayer-3.jpg', alt: 'Choir performance', event: 'Prayer Day 2024', year: 2024 },
    ],
  },
  {
    id: 'agm-prize-giving-2024',
    name: 'AGM & Prize Giving Day 2024',
    coverImage: '/images/gallery/agm-cover.jpg',
    year: 2024,
    images: [
      { id: 4, src: '/images/gallery/agm-1.jpg', alt: 'Prize giving ceremony', event: 'AGM & Prize Giving 2024', year: 2024 },
      { id: 5, src: '/images/gallery/agm-2.jpg', alt: 'Award recipients', event: 'AGM & Prize Giving 2024', year: 2024 },
      { id: 6, src: '/images/gallery/agm-3.jpg', alt: 'Parent speeches', event: 'AGM & Prize Giving 2024', year: 2024 },
    ],
  },
  {
    id: 'stem-fair-2024',
    name: 'STEM Innovation Fair 2024',
    coverImage: '/images/gallery/stem-cover.jpg',
    year: 2024,
    images: [
      { id: 7, src: '/images/gallery/stem-1.jpg', alt: 'Science project displays', event: 'STEM Fair 2024', year: 2024 },
      { id: 8, src: '/images/gallery/stem-2.jpg', alt: 'Robotics demonstration', event: 'STEM Fair 2024', year: 2024 },
      { id: 9, src: '/images/gallery/stem-3.jpg', alt: 'Innovation awards', event: 'STEM Fair 2024', year: 2024 },
    ],
  },
  {
    id: 'ksssa-sports-2024',
    name: 'KSSSA Sports 2024',
    coverImage: '/images/gallery/sports-cover.jpg',
    year: 2024,
    images: [
      { id: 10, src: '/images/gallery/sports-1.jpg', alt: 'Athletics meet', event: 'KSSSA Sports 2024', year: 2024 },
      { id: 11, src: '/images/gallery/sports-2.jpg', alt: 'Volleyball finals', event: 'KSSSA Sports 2024', year: 2024 },
      { id: 12, src: '/images/gallery/sports-3.jpg', alt: 'Medal ceremony', event: 'KSSSA Sports 2024', year: 2024 },
    ],
  },
];

// ── School Anthems ──────────────────────────────────────────
export const schoolAnthem = {
  english: {
    title: 'School Anthem',
    verses: [
      'Hail Mumbi Girls, our pride and joy,\nStanding tall through every test,\nWith wisdom\'s light we forge ahead,\nStriving always for the best.',
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
