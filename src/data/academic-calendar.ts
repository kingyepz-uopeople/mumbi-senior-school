// Ministry of Education 2027 Academic Calendar (Senior & Secondary Schools).
// Source circular: REF MOE.HQS/3/13/3/VOL III, 19 October 2026,
// signed by PS John L. Ololtuaa (State Department for Basic Education).
// Dates below are the Senior & Secondary table only — not Pre-Primary,
// Primary, Junior, or Teachers Training College calendars.

export const MOE_2027_CALENDAR = {
  slug: 'moe-2027-academic-calendar',
  ref: 'MOE.HQS/3/13/3/VOL III',
  issuedOn: '19/10/2026',
  publishedOn: '26/11/2026',
  title: '2027 Academic Calendar (Ministry of Education)',
  newsTitle: '2027 School Calendar released by the Ministry of Education',
  signedBy: 'John L. Ololtuaa, CBS',
  signedByRole:
    'Principal Secretary, State Department for Basic Education',
  sourceUrl:
    'https://arena.co.ke/ministry-of-education-2027-school-term-dates-school-calendar/',
  sourceUrlAlt:
    'https://educationnews.co.ke/news/2027-school-calendar-term-dates-holidays-and-national-examination-window',
  audience: 'Senior & Secondary Schools',
  rows: [
    {
      id: 'term-1',
      label: 'Term I',
      opens: '4 January 2027',
      closes: '2 April 2027',
      duration: '13 weeks',
    },
    {
      id: 'half-term-1',
      label: 'Half term',
      opens: '19 February 2027',
      closes: '28 February 2027',
      duration: '10 days',
    },
    {
      id: 'april-holiday',
      label: 'April holiday',
      opens: '3 April 2027',
      closes: '2 May 2027',
      duration: '4 weeks',
    },
    {
      id: 'term-2',
      label: 'Term II',
      opens: '3 May 2027',
      closes: '30 July 2027',
      duration: '13 weeks',
    },
    {
      id: 'half-term-2',
      label: 'Half term',
      opens: '9 June 2027',
      closes: '20 June 2027',
      duration: '12 days',
    },
    {
      id: 'august-holiday',
      label: 'August holiday',
      opens: '31 July 2027',
      closes: '29 August 2027',
      duration: '4 weeks',
    },
    {
      id: 'term-3',
      label: 'Term III',
      opens: '30 August 2027',
      closes: '5 November 2027',
      duration: '10 weeks',
    },
    {
      id: 'kcse-2027',
      label: 'KCSE 2027',
      opens: '8 November 2027',
      closes: '26 November 2027',
      duration: '3 weeks',
    },
    {
      id: 'december-holiday',
      label: 'December holiday',
      opens: '6 November 2027',
      closes: '3 January 2028',
      duration: '8 weeks',
    },
  ],
} as const;

export type Moe2027CalendarRow = (typeof MOE_2027_CALENDAR.rows)[number];
