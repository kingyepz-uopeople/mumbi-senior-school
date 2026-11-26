// ============================================================
// Navigation Configuration
// ============================================================
import { NavItem } from '@/types';

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'School History', href: '/about#history' },
      { label: 'Motto, Mission & Vision', href: '/about#mission' },
      { label: 'School Anthem', href: '/about#anthems' },
      { label: 'Principals, BOM & Council', href: '/about#leadership' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      { label: 'CBC Senior School Pathways', href: '/academics#pathways' },
      { label: 'Academic Departments', href: '/academics#departments' },
      { label: '2026 KCSE Target & Dean of Studies', href: '/academics#kcse-target' },
      { label: 'KCSE Results by Year', href: '/academics#kcse-results' },
      { label: 'KCSE Roll of Honour', href: '/academics#wall-of-fame' },
    ],
  },
  { label: 'Admissions', href: '/admissions' },
  {
    label: 'Student Life',
    href: '/student-life',
    children: [
      { label: 'Clubs & Movements', href: '/explore#clubs' },
      { label: 'Sports & Games', href: '/explore#sports' },
      { label: 'Daily Routine', href: '/explore#routine' },
      { label: 'Chaplaincy & Faith', href: '/explore#faith' },
      { label: 'Boarding & Uniform', href: '/explore#boarding' },
    ],
  },
  { label: 'Downloads', href: '/downloads' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];
