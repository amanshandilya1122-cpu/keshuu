export interface FlowerTheme {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  petalColors: string[];
  heartColors: string[];
  sparkleColor: string;
  bgGradient: string;
  accentColor: string;
  textColor: string;
  badgeBg: string;
  toastMsg: string;
}

export const FLOWER_THEMES: FlowerTheme[] = [
  {
    id: 'sakura',
    name: 'Sakura Cherry Blossom',
    subtitle: 'Soft pink & blush cherry petals',
    emoji: '🌸',
    petalColors: [
      'rgba(251, 113, 133, 0.7)',
      'rgba(244, 63, 94, 0.6)',
      'rgba(253, 164, 175, 0.75)',
      'rgba(254, 205, 211, 0.85)',
      'rgba(244, 114, 182, 0.65)',
    ],
    heartColors: [
      'rgba(225, 29, 72, 0.65)',
      'rgba(244, 63, 94, 0.7)',
      'rgba(251, 113, 133, 0.75)',
    ],
    sparkleColor: 'rgba(254, 240, 138, 0.9)',
    bgGradient: 'from-[#FFF5F7] via-[#FFF9FA] to-[#FFF0F3]',
    accentColor: '#e11d48',
    textColor: 'text-rose-600',
    badgeBg: 'bg-rose-100 text-rose-700 border-rose-200',
    toastMsg: 'Showering Monal with Sakura Blossoms 🌸💕',
  },
  {
    id: 'rose',
    name: 'Royal Crimson Rose',
    subtitle: 'Deep red & velvet ruby petals',
    emoji: '🌹',
    petalColors: [
      'rgba(220, 38, 38, 0.75)',
      'rgba(185, 28, 28, 0.7)',
      'rgba(239, 68, 68, 0.65)',
      'rgba(153, 27, 27, 0.65)',
      'rgba(252, 165, 165, 0.8)',
    ],
    heartColors: [
      'rgba(185, 28, 28, 0.75)',
      'rgba(220, 38, 38, 0.8)',
      'rgba(239, 68, 68, 0.7)',
    ],
    sparkleColor: 'rgba(254, 215, 170, 0.9)',
    bgGradient: 'from-[#FFF1F2] via-[#FFF5F5] to-[#FFE4E6]',
    accentColor: '#dc2626',
    textColor: 'text-red-600',
    badgeBg: 'bg-red-100 text-red-800 border-red-200',
    toastMsg: 'Showering Monal with Royal Crimson Roses 🌹❤️',
  },
  {
    id: 'lavender',
    name: 'Lavender & Lilac Dream',
    subtitle: 'Enchanting purple & violet petals',
    emoji: '🪻',
    petalColors: [
      'rgba(168, 85, 247, 0.7)',
      'rgba(192, 132, 252, 0.75)',
      'rgba(216, 180, 254, 0.8)',
      'rgba(147, 51, 234, 0.65)',
      'rgba(129, 140, 248, 0.65)',
    ],
    heartColors: [
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.8)',
      'rgba(192, 132, 252, 0.75)',
    ],
    sparkleColor: 'rgba(253, 224, 71, 0.9)',
    bgGradient: 'from-[#FAF5FF] via-[#FDF4FF] to-[#F5F3FF]',
    accentColor: '#9333ea',
    textColor: 'text-purple-600',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    toastMsg: 'Showering Monal with Lavender & Lilacs 🪻💜',
  },
  {
    id: 'sunflower',
    name: 'Golden Sunflower & Marigold',
    subtitle: 'Warm golden & sunshine yellow petals',
    emoji: '🌻',
    petalColors: [
      'rgba(234, 179, 8, 0.75)',
      'rgba(245, 158, 11, 0.7)',
      'rgba(250, 204, 21, 0.8)',
      'rgba(253, 224, 71, 0.85)',
      'rgba(249, 115, 22, 0.65)',
    ],
    heartColors: [
      'rgba(245, 158, 11, 0.75)',
      'rgba(234, 179, 8, 0.8)',
      'rgba(251, 146, 60, 0.75)',
    ],
    sparkleColor: 'rgba(255, 255, 255, 0.95)',
    bgGradient: 'from-[#FEFCE8] via-[#FFFBEB] to-[#FEF3C7]',
    accentColor: '#d97706',
    textColor: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    toastMsg: 'Showering Monal with Bright Sunflowers 🌻✨',
  },
  {
    id: 'lotus',
    name: 'Lotus & Peach Blossom',
    subtitle: 'Sweet coral, peach & lotus petals',
    emoji: '🪷',
    petalColors: [
      'rgba(251, 146, 60, 0.7)',
      'rgba(244, 114, 182, 0.7)',
      'rgba(253, 186, 116, 0.8)',
      'rgba(251, 113, 133, 0.75)',
      'rgba(254, 215, 170, 0.85)',
    ],
    heartColors: [
      'rgba(244, 63, 94, 0.7)',
      'rgba(249, 115, 22, 0.7)',
      'rgba(244, 114, 182, 0.75)',
    ],
    sparkleColor: 'rgba(254, 240, 138, 0.95)',
    bgGradient: 'from-[#FFF7ED] via-[#FFF1F2] to-[#FFF7ED]',
    accentColor: '#ea580c',
    textColor: 'text-orange-600',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
    toastMsg: 'Showering Monal with Lotus & Peach Blossoms 🪷🧡',
  },
  {
    id: 'tulip',
    name: 'Wildflower & Tulip Meadow',
    subtitle: 'Multi-color spring rainbow petals',
    emoji: '🌷',
    petalColors: [
      'rgba(244, 63, 94, 0.7)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(234, 179, 8, 0.75)',
      'rgba(236, 72, 153, 0.7)',
      'rgba(52, 211, 153, 0.65)',
      'rgba(251, 146, 60, 0.7)',
    ],
    heartColors: [
      'rgba(244, 63, 94, 0.75)',
      'rgba(168, 85, 247, 0.75)',
      'rgba(234, 179, 8, 0.8)',
    ],
    sparkleColor: 'rgba(255, 255, 255, 0.95)',
    bgGradient: 'from-[#FFF5F7] via-[#FAF5FF] to-[#FEFCE8]',
    accentColor: '#e11d48',
    textColor: 'text-rose-600',
    badgeBg: 'bg-pink-100 text-pink-800 border-pink-200',
    toastMsg: 'Showering Monal with Rainbow Wildflowers 🌷🌼',
  },
  {
    id: 'hibiscus',
    name: 'Tropical Hibiscus & Orchid',
    subtitle: 'Vibrant fuchsia & passion petals',
    emoji: '🌺',
    petalColors: [
      'rgba(217, 70, 239, 0.75)', // fuchsia-500
      'rgba(236, 72, 153, 0.7)',  // pink-500
      'rgba(244, 63, 94, 0.7)',   // rose-500
      'rgba(192, 38, 211, 0.75)', // fuchsia-600
      'rgba(250, 232, 255, 0.85)',// fuchsia-100
    ],
    heartColors: [
      'rgba(192, 38, 211, 0.8)',
      'rgba(217, 70, 239, 0.8)',
      'rgba(236, 72, 153, 0.75)',
    ],
    sparkleColor: 'rgba(254, 240, 138, 0.95)',
    bgGradient: 'from-[#FDF4FF] via-[#FFF1F2] to-[#FAE8FF]',
    accentColor: '#c026d3',
    textColor: 'text-fuchsia-600',
    badgeBg: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    toastMsg: 'Showering Monal with Tropical Hibiscus & Orchids 🌺✨',
  },
];

/**
 * Returns the next flower theme on every page refresh!
 */
export function getNextRefreshFlowerTheme(): { theme: FlowerTheme; index: number } {
  try {
    const savedIndex = localStorage.getItem('anniversary_flower_theme_idx');
    let nextIdx = 0;
    if (savedIndex !== null) {
      nextIdx = (parseInt(savedIndex, 10) + 1) % FLOWER_THEMES.length;
    } else {
      nextIdx = Math.floor(Math.random() * FLOWER_THEMES.length);
    }
    localStorage.setItem('anniversary_flower_theme_idx', nextIdx.toString());
    return { theme: FLOWER_THEMES[nextIdx], index: nextIdx };
  } catch {
    return { theme: FLOWER_THEMES[0], index: 0 };
  }
}
