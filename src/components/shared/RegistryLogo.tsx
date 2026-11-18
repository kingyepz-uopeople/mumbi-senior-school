import Image from 'next/image';

interface RegistryLogoProps {
  /** Official registration/examination body */
  agency: 'knec' | 'moe';
  /** `bar` = compact 22–26px utility bar mark; `card` = 36–40px particulars/footer mark */
  size?: 'bar' | 'card';
  /** Surface tone so the black MoE lockup sits on a crisp white chip on dark surfaces */
  surface?: 'dark' | 'light';
}

const LOGO_META = {
  knec: {
    src: '/logos/knec.png',
    alt: 'Kenya National Examinations Council emblem',
    width: 453,
    height: 512,
  },
  moe: {
    src: '/logos/moe.png',
    alt: 'Ministry of Education, Republic of Kenya logo',
    width: 510,
    height: 103,
  },
} as const;

/**
 * Small, unstretched registration marks displayed alongside the school's
 * KNEC Centre Code (10204102) and Ministry of Education registration (F2030609),
 * kept visually quieter than the Mumbi Girls school crest.
 */
export default function RegistryLogo({
  agency,
  size = 'card',
  surface = 'light',
}: RegistryLogoProps) {
  const meta = LOGO_META[agency];

  if (agency === 'knec') {
    const darkRing =
      surface === 'dark'
        ? ' drop-shadow-[0_0_1px_rgba(255,255,255,0.45)]'
        : '';

    if (size === 'bar') {
      return (
        <Image
          src={meta.src}
          alt={meta.alt}
          width={meta.width}
          height={meta.height}
          sizes="24px"
          className={`h-[22px] w-auto aspect-[453/512] object-contain shrink-0${darkRing}`}
        />
      );
    }

    return (
      <Image
        src={meta.src}
        alt={meta.alt}
        width={meta.width}
        height={meta.height}
        sizes="40px"
        className={`h-10 w-auto aspect-[453/512] object-contain shrink-0${darkRing}`}
      />
    );
  }

  // Ministry of Education lockup (coat of arms + national colours + black wordmark)
  if (size === 'bar') {
    return (
      <span className="inline-flex items-center rounded-xs bg-white/95 px-1.5 py-[3px] shrink-0">
        <Image
          src={meta.src}
          alt={meta.alt}
          width={meta.width}
          height={meta.height}
          sizes="104px"
          className="h-[18px] sm:h-[20px] w-auto aspect-[510/103] object-contain"
        />
      </span>
    );
  }

  if (surface === 'dark') {
    return (
      <span className="inline-flex items-center rounded-xs bg-white/95 px-2 py-1 shrink-0">
        <Image
          src={meta.src}
          alt={meta.alt}
          width={meta.width}
          height={meta.height}
          sizes="164px"
          className="h-7 sm:h-8 w-auto aspect-[510/103] object-contain"
        />
      </span>
    );
  }

  return (
    <Image
      src={meta.src}
      alt={meta.alt}
      width={meta.width}
      height={meta.height}
      sizes="182px"
      className="h-8 sm:h-9 w-auto aspect-[510/103] object-contain shrink-0"
    />
  );
}
