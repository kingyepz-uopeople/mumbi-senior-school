// ============================================================
// Navigation Configuration
// ============================================================
import { NavItem } from '@/types';

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'History & Background', href: '/about#history' },
      { label: 'Motto, Mission & Vision', href: '/about#mission' },
      { label: 'School Anthems', href: '/about#anthems' },
      { label: 'Leadership & Governance', href: '/about#leadership' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      { label: 'CBC Pathways Explorer', href: '/academics#pathways' },
      { label: 'Departments', href: '/academics#departments' },
      { label: 'KCSE Wall of Fame', href: '/academics#wall-of-fame' },
    ],
  },
  {
    label: 'Student Life',
    href: '/explore',
    children: [
      { label: 'Clubs & Societies', href: '/explore#clubs' },
      { label: 'Sports & Games', href: '/explore#sports' },
      { label: 'Daily Routine', href: '/explore#routine' },
      { label: 'Chaplaincy & Faith', href: '/explore#faith' },
      { label: 'Boarding & Meals', href: '/explore#boarding' },
    ],
  },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];
