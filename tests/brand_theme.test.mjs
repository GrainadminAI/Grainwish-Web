import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('Brand Theme & Logo Suite Verification', () => {
  const rootDir = process.cwd();

  test('All 3 Brand Logo Options exist on disk in public/assets', () => {
    const requiredAssets = [
      'public/assets/grainwise_logo_option1_flat.png',
      'public/assets/grainwise_3d_badge_transparent.png',
      'public/assets/grainwise_logo_option2_3d.jpg',
      'public/assets/grainwise_logo_option3_monoline.jpg',
      'public/assets/grainwise_logo_option3_monoline_transparent.png',
      'public/assets/grainwise_icon_transparent.png',
      'public/favicon.ico',
      'public/favicon.png',
      'public/apple-touch-icon.png'
    ];

    for (const relPath of requiredAssets) {
      const fullPath = path.join(rootDir, relPath);
      assert.ok(fs.existsSync(fullPath), `Asset file ${relPath} must exist on disk`);
      const stat = fs.statSync(fullPath);
      assert.ok(stat.size > 0, `Asset file ${relPath} must not be empty`);
    }
  });

  test('BrandThemeContext exports BRAND_LOGO_OPTIONS with 3 complete options', async () => {
    const brandThemeFile = path.join(rootDir, 'src/lib/BrandThemeContext.jsx');
    assert.ok(fs.existsSync(brandThemeFile), 'BrandThemeContext.jsx must exist');
    const content = fs.readFileSync(brandThemeFile, 'utf8');

    assert.ok(content.includes('option1'), 'Must include option1');
    assert.ok(content.includes('option2'), 'Must include option2');
    assert.ok(content.includes('option3'), 'Must include option3');
    assert.ok(content.includes('Harvest Gold'), 'Must define harvest gold');
    assert.ok(content.includes('Terracotta'), 'Must define terracotta');
  });

  test('Tailwind configuration includes full Agri-Tech palette extensions', () => {
    const tailwindFile = path.join(rootDir, 'tailwind.config.js');
    const content = fs.readFileSync(tailwindFile, 'utf8');

    assert.ok(content.includes('terracotta'), 'Tailwind must have terracotta');
    assert.ok(content.includes('earth'), 'Tailwind must have earth');
    assert.ok(content.includes('goldGlow'), 'Tailwind must have goldGlow');
    assert.ok(content.includes('borderGlow'), 'Tailwind must have borderGlow');
    assert.ok(content.includes('3d-badge'), 'Tailwind must define 3d-badge shadow');
  });

  test('CSS design tokens include 3D glassmorphism and multi-hue glow border', () => {
    const cssFile = path.join(rootDir, 'src/index.css');
    const content = fs.readFileSync(cssFile, 'utf8');

    assert.ok(content.includes('.glass-card-3d'), 'CSS must include .glass-card-3d');
    assert.ok(content.includes('.glass-card-terracotta'), 'CSS must include .glass-card-terracotta');
    assert.ok(content.includes('.gradient-text-agri'), 'CSS must include .gradient-text-agri');
    assert.ok(content.includes('.gradient-text-harvest'), 'CSS must include .gradient-text-harvest');
  });

  test('HolographicIndiaMap component exists and defines 12 agricultural state hubs and telemetry links', () => {
    const mapFile = path.join(rootDir, 'src/components/HolographicIndiaMap.jsx');
    assert.ok(fs.existsSync(mapFile), 'HolographicIndiaMap.jsx must exist');
    const content = fs.readFileSync(mapFile, 'utf8');

    assert.ok(content.includes('INDIA_BORDER_PATH'), 'Must define geographic INDIA_BORDER_PATH');
    assert.ok(content.includes('AGRI_HUBS'), 'Must define agricultural hubs');
    assert.ok(content.includes('TELEMETRY_LINKS'), 'Must define telemetry links');
    assert.ok(content.includes('Punjab'), 'Must include Punjab hub');
    assert.ok(content.includes('Maharashtra'), 'Must include Maharashtra hub');
  });

  test('HeroSection incorporates Image 2 static background and HolographicIndiaMap without background video animations', () => {
    const heroFile = path.join(rootDir, 'src/components/HeroSection.jsx');
    const content = fs.readFileSync(heroFile, 'utf8');

    assert.ok(content.includes('hero_agri_3d_bg.jpg'), 'HeroSection must have Image 2 background');
    assert.ok(!content.includes('<video'), 'HeroSection must not have background video animations');
    assert.ok(content.includes('HolographicIndiaMap'), 'HeroSection must include HolographicIndiaMap');
    assert.ok(content.includes('soybean_leaf_mosaic.jpg'), 'HeroSection must showcase soybean_leaf_mosaic.jpg in live diagnostics card');
  });
});
