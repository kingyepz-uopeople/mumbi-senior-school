import type { Dictionary } from '@/i18n/dictionaries/en';
import type { NavItem } from '@/types';

export function navItemIsActive(pathname: string, item: NavItem): boolean {
  if (pathname === item.href) return true;
  return (
    item.children?.some((child) => {
      const path = child.href.split('#')[0] || '/';
      return path !== '/' && pathname === path;
    }) ?? false
  );
}

export function getNavigation(dict: Dictionary): NavItem[] {
  return [
    { label: dict.nav.home, href: '/' },
    {
      label: dict.nav.about,
      href: '/about',
      children: [
        { label: dict.nav.aboutHistory, href: '/about#history' },
        { label: dict.nav.aboutMission, href: '/about#mission' },
        { label: dict.nav.aboutAnthems, href: '/about#anthems' },
        { label: dict.nav.aboutLeadership, href: '/about#leadership' },
      ],
    },
    {
      label: dict.nav.academics,
      href: '/academics',
      children: [
        { label: dict.nav.academicsPathways, href: '/academics#pathways' },
        {
          label: dict.nav.academicsDepartments,
          href: '/academics#departments',
        },
        {
          label: dict.nav.academicsKcseTarget,
          href: '/academics#kcse-target',
        },
        {
          label: dict.nav.academicsKcseResults,
          href: '/academics#kcse-results',
        },
        {
          label: dict.nav.academicsWallOfFame,
          href: '/academics#wall-of-fame',
        },
      ],
    },
    { label: dict.nav.admissions, href: '/admissions' },
    {
      label: dict.nav.studentLife,
      href: '/student-life',
      children: [
        { label: dict.nav.clubs, href: '/explore#clubs' },
        { label: dict.nav.sports, href: '/explore#sports' },
        { label: dict.nav.routine, href: '/explore#routine' },
        { label: dict.nav.faith, href: '/explore#faith' },
        { label: dict.nav.boarding, href: '/explore#boarding' },
      ],
    },
    { label: dict.nav.downloads, href: '/downloads' },
    { label: dict.nav.news, href: '/news' },
    { label: dict.nav.gallery, href: '/gallery' },
    { label: dict.nav.contact, href: '/contact' },
  ];
}
