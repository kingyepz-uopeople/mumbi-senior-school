import type { Locale } from '@/i18n/config';
import {
  boardingSections as boardingSectionsEn,
  clubs as clubsEn,
  dailyRoutine as dailyRoutineEn,
  faithGroups as faithGroupsEn,
  headOfGames as headOfGamesEn,
  sports as sportsEn,
} from '@/data/mock-school-data';
import type {
  BoardingSection,
  Club,
  DailyRoutineItem,
  GamesDepartmentMessage,
} from '@/types';

type LocalizedClubFields = {
  name: string;
  description: string;
  category: string;
  meetingDay: string;
  mediaNote?: string;
  patronMessage?: string[];
};

type LocalizedBoardingFields = Pick<
  BoardingSection,
  'title' | 'description' | 'highlights'
>;

const sportSw: Record<string, LocalizedClubFields> = {
  volleyball: {
    name: 'Volleyball',
    category: 'Michezo',
    meetingDay: 'Kila siku, 16:00',
    description:
      'Timu za volleyball za shule zinazoshindana katika mechi za nyumba kwa nyumba na mechi za KSSSA za kaunti ndogo, kaunti, na mkoa.',
    patronMessage: [
      'Volleyball hufundisha ushirikiano, timing, na uvumilivu. Kila alasiri wasichana wetu hufanya mazoezi ya serve, set, na spike kwa nidhamu na furaha.',
      'Ninakaribisha wanafunzi walio tayari kufanya mazoezi kwa bidii, kuwaunga mkono wenzao, na kuiwakilisha Mumbi Girls kwa kiburi katika kila mechi.',
    ],
  },
  netball: {
    name: 'Netball',
    category: 'Michezo',
    meetingDay: 'Kila siku, 16:00',
    description:
      'Mazoezi ya uwanja wa alasiri, mashindano ya nyumba kwa nyumba, na mashindano ya shule za upili za Kaunti ya Murang\'a.',
  },
  basketball: {
    name: 'Basketball',
    category: 'Michezo',
    meetingDay: 'Kila siku, 16:00',
    description:
      'Misingi ya uwanja, mazoezi ya fitness, na mechi zilizopangwa kati ya shule.',
  },
  hockey: {
    name: 'Hockey',
    category: 'Michezo',
    meetingDay: 'Kila siku, 16:00',
    description:
      'Uchezaji wa hockey wa uwanja, michezo ya nafasi, na maandalizi ya mechi za muhula za KSSSA.',
  },
  athletics: {
    name: 'Athletics',
    category: 'Michezo',
    meetingDay: 'Kila siku, 05:30 na 16:00',
    description:
      'Mazoezi ya track and field yanayojumuisha mbio fupi, za kati na ndefu, relay, kuruka, na kutupa.',
  },
  handball: {
    name: 'Handball',
    category: 'Michezo',
    meetingDay: 'Kila siku, 16:00',
    description:
      'Ufunzaji wa handball ya timu, mechi za darasa kwa darasa, na ushiriki katika mashindano ya KSSSA.',
  },
  football: {
    name: 'Football',
    category: 'Michezo',
    meetingDay: 'Kila siku, 16:00',
    description:
      'Timu za football za shule zinazojizoeza kwa ligi za nyumba kwa nyumba na michuano ya KSSSA ya Kaunti ya Murang\'a.',
    patronMessage: [
      'Football hujenga stamina, ushirikiano, na ujasiri. Wasichana wetu hufanya mazoezi kila alasiri ili kuiwakilisha Mumbi Girls kwa kiburi uwanjani.',
      'Ninakaribisha kila mwanafunzi aliye tayari kujitolea katika mazoezi, mchezo wa haki, na kuwaunga mkono wenzake.',
    ],
  },
  'table-tennis': {
    name: 'Table Tennis',
    category: 'Michezo',
    meetingDay: 'Kila siku, 16:00',
    description:
      'Ufunzaji wa table tennis unaojumuisha grip, serve, udhibiti wa rally, na mchezo wa singles na doubles wa burudani hadi wa ushindani.',
    patronMessage: [
      'Table tennis hunoa umakini, footwork, na maamuzi ya haraka. Tunafanya mazoezi kila siku ili kila msichana afurahie mchezo na kukuza kujiamini.',
      'Njoo ukiwa tayari kujifunza misingi, kujipa changamoto katika rallies, na kusherehekea maendeleo pamoja na wenzako.',
    ],
  },
  badminton: {
    name: 'Badminton',
    category: 'Michezo',
    meetingDay: 'Kila siku, 16:00',
    description:
      'Ujuzi wa racket, mazoezi ya doubles na singles, na mchezo wa burudani hadi wa ushindani kwa wanafunzi wa Shule ya Upili.',
    patronMessage: [
      'Badminton hutuzwa nidhamu, wepesi, na sportsmanship. Vipindi vyetu vinachanganya mazoezi ya ujuzi na mechi ili kila mwanafunzi aboreshe kwa kasi yake.',
      'Ninawaalika wasichana wanaopenda michezo ya racket kujiunga nasi baada ya masomo — leteni nguvu, heshima kwa wenzake, na nia ya kufanya mazoezi.',
    ],
  },
};

const headOfGamesSw: GamesDepartmentMessage = {
  role: 'Mkuu wa Michezo na Athletics',
  name: 'Mr. Solomon Kamau',
  message: [
    'Michezo na athletics ni sehemu muhimu ya maisha ya bweni katika Mumbi Girls. Kila alasiri wanafunzi wetu hufanya mazoezi kwa nidhamu, ushirikiano, na heshima kwa kila mmoja uwanjani, shambani, na kwenye track.',
    'Tunashiriki ligi za nyumba kwa nyumba na michuano ya KSSSA ya Kaunti ya Murang\'a ili kila mwanafunzi anayejitolea katika mazoezi aweze kuiwakilisha shule kwa kiburi — na kukua kuwa mwanamke mwenye afya na kujiamini zaidi.',
  ],
};

const clubSw: Record<string, LocalizedClubFields> = {
  'scout-association': {
    name: 'Chama cha Scout',
    category: 'Harakati',
    meetingDay: 'Jumamosi, 14:00',
    description:
      'Mazoezi ya parade, campcraft, ujuzi wa nje, na huduma kwa jamii chini ya programu ya Kenya Scouts Association.',
  },
  'st-john': {
    name: 'St. John Ambulance',
    category: 'Harakati',
    meetingDay: 'Jumamosi, 14:00',
    description:
      'Vyeti vya huduma ya kwanza, mazoezi ya majibu ya dharura, na kuhudumu wakati wa michezo na makusanyiko ya shule.',
  },
  'red-cross': {
    name: 'Red Cross',
    category: 'Harakati',
    meetingDay: 'Jumatano, 16:30',
    description:
      'Uhamasishaji wa huduma ya kwanza, elimu ya afya kwa wenza, maandalizi ya majanga, na kampeni za ustawi wa eneo.',
  },
  journalism: {
    name: 'Klabu ya Uandishi wa Habari',
    category: 'Klabu',
    meetingDay: 'Jumanne, 16:30',
    description:
      'Uandishi wa jarida la muhula, muhtasari wa habari za kusanyiko, mijadala, mazoezi ya uandishi, na upigaji picha wa matukio.',
  },
  drama: {
    name: 'Drama na Theatre',
    category: 'Klabu',
    meetingDay: 'Jumatatu, 16:30',
    description:
      'Michezo ya jukwaa, spoken word, choral verse, na mazoezi kwa Festivali za Drama na Muziki za Shule na Vyuo vya Kenya.',
  },
  wildlife: {
    name: 'Klabu ya Wanyamapori',
    category: 'Klabu',
    meetingDay: 'Alhamisi, 16:30',
    description:
      'Kupanda miti katika shamba la shule, miradi ya uhifadhi wa mazingira, na safari za masomo ya uga.',
  },
  integrity: {
    name: 'Klabu ya Uadilifu',
    category: 'Klabu',
    meetingDay: 'Ijumaa, 16:30',
    description:
      'Majadiliano ya wenza kuhusu uaminifu, sheria za shule, mwenendo wa kimaadili, na uwajibikaji wa kiraia.',
  },
};

const faithSw: Record<string, LocalizedClubFields> = {
  cu: {
    name: 'Christian Union (CU)',
    category: 'Imani',
    meetingDay: 'Jumapili 09:00 na Jumatano 17:00',
    description:
      'Ibada ya Kikristo ya madhehebu mbalimbali, somo la Biblia, mazoezi ya kwaya, na ushirika wa wenza.',
  },
  ycs: {
    name: 'Young Christian Students (YCS)',
    category: 'Imani',
    meetingDay: 'Jumapili 09:00 na Alhamisi 17:00',
    description:
      'Ushirika wa wanafunzi Wakatoliki wenye sala ya kila wiki, maandalizi ya liturujia, na shughuli za huduma.',
  },
  sda: {
    name: 'SDA Fellowship',
    category: 'Imani',
    meetingDay: 'Jumamosi 09:00',
    description:
      'Ibada ya Sabato ya Seventh-Day Adventist, somo la Maandiko, na ushirika wa kwaya.',
  },
  muslim: {
    name: 'Muslim Student Association',
    category: 'Imani',
    meetingDay: 'Ijumaa 13:00',
    description:
      'Uzingatiaji wa sala uliopangwa, somo la Quran, na ushirika kwa wanafunzi Waislamu.',
  },
};

const routineSw: Record<string, string> = {
  '05:00': 'Kuamka na maandalizi ya bweni',
  '05:30': 'Preps za asubuhi na masomo ya kibinafsi',
  '06:30': 'Kiamsha kinywa katika chumba cha kulia',
  '07:00': 'Kusanyiko la asubuhi, ukaguzi, na parade',
  '07:30': 'Masomo ya asubuhi yanaanza (Kipindi cha 1)',
  '10:00': 'Mapumziko mafupi ya chai',
  '10:20': 'Masomo ya katikati ya asubuhi',
  '12:40': 'Mapumziko ya chakula cha mchana',
  '14:00': 'Masomo ya alasiri na majaribio ya maabara',
  '16:00': 'Michezo, vilabu, na shughuli za ziada',
  '17:30': 'Kuosha uso na maandalizi ya chakula cha jioni',
  '18:30': 'Chakula cha jioni',
  '19:00': 'Preps za jioni zilizosimamiwa',
  '21:30': 'Kupiga kura ya bweni na sala za jioni',
  '22:00': 'Kuzima taa',
};

const boardingSw: Record<string, LocalizedBoardingFields> = {
  meals: {
    title: 'Chumba cha Kulia na Chakula',
    description:
      'Chakula hutayarishwa shuleni na kutolewa katika chumba cha kulia cha shule kulingana na menyu ya kila wiki iliyowekwa.',
    highlights: [
      'Kiamsha kinywa, chai ya 10:00, chakula cha mchana chenye joto, na chakula cha jioni hutolewa kila siku',
      'Menyu ya kila wiki ya nafaka, kunde, mboga za msimu, matunda, nyama, na maziwa',
      'Vituo vya maji ya kunywa na ukaguzi wa kawaida wa usafi wa jikoni',
    ],
  },
  uniform: {
    title: 'Sare Rasmi ya Shule',
    description:
      'Wanafunzi huvaa sare rasmi ya Mumbi Girls Senior School wakati wa darasa na shughuli rasmi. Wanafunzi wa Gredi 10 huvaa shati jeupe lenye mikono mifupi na nembo ya shule iliyoshonwa. Orodha kamili hutolewa katika maelekezo ya kujiunga.',
    highlights: [
      'Shati jeupe lenye mikono mifupi na kola, lenye nembo ya Mumbi Girls kwenye mfuko wa kifua',
      'Skirti yenye mikunjo na mistari ya bluu na nyeupe, soksi zilizoidhinishwa, na viatu vyeusi vya ngozi vyenye kamba',
      'Kitanda cha michezo na vitu vingine vilivyotajwa katika maelekezo ya kujiunga',
    ],
  },
  welfare: {
    title: 'Mabweni, Afya na Usalama',
    description:
      'Wanafunzi wote hukaa katika mabweni yaliyosimamiwa shuleni katika muhula mzima.',
    highlights: [
      'Usalama wa lango wa saa 24 na usimamizi wa house-mistress katika mabweni',
      'Sanatorium ya shule na taratibu za rufaa hospitalini inapohitajika',
      'Ofisi ya Ushauri na Mwongozo na vikundi vya walimu-washauri',
    ],
  },
};

const welcomeSw = {
  principal: [
    'Ni kwa fahari kubwa na ukarimu wa dhati ninawakaribisha kwenye nyumba rasmi ya kidijitali ya Mumbi Girls Senior School. Ikiyoko katika mazingira tulivu ya kujifunza ya Mukuyu katika Kiharu, Kaunti ya Murang\'a, taasisi yetu inasimama kama kituo cha ukali wa kielimu, uadilifu wa kimaadili, na uwezeshaji kamili wa mtoto wa kike.',
    'Kwa miongo mingi, Mumbi Girls imelea wanawake vijana kuwa viongozi wenye kujiamini, nidhamu, na maono wanaofuzu katika mitihani ya kitaifa, uwekaji wa vyuo vikuu, na nyanja mbalimbali za jamii. Leo, tunapokumbatia mfumo wa Elimu ya Uwezo wa Shule ya Upili, tunaandaa wanafunzi wetu si tu kufaulu mitihani, bali kugundua na kuendeleza uwezo wao wa kipekee katika njia zetu za STEM, Sayansi za Jamii, na Sanaa na Sayansi ya Michezo.',
    'Katika Mumbi Girls Senior School, tunaamini kwamba elimu ya kweli inasawazisha akili kali na tabia thabiti. Pamoja na ufundishaji wa darasani kutoka kwa walimu wetu waliojitolea, tunaweka mkazo mkubwa katika lishe ya kiroho, ubora wa shughuli za ziada, uongozi, na uwajibikaji wa kibinafsi. Kila mwanafunzi anayeingia milangoni mwetu husimamiwa kufikiri kwa makini, kuhudumu bila ubinafsi, na kuongoza kwa ujasiri.',
    'Iwe wewe ni mzazi anayetarajia, mwanafunzi wa sasa, alumna mwenye fahari, au mshirika wa elimu, ninakualika uchunguze programu zetu, ufuatilie mafanikio yetu, na uunganishe na jamii yetu hai ya shule kupitia langisho hili. Pamoja, tuendelee kuunda wanawake wenye dhamana watakaobadilisha taifa letu na dunia.',
  ],
  dean: [
    'Karibu Ofisi ya Kielimu ya Mumbi Girls Senior School. Kama Mkuu wa Masomo, ni fursa kufanya kazi pamoja na timu ya walimu waliojitolea na wanafunzi wenye motisha ya juu wanaoendelea kusukuma mipaka ya mafanikio ya kielimu.',
    'Falsafa yetu ya kielimu imejengwa juu ya maandalizi makali, ushauri wa kibinafsi, na urekebishaji laini kwa mtaala wa Elimu ya Uwezo wa Shule ya Upili. Iwe mwanafunzi anafuata STEM, Sayansi za Jamii, au Sanaa na Sayansi ya Michezo, idara zetu zinahakikisha anapata uzoefu wa maabara wa vitendo, ratiba za marudio zilizopangwa, na ufuatiliaji wa karibu wa kielimu kutoka Gredi 10 hadi mitihani ya kitaifa.',
    'Zaidi ya ufundishaji wa darasani, tunakuza utamaduni wa udadisi wa kiakili, tabia za kujifunza kwa nidhamu, na ushirikiano wa wenza. Kupitia langisho letu la kujifunza kidijitali, wanafunzi na wazazi wanaweza kupata kwa urahisi kazi za likizo, kalenda za kielimu za muhula, na nyenzo za marudio ili kujifunza kuendelee shuleni na nyumbani.',
    'Tunabakia kujitolea kumwongoza kila msichana kufikia uwezo wake wa juu zaidi wa kielimu na kupata nafasi za ushindani katika vyuo vikuu na taasisi za juu zinazoongoza nchini Kenya na kwingineko.',
  ],
};

const welcomeEn = {
  principal: [
    'It is with immense pride and warm hospitality that I welcome you to the official digital home of Mumbi Girls Senior School. Located in the serene learning environment of Mukuyu in Kiharu, Murang\u2019a County, our institution stands as a center of academic rigor, moral integrity, and holistic girl-child empowerment.',
    'For decades, Mumbi Girls has nurtured young women into confident, disciplined, and visionary leaders who excel across national examinations, university placements, and diverse spheres of society. Today, as we embrace the Competency-Based Education Senior School framework, we are equipping our learners not just to pass exams, but to discover and master their unique potential across our STEM, Social Sciences, and Arts and Sports Science pathways.',
    'At Mumbi Girls Senior School, we believe that true education balances sharp intellect with strong character. Alongside dedicated classroom instruction from our committed teaching staff, we place deep emphasis on spiritual nourishment, co-curricular excellence, leadership, and personal responsibility. Every learner who walks through our gates is mentored to think critically, serve selflessly, and lead with courage.',
    'Whether you are a prospective parent, a current learner, a proud alumna, or an education partner, I invite you to explore our programs, track our achievements, and connect with our vibrant school community through this portal. Together, let us continue shaping women of substance who will transform our nation and the world.',
  ],
  dean: [
    'Welcome to the Academic Office of Mumbi Girls Senior School. As Dean of Studies, it is a privilege to work alongside a dedicated team of educators and highly motivated learners who consistently push the boundaries of academic achievement.',
    'Our academic philosophy is anchored in rigorous preparation, individualized mentorship, and seamless adaptation to the Competency-Based Education Senior School curriculum. Whether a learner is pursuing STEM, Social Sciences, or Arts and Sports Science, our departments ensure she receives hands-on laboratory exposure, structured revision schedules, and close academic tracking from Grade 10 through to national examinations.',
    'Beyond classroom instruction, we foster a culture of intellectual curiosity, disciplined study habits, and peer collaboration. Through our digital learning portal, learners and parents can easily access holiday assignments, termly academic calendars, and revision materials to keep learning uninterrupted both in school and at home.',
    'We remain committed to guiding every girl toward realizing her highest academic potential and securing competitive placements in premier universities and tertiary institutions across Kenya and beyond.',
  ],
};

function localizeClub(
  locale: Locale,
  base: Club,
  map: Record<string, LocalizedClubFields>
): Club {
  if (locale !== 'sw') return base;
  const localized = map[base.id];
  if (!localized) return base;
  return {
    ...base,
    name: localized.name,
    description: localized.description,
    category: localized.category as Club['category'],
    meetingDay: localized.meetingDay,
    mediaNote: localized.mediaNote ?? base.mediaNote,
    videoSrc: base.videoSrc,
    imageSrc: base.imageSrc,
    gallerySrcs: base.gallerySrcs,
    patronMessage: localized.patronMessage ?? base.patronMessage,
  };
}

export function getSport(locale: Locale, id: string): Club {
  const base = sportsEn.find((sport) => sport.id === id);
  if (!base) {
    throw new Error(`Unknown sport id: ${id}`);
  }
  return localizeClub(locale, base, sportSw);
}

export function getSports(locale: Locale): Club[] {
  return sportsEn.map((sport) => getSport(locale, sport.id));
}

export function getHeadOfGames(locale: Locale): GamesDepartmentMessage {
  return locale === 'sw' ? headOfGamesSw : headOfGamesEn;
}

export function getClub(locale: Locale, id: string): Club {
  const base = clubsEn.find((club) => club.id === id);
  if (!base) {
    throw new Error(`Unknown club id: ${id}`);
  }
  return localizeClub(locale, base, clubSw);
}

export function getClubs(locale: Locale): Club[] {
  return clubsEn.map((club) => getClub(locale, club.id));
}

export function getFaithGroup(locale: Locale, id: string): Club {
  const base = faithGroupsEn.find((group) => group.id === id);
  if (!base) {
    throw new Error(`Unknown faith group id: ${id}`);
  }
  return localizeClub(locale, base, faithSw);
}

export function getFaithGroups(locale: Locale): Club[] {
  return faithGroupsEn.map((group) => getFaithGroup(locale, group.id));
}

export function getRoutineItem(
  locale: Locale,
  time: string
): DailyRoutineItem {
  const base = dailyRoutineEn.find((item) => item.time === time);
  if (!base) {
    throw new Error(`Unknown routine time: ${time}`);
  }
  if (locale !== 'sw') return base;
  return { time, activity: routineSw[time] ?? base.activity };
}

export function getDailyRoutine(locale: Locale): DailyRoutineItem[] {
  return dailyRoutineEn.map((item) => getRoutineItem(locale, item.time));
}

export function getBoardingSection(
  locale: Locale,
  id: string
): BoardingSection {
  const base = boardingSectionsEn.find((section) => section.id === id);
  if (!base) {
    throw new Error(`Unknown boarding section id: ${id}`);
  }
  if (locale !== 'sw') return base;
  const localized = boardingSw[id];
  if (!localized) return base;
  return { ...base, ...localized };
}

export function getBoardingSections(locale: Locale): BoardingSection[] {
  return boardingSectionsEn.map((section) =>
    getBoardingSection(locale, section.id)
  );
}

export function getWelcomeParagraphs(
  locale: Locale,
  who: 'principal' | 'dean'
): string[] {
  return locale === 'sw' ? welcomeSw[who] : welcomeEn[who];
}
