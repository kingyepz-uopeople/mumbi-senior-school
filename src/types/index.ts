// ============================================================
// Mumbi Girls Senior School - Type Definitions
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

export interface QuickStat {
  label: string;
  value: string;
  icon: string;
}

export interface PathwayTrack {
  id: string;
  name: string;
  description: string;
  subjects: string[];
  careers: string[];
  icon: string;
}

export interface CBCPathway {
  id: string;
  name: string;
  tracks: PathwayTrack[];
}

export interface TopStudent {
  id: number;
  name: string;
  year: number;
  meanGrade: string;
  points: number;
  university: string;
  course: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string; // DD/MM/YYYY
  category: 'Newsletter' | 'Circular' | 'Download' | 'Event';
  excerpt: string;
  slug: string;
}

export interface Principal {
  id: number;
  name: string;
  period: string;
  image?: string;
}

export interface BOMChairperson {
  id: number;
  name: string;
  period: string;
}

export interface Department {
  id: string;
  name: string;
  hod: string;
  description: string;
  subjects: string[];
  icon: string;
}

export interface Club {
  id: string;
  name: string;
  category: 'Club' | 'Society' | 'Movement' | 'Sport' | 'Faith';
  patron: string;
  meetingDay: string;
  description: string;
  icon: string;
}

export interface DailyRoutineItem {
  time: string;
  activity: string;
}

export interface DownloadItem {
  id: number;
  title: string;
  category: 'Holiday Assignment' | 'Newsletter' | 'Admission & Joining Instructions' | 'Fee Structure' | 'Exam Timetable' | 'Circular';
  level: 'Grade 10' | 'Grade 11' | 'Grade 12' | 'Form 3' | 'Form 4' | 'All';
  subject?: string;
  fileSize: string;
  uploadDate: string; // DD/MM/YYYY
  department: string;
  fileUrl: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  event: string;
  year: number;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  coverImage: string;
  images: GalleryImage[];
  year: number;
}

export interface ContactInquiry {
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
}

export interface SchoolInfo {
  name: string;
  motto: string;
  mission: string;
  vision: string;
  coreValues: string[];
  knecCode: string;
  moeReg: string;
  postalAddress: string;
  physicalLocation: string;
  officeHours: string;
  founded: number;
  category: string;
  domain: string;
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
