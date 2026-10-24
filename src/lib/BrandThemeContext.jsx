import React, { createContext, useContext, useState, useEffect } from 'react';

const BrandThemeContext = createContext(null);

export const BRAND_LOGO_OPTIONS = [
  {
    id: 'option2',
    title: 'Option 2: Sleek & Modernized 3D App Icon',
    subtitle: 'Optimized for Dark Theme & High-End Tech Branding',
    src: '/assets/grainwise_3d_badge_transparent.png',
    fullSrc: '/assets/grainwise_logo_option2_3d.jpg',
    tag: 'Recommended / Dark Theme',
    badgeColor: 'emerald',
    description: 'A luminous golden wheat stalk resting on rolling farm soil layers, frosted glass, subtle glowing emerald circuit tracks, futuristic scanning eye glyph, and precision target reticle.',
    colors: [
      { name: 'Harvest Gold', hex: '#FBBF24' },
      { name: 'Emerald Circuit', hex: '#10B981' },
      { name: 'Deep Furrow', hex: '#064E3B' },
      { name: 'Soil Core', hex: '#021109' }
    ]
  },
  {
    id: 'option1',
    title: 'Option 1: Vector Flat Design',
    subtitle: 'Balanced Circular Vector Composition',
    src: '/assets/grainwise_logo_option1_flat.png',
    fullSrc: '/assets/grainwise_logo_option1_flat.png',
    tag: 'Classic Vector Flat',
    badgeColor: 'amber',
    description: 'Stylized golden-yellow wheat stalk flanked by terracotta orange and deep earth brown leaves, minimal green circuitry, computer vision eye, and targeting crosshair reticle on curved green furrows.',
    colors: [
      { name: 'Wheat Gold', hex: '#F59E0B' },
      { name: 'Warm Terracotta', hex: '#E0633B' },
      { name: 'Deep Earth Brown', hex: '#5C3D2E' },
      { name: 'Forest Green', hex: '#2D5A27' }
    ]
  },
  {
    id: 'option3',
    title: 'Option 3: Ultra-Minimalist / Modern Monoline',
    subtitle: 'Swiss Design Precision & Clean Lines',
    src: '/assets/grainwise_logo_option3_monoline_transparent.png',
    fullSrc: '/assets/grainwise_logo_option3_monoline.jpg',
    tag: 'Monoline Geometric',
    badgeColor: 'orange',
    description: 'Geometric ear of grain surrounded by simplified leaf shapes and grounding green farm ridge lines, woven with subtle technical circuit nodes and vision sensor symbols.',
    colors: [
      { name: 'Harvest Gold', hex: '#EAB308' },
      { name: 'Terracotta Leaf', hex: '#C25E3E' },
      { name: 'Forest Green Ring', hex: '#1B4D3E' },
      { name: 'Pure Contrast', hex: '#FFFFFF' }
    ]
  }
];

export function BrandThemeProvider({ children }) {
  const [activeLogo, setActiveLogo] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('grainwise_active_logo');
      if (saved && BRAND_LOGO_OPTIONS.some(o => o.id === saved)) {
        return saved;
      }
    }
    return 'option2'; // Default: Modern 3D icon that matches dark website theme
  });

  const [brandModalOpen, setBrandModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('grainwise_active_logo', activeLogo);
    }
  }, [activeLogo]);

  const currentOption = BRAND_LOGO_OPTIONS.find(o => o.id === activeLogo) || BRAND_LOGO_OPTIONS[0];

  return (
    <BrandThemeContext.Provider
      value={{
        activeLogo,
        setActiveLogo,
        currentOption,
        brandModalOpen,
        setBrandModalOpen,
        options: BRAND_LOGO_OPTIONS
      }}
    >
      {children}
    </BrandThemeContext.Provider>
  );
}

export function useBrandTheme() {
  const context = useContext(BrandThemeContext);
  if (!context) {
    throw new Error('useBrandTheme must be used within a BrandThemeProvider');
  }
  return context;
}
