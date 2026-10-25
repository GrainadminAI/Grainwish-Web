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

  test('HeroSection incorporates HolographicIndiaMap with crisp typography and live diagnostics card', () => {
    const heroFile = path.join(rootDir, 'src/components/HeroSection.jsx');
    const content = fs.readFileSync(heroFile, 'utf8');

    assert.ok(content.includes('HolographicIndiaMap'), 'HeroSection must include HolographicIndiaMap');
    assert.ok(content.includes('soybean_leaf_mosaic.jpg'), 'HeroSection must showcase soybean_leaf_mosaic.jpg in live diagnostics card');
  });

  test('App renders WebsiteBackground with animated farm video, generated poster, and AI technology effects', () => {
    const appFile = path.join(rootDir, 'src/App.jsx');
    const appContent = fs.readFileSync(appFile, 'utf8');
    assert.ok(appContent.includes('<WebsiteBackground'), 'App must render WebsiteBackground');

    const bgFile = path.join(rootDir, 'src/components/WebsiteBackground.jsx');
    assert.ok(fs.existsSync(bgFile), 'WebsiteBackground.jsx must exist');
    const bgContent = fs.readFileSync(bgFile, 'utf8');

    // Video, generated image, and AI effects
    assert.ok(bgContent.includes('Sustainable_farm_sunset.mp4'), 'WebsiteBackground must use farm video source');
    assert.ok(bgContent.includes('grainwish-background.png'), 'WebsiteBackground must use grainwish-background.png');
    assert.ok(!bgContent.includes('grainwish-farm.mp4'), 'WebsiteBackground must not include grainwish-farm.mp4');
    assert.ok(bgContent.includes('farm-overlay'), 'WebsiteBackground must have dark left overlay');
    assert.ok(bgContent.includes('AI DRONE'), 'WebsiteBackground must include AI scanning drone');
    assert.ok(bgContent.includes('animate-scan-ring'), 'WebsiteBackground must include crop-scanning rings');
    assert.ok(bgContent.includes('animate-grid-pulse'), 'WebsiteBackground must include connected field grid animation');
    assert.ok(bgContent.includes('animate-sensor-pulse'), 'WebsiteBackground must include subtle glowing sensor points');

    // Verify assets on disk
    assert.ok(fs.existsSync(path.join(rootDir, 'public/assets/Sustainable_farm_sunset.mp4')), 'Farm video must exist');
    assert.ok(fs.existsSync(path.join(rootDir, 'public/assets/grainwish-background.png')), 'grainwish-background.png must exist');
  });

  test('FarmBackground component and CSS files exist with decorative scan interface and particles', () => {
    const farmCompFile = path.join(rootDir, 'src/FarmBackground.jsx');
    assert.ok(fs.existsSync(farmCompFile), 'src/FarmBackground.jsx must exist');
    const compContent = fs.readFileSync(farmCompFile, 'utf8');

    assert.ok(compContent.includes('farm-hero'), 'Must include farm-hero');
    assert.ok(compContent.includes('farm-particles'), 'Must include farm-particles');
    assert.ok(compContent.includes('farm-tech-card'), 'Must include farm-tech-card');
    assert.ok(compContent.includes('LIVE AI DIAGNOSTICS'), 'Must include LIVE AI DIAGNOSTICS');
    assert.ok(compContent.includes('scan-window'), 'Must include scan-window');

    const farmCssFile = path.join(rootDir, 'src/FarmBackground.css');
    assert.ok(fs.existsSync(farmCssFile), 'src/FarmBackground.css must exist');
    const cssContent = fs.readFileSync(farmCssFile, 'utf8');

    assert.ok(cssContent.includes('.farm-hero'), 'CSS must define .farm-hero');
    assert.ok(cssContent.includes('.farm-tech-card'), 'CSS must define .farm-tech-card');
    assert.ok(cssContent.includes('grid-drift'), 'CSS must include grid-drift keyframe');
    assert.ok(cssContent.includes('particle-float'), 'CSS must include particle-float keyframe');
  });
});
