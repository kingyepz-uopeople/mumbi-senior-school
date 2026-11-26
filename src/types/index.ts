// ============================================================
// Mumbi Girls Senior School - Type Definitions
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface QuickStat {
  label: string;
  value: string;
  detail?: string;
}

export interface PathwayTrack {
  id: string;
  name: string;
  description: string;
  subjects: string[];
  careers: string[];
}

export interface CBCPathway {
  id: 'stem' | 'social-sciences' | 'arts-sports';
  name: string;
  summary: string;
  tracks: PathwayTrack[];
}

export interface NewsItem {
  id: number;
  title: string;
  date: string; // DD/MM/YYYY
  category: 'Newsletter' | 'Circular' | 'Download' | 'Event';
  excerpt: string;
  body: string[];
  slug: string;
}

export interface Principal {
  id: number;
  name: string;
  period: string;
  isCurrent?: boolean;
  image?: string;
}

export interface BOMChairperson {
  id: number;
  name: string;
  period: string;
  isCurrent?: boolean;
}

export interface GovernanceRole {
  id: string;
  role: string;
  title: string;
  description: string;
  responsibilities: string[];
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
  /** Optional note when a sport activity video will be added later. */
  mediaNote?: string;
  /** Optional public path to an activity video (e.g. /videos/sports/badminton.mp4). */
  videoSrc?: string;
  /** Optional activity / team photograph shown on the sport card. */
  imageSrc?: string;
  /** Optional short message from the sport patron / coach. */
  patronMessage?: string[];
}

export interface GamesDepartmentMessage {
  role: string;
  name: string;
  message: string[];
}

export interface DailyRoutineItem {
  time: string;
  activity: string;
}

export interface BoardingSection {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface DownloadItem {
  id: number;
  title: string;
  category:
    | 'Holiday Assignment'
    | 'Newsletter'
    | 'Admission & Joining Instructions'
    | 'Fee Structure'
    | 'Exam Timetable'
    | 'Circular';
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
  /** Optional visible caption, independent of the image's concise alt text. */
  caption?: string;
  event: string;
  year?: number;
  width: number;
  height: number;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  images: GalleryImage[];
  year?: number;
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
  coreValues: { id: string; title: string; description: string }[];
  knecCode: string;
  moeReg: string;
  postalAddress: string;
  locationShort: string;
  physicalLocation: string;
  /** School-shared Google Maps pin, opened for directions. */
  mapsUrl: string;
  /** Embed of the same pin shown on the contact page. */
  mapsEmbedUrl: string;
  officeHours: string;
  officeHoursShort: string;
  email: string;
  phone: string;
  /** Year the foundation stone was laid. */
  founded: number;
  /** Foundation-stone date in DD/MM/YYYY. */
  foundedOn: string;
  /** Person who laid the foundation stone. */
  founder: string;
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
