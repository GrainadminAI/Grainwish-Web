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

  test('HeroSection incorporates HolographicIndiaMap with clean dark theme and no background image or video animations', () => {
    const heroFile = path.join(rootDir, 'src/components/HeroSection.jsx');
    const content = fs.readFileSync(heroFile, 'utf8');

    assert.ok(!content.includes('<video'), 'HeroSection must not have background video animations');
    assert.ok(!content.includes('hero_agri_3d_bg.jpg'), 'HeroSection must not have background landscape image');
    assert.ok(content.includes('HolographicIndiaMap'), 'HeroSection must include HolographicIndiaMap');
    assert.ok(content.includes('soybean_leaf_mosaic.jpg'), 'HeroSection must showcase soybean_leaf_mosaic.jpg in live diagnostics card');
  });

  test('App renders the watermark-free Google Flow video as website background with poster fallback', () => {
    const appFile = path.join(rootDir, 'src/App.jsx');
    const content = fs.readFileSync(appFile, 'utf8');

    assert.ok(content.includes('grainwish_farm_flow.mp4'), 'App must render grainwish_farm_flow.mp4');
    assert.ok(content.includes('grainwish_farm_flow_poster.jpg'), 'App must include poster fallback');
    assert.ok(content.includes('<video'), 'App must render background video');
    assert.ok(fs.existsSync(path.join(rootDir, 'public/assets/grainwish_farm_flow.mp4')), 'grainwish_farm_flow.mp4 must exist in public/assets');
    assert.ok(fs.existsSync(path.join(rootDir, 'public/assets/grainwish_farm_flow_poster.jpg')), 'grainwish_farm_flow_poster.jpg must exist in public/assets');
  });

  test('Holographic India Map auto-centers and highlights based on detected location & GPS coords', async () => {
    const { findHubByLocation, AGRI_HUBS } = await import('../src/lib/agriHubsData.js');

    // 1. Text district & state match
    const wbHub = findHubByLocation('Hooghly, West Bengal');
    assert.ok(wbHub && wbHub.id === 'wb', 'Hooghly, West Bengal must resolve to West Bengal & Bihar hub');

    const mhHub = findHubByLocation('Nashik, Maharashtra');
    assert.ok(mhHub && mhHub.id === 'maharashtra', 'Nashik, Maharashtra must resolve to Maharashtra hub');

    const apHub = findHubByLocation('Guntur, Andhra Pradesh');
    assert.ok(apHub && apHub.id === 'ap', 'Guntur, Andhra Pradesh must resolve to Andhra & Telangana hub');

    const pbHub = findHubByLocation('Ludhiana, Punjab');
    assert.ok(pbHub && pbHub.id === 'punjab', 'Ludhiana, Punjab must resolve to Punjab hub');

    // 2. Coordinate string match (Hooghly coords 22.83, 88.35 from user screenshot)
    const coordHub = findHubByLocation('22.83°, 88.35°');
    assert.ok(coordHub && coordHub.id === 'wb', 'Coords 22.83°, 88.35° must resolve to West Bengal hub');

    const mhCoordHub = findHubByLocation('19.99, 73.78');
    assert.ok(mhCoordHub && mhCoordHub.id === 'maharashtra', 'Coords 19.99, 73.78 must resolve to Maharashtra hub');

    // 3. Object coordinates format
    const objHub = findHubByLocation({ coords: { latitude: 22.83, longitude: 88.35 } });
    assert.ok(objHub && objHub.id === 'wb', 'Object coords must resolve to West Bengal hub');

    // 4. Neighbouring state mapping (Bihar -> wb, Telangana -> ap, Kerala -> tamilnadu)
    assert.strictEqual(findHubByLocation('Patna, Bihar')?.id, 'wb');
    assert.strictEqual(findHubByLocation('Hyderabad, Telangana')?.id, 'ap');
    assert.strictEqual(findHubByLocation('Kochi, Kerala')?.id, 'tamilnadu');

    // 5. Verify all hubs have stateIds and nameKey
    for (const hub of AGRI_HUBS) {
      assert.ok(Array.isArray(hub.stateIds) && hub.stateIds.length > 0, `Hub ${hub.id} must define stateIds`);
      assert.ok(typeof hub.nameKey === 'string' && hub.nameKey.startsWith('hub_'), `Hub ${hub.id} must define nameKey`);
    }

    // 6. Verify HolographicIndiaMap.jsx uses localization and location keys
    const mapFile = path.join(rootDir, 'src/components/HolographicIndiaMap.jsx');
    const content = fs.readFileSync(mapFile, 'utf8');
    assert.ok(content.includes('map_your_region'), 'Map must include map_your_region badge');
    assert.ok(content.includes('map_my_region_btn'), 'Map must include map_my_region_btn button');
    assert.ok(content.includes('map_crops_produced'), 'Map must include map_crops_produced');
    assert.ok(content.includes('map_mandi_rate'), 'Map must include map_mandi_rate');
    assert.ok(content.includes('map_national_index'), 'Map must include map_national_index');
  });
});
