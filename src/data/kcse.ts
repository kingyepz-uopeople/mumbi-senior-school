// A school goal, not an examination result.
export const kcse2026Target = {
  year: 2026,
  schoolMean: '8.3+++',
} as const;

const gradeScale = [
  ['A', 12], ['A-', 11], ['B+', 10], ['B', 9], ['B-', 8], ['C+', 7],
  ['C', 6], ['C-', 5], ['D+', 4], ['D', 3], ['D-', 2], ['E', 1],
] as const;

type KcseGrade = typeof gradeScale[number][0];

export interface KcseReport {
  year: number;
  meanPoints: number;
  meanGrade: KcseGrade;
  candidateCount: number;
  cPlusOrHigher: number;
  grades: readonly { grade: KcseGrade; gradePoints: number; count: number }[];
  streams: readonly { name: string; entries: number; meanPoints: string; meanGrade: KcseGrade }[];
  topPerformers: readonly { overallRank: number; name: string; points: number; meanGrade: KcseGrade }[];
}

type KcseReportInput = Omit<KcseReport, 'grades' | 'candidateCount' | 'cPlusOrHigher'> & {
  gradeCounts: Partial<Record<KcseGrade, number>>;
};

function createKcseReport({ gradeCounts, ...report }: KcseReportInput): KcseReport {
  const grades = gradeScale.flatMap(([grade, gradePoints]) => {
    const count = gradeCounts[grade] ?? 0;
    return count > 0 ? [{ grade, gradePoints, count }] : [];
  });

  return {
    ...report,
    grades,
    candidateCount: grades.reduce((total, { count }) => total + count, 0),
    cPlusOrHigher: grades.reduce((total, { gradePoints, count }) => total + (gradePoints >= 7 ? count : 0), 0),
  };
}

// Transcribed from the school's KCSE grade summaries. Ranks (including ties),
// names and grades are taken as printed; the source reports and internal IDs are not published.
export const kcse2025 = createKcseReport({
  year: 2025,
  meanPoints: 7.1926,
  meanGrade: 'C+',
  gradeCounts: { 'A-': 1, 'B+': 14, B: 39, 'B-': 67, 'C+': 59, C: 52, 'C-': 28, 'D+': 9, D: 1 },
  streams: [
    { name: 'Form 4 N', entries: 48, meanPoints: '7.7083', meanGrade: 'B-' },
    { name: 'Form 4 S', entries: 38, meanPoints: '7.3158', meanGrade: 'C+' },
    { name: 'Form 4 M', entries: 44, meanPoints: '7.25', meanGrade: 'C+' },
    { name: 'Form 4 G', entries: 46, meanPoints: '7.1522', meanGrade: 'C+' },
    { name: 'Form 4 T', entries: 49, meanPoints: '7.0816', meanGrade: 'C+' },
    { name: 'Form 4 H', entries: 45, meanPoints: '6.6444', meanGrade: 'C+' },
  ],
  topPerformers: [
    { overallRank: 1, name: 'Ndirangu Wambui Serah', points: 75, meanGrade: 'A-' },
    { overallRank: 2, name: 'Irungu Hannah Wambui', points: 72, meanGrade: 'B+' },
    { overallRank: 3, name: 'Wairimu Maryann Mumbi', points: 71, meanGrade: 'B+' },
    { overallRank: 3, name: "Ndung'u Brenda Anne Wanjiku", points: 71, meanGrade: 'B+' },
    { overallRank: 5, name: 'Njoroge Noreen Wanjiru', points: 70, meanGrade: 'B+' },
    { overallRank: 6, name: 'Irungu Brenda Muthoni', points: 69, meanGrade: 'B+' },
    { overallRank: 6, name: 'Karanu Fidelis Wambui', points: 69, meanGrade: 'B+' },
    { overallRank: 6, name: 'Wairimu Maryanne Nyambura', points: 69, meanGrade: 'B' },
    { overallRank: 6, name: 'Macharia Pauline Njeri', points: 69, meanGrade: 'B+' },
    { overallRank: 10, name: 'Njaramba Celine Wambui', points: 68, meanGrade: 'B+' },
    { overallRank: 10, name: 'Eshuchi Nicole Adero', points: 68, meanGrade: 'B+' },
  ],
});

export const kcse2024 = createKcseReport({
  year: 2024,
  meanPoints: 7.2644,
  meanGrade: 'C+',
  gradeCounts: { 'A-': 3, 'B+': 13, B: 38, 'B-': 80, 'C+': 71, C: 60, 'C-': 22, 'D+': 7, D: 1 },
  streams: [
    { name: 'Form 4 H', entries: 50, meanPoints: '7.52', meanGrade: 'B-' },
    { name: 'Form 4 G', entries: 52, meanPoints: '7.4423', meanGrade: 'C+' },
    { name: 'Form 4 M', entries: 50, meanPoints: '7.24', meanGrade: 'C+' },
    { name: 'Form 4 N', entries: 48, meanPoints: '7.2292', meanGrade: 'C+' },
    { name: 'Form 4 S', entries: 49, meanPoints: '7.0816', meanGrade: 'C+' },
    { name: 'Form 4 T', entries: 46, meanPoints: '7.0435', meanGrade: 'C+' },
  ],
  topPerformers: [
    { overallRank: 1, name: 'Mary Wambui Gathukia', points: 78, meanGrade: 'A-' },
    { overallRank: 2, name: 'Michelle Wairimu Ngugi', points: 76, meanGrade: 'A-' },
    { overallRank: 3, name: 'Silvia Waithera Ngugi', points: 74, meanGrade: 'A-' },
    { overallRank: 4, name: 'Kibagendi Faith Mueni', points: 73, meanGrade: 'B+' },
    { overallRank: 4, name: 'Pauline Mugechi Macharia', points: 73, meanGrade: 'B+' },
    { overallRank: 4, name: 'Kararwa Juliet Mugure', points: 73, meanGrade: 'B+' },
    { overallRank: 7, name: 'Kimani Roselyne Wangui', points: 72, meanGrade: 'B+' },
    { overallRank: 8, name: 'Faith Wacu Kanywela', points: 71, meanGrade: 'B+' },
    { overallRank: 9, name: 'Kanyi Monicah Nyambura', points: 70, meanGrade: 'B+' },
    { overallRank: 9, name: 'Chiira Isabel Wangui', points: 70, meanGrade: 'B+' },
  ],
});

const kcse2023 = createKcseReport({
  year: 2023,
  meanPoints: 6.8625,
  meanGrade: 'C+',
  gradeCounts: { 'A-': 3, 'B+': 4, B: 29, 'B-': 56, 'C+': 78, C: 52, 'C-': 27, 'D+': 13, D: 5, 'D-': 2 },
  streams: [
    { name: 'Form 4 G', entries: 50, meanPoints: '7.2', meanGrade: 'C+' },
    { name: 'Form 4 M', entries: 48, meanPoints: '7.1667', meanGrade: 'C+' },
    { name: 'Form 4 T', entries: 46, meanPoints: '6.9348', meanGrade: 'C+' },
    { name: 'Form 4 S', entries: 45, meanPoints: '6.8889', meanGrade: 'C+' },
    { name: 'Form 4 N', entries: 40, meanPoints: '6.65', meanGrade: 'C+' },
    { name: 'Form 4 H', entries: 40, meanPoints: '6.175', meanGrade: 'C' },
  ],
  topPerformers: [
    { overallRank: 1, name: 'Wanjiru Leila Wangeci', points: 78, meanGrade: 'A-' },
    { overallRank: 2, name: 'Ndei Joybrenda Mweru', points: 75, meanGrade: 'A-' },
    { overallRank: 3, name: 'Lilian Lenanyoike', points: 74, meanGrade: 'A-' },
    { overallRank: 4, name: 'Kamau Jane Nduta', points: 72, meanGrade: 'B+' },
    { overallRank: 5, name: 'Muturi Annastacia Njeri', points: 71, meanGrade: 'B+' },
    { overallRank: 6, name: 'Mwendwa Sharon Joshua', points: 69, meanGrade: 'B+' },
    { overallRank: 7, name: 'Mwangi Christine Waithira', points: 67, meanGrade: 'B+' },
    { overallRank: 8, name: 'Chege Lucy Njeri', points: 66, meanGrade: 'B' },
    { overallRank: 8, name: 'Kiragu Vivian Kabura', points: 66, meanGrade: 'B' },
    { overallRank: 8, name: 'Kinyua Grace Njeri', points: 66, meanGrade: 'B' },
  ],
});

const kcse2022 = createKcseReport({
  year: 2022,
  meanPoints: 6.8584,
  meanGrade: 'C+',
  gradeCounts: { 'B+': 7, B: 21, 'B-': 42, 'C+': 64, C: 62, 'C-': 35, 'D+': 2 },
  streams: [
    { name: 'Form 4 T', entries: 45, meanPoints: '7.3778', meanGrade: 'C+' },
    { name: 'Form 4 H', entries: 49, meanPoints: '6.9388', meanGrade: 'C+' },
    { name: 'Form 4 S', entries: 47, meanPoints: '6.9149', meanGrade: 'C+' },
    { name: 'Form 4 G', entries: 44, meanPoints: '6.6591', meanGrade: 'C+' },
    { name: 'Form 4 M', entries: 48, meanPoints: '6.4167', meanGrade: 'C' },
  ],
  topPerformers: [
    { overallRank: 1, name: 'Mwangi Margaret Nyokabi', points: 72, meanGrade: 'B+' },
    { overallRank: 2, name: 'Muthoni Hellen Njeri', points: 71, meanGrade: 'B+' },
    { overallRank: 3, name: 'Murimi Everlyne Wambui', points: 69, meanGrade: 'B+' },
    { overallRank: 3, name: 'Mbau Monicah Muthoni', points: 69, meanGrade: 'B+' },
    { overallRank: 5, name: 'Chomba Prudence Ruth Njeri', points: 68, meanGrade: 'B+' },
    { overallRank: 6, name: 'Nyambura Bridget Wanjiku', points: 67, meanGrade: 'B+' },
    { overallRank: 6, name: 'Mwakale Fridah Kina', points: 67, meanGrade: 'B+' },
    { overallRank: 8, name: 'Salama Candida Kamango', points: 65, meanGrade: 'B' },
    { overallRank: 8, name: 'Muthoni Lydiah Wangari', points: 65, meanGrade: 'B' },
    { overallRank: 10, name: "Camilla Achieng'", points: 64, meanGrade: 'B' },
    { overallRank: 10, name: 'Njeri Gladys Nyambura', points: 64, meanGrade: 'B' },
    { overallRank: 10, name: 'Kamau Faith Njeri', points: 64, meanGrade: 'B' },
    { overallRank: 10, name: 'Wainaina Shivelle Wangeci', points: 64, meanGrade: 'B' },
    { overallRank: 10, name: 'Wanjiru Hannah Wanjiku', points: 64, meanGrade: 'B' },
    { overallRank: 10, name: 'Wanjiku Jane Muthoni', points: 64, meanGrade: 'B' },
    { overallRank: 10, name: 'Kahoro Mary Nyakinyua', points: 64, meanGrade: 'B' },
  ],
});

export const kcseReports = [kcse2025, kcse2024, kcse2023, kcse2022] as const;

const percentFormatter = new Intl.NumberFormat('en-KE', {
  style: 'percent',
  maximumFractionDigits: 1,
});

export function formatCPlusShare({ cPlusOrHigher, candidateCount }: KcseReport): string {
  return percentFormatter.format(cPlusOrHigher / candidateCount);
}
