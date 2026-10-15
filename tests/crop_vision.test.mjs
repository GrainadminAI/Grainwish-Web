import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeImageBuffer,
  isSkinPixel,
  isVegetationPixel,
  CROP_FIX_RECOMMENDATIONS,
  CROP_TREATMENT_GUIDE,
  drawDetectionBox
} from '../src/lib/cropVisionIntelligence.js';

test('Crop Vision Intelligence: Unit Tests for Crop vs Non-Crop Detection', async (t) => {

  await t.test('Skin pixel detection correctly identifies human skin tones', () => {
    // Typical Indian/South Asian & general human skin tones
    assert.strictEqual(isSkinPixel(180, 130, 100), true, 'Fair/medium skin tone');
    assert.strictEqual(isSkinPixel(140, 95, 70), true, 'Warm/wheatish skin tone');
    assert.strictEqual(isSkinPixel(110, 75, 55), true, 'Deeper skin tone');

    // Plant leaves must NOT be classified as skin
    assert.strictEqual(isSkinPixel(40, 160, 45), false, 'Green leaf is not skin');
    assert.strictEqual(isSkinPixel(160, 180, 50), false, 'Yellow-green leaf is not skin');
    assert.strictEqual(isSkinPixel(100, 100, 100), false, 'Gray wall is not skin');
  });

  await t.test('Vegetation pixel detection correctly identifies chlorophyll reflectance', () => {
    assert.strictEqual(isVegetationPixel(45, 170, 50), true, 'Vibrant green chlorophyll');
    assert.strictEqual(isVegetationPixel(80, 140, 60), true, 'Agricultural foliage green');
    assert.strictEqual(isVegetationPixel(180, 130, 100), false, 'Skin tone is not vegetation');
    assert.strictEqual(isVegetationPixel(50, 50, 200), false, 'Blue object is not vegetation');
  });

  await t.test('Human Face / Selfie rejection: Camera view of a person is rejected with isCropLeaf = false', () => {
    const width = 20;
    const height = 20;
    const totalPixels = width * height;
    const data = new Uint8ClampedArray(totalPixels * 4);

    // Fill buffer with human face skin tones (warm indoor lighting)
    for (let i = 0; i < totalPixels * 4; i += 4) {
      data[i] = 185;     // R
      data[i + 1] = 135; // G
      data[i + 2] = 105; // B
      data[i + 3] = 255;
    }

    const result = analyzeImageBuffer({ data, width, height });

    assert.strictEqual(result.isCropLeaf, false, 'Human face must NOT be verified as a crop leaf');
    assert.strictEqual(result.verificationStatus, 'non_crop');
    assert.strictEqual(result.detectedSubject, 'human_face');
    assert.match(result.rejectionReason, /human face/i, 'Must explain human face/skin was detected');
    assert.strictEqual(result.boundingBoxes.length, 0, 'No disease bounding boxes should be drawn on a human face');
  });

  await t.test('Neutral indoor room / wall rejection: Non-plant surfaces are rejected', () => {
    const width = 20;
    const height = 20;
    const totalPixels = width * height;
    const data = new Uint8ClampedArray(totalPixels * 4);

    // Fill buffer with neutral gray/white wall pixels
    for (let i = 0; i < totalPixels * 4; i += 4) {
      data[i] = 160;
      data[i + 1] = 160;
      data[i + 2] = 160;
      data[i + 3] = 255;
    }

    const result = analyzeImageBuffer({ data, width, height });

    assert.strictEqual(result.isCropLeaf, false, 'Neutral wall must NOT be verified as crop leaf');
    assert.strictEqual(result.verificationStatus, 'non_crop');
    assert.strictEqual(result.detectedSubject, 'indoor_environment');
    assert.strictEqual(result.boundingBoxes.length, 0);
  });

  await t.test('Digital screen / blue object rejection: Blue-heavy spectra rejected', () => {
    const width = 20;
    const height = 20;
    const totalPixels = width * height;
    const data = new Uint8ClampedArray(totalPixels * 4);

    // Fill buffer with blue screen / digital display
    for (let i = 0; i < totalPixels * 4; i += 4) {
      data[i] = 40;
      data[i + 1] = 80;
      data[i + 2] = 210; // Dominant blue
      data[i + 3] = 255;
    }

    const result = analyzeImageBuffer({ data, width, height });

    assert.strictEqual(result.isCropLeaf, false, 'Digital screen must NOT be verified as crop leaf');
    assert.strictEqual(result.detectedSubject, 'screen_or_artificial');
  });

  await t.test('Underexposed / Pitch dark camera view rejection', () => {
    const width = 20;
    const height = 20;
    const totalPixels = width * height;
    const data = new Uint8ClampedArray(totalPixels * 4);

    // Fill with almost black pixels
    for (let i = 0; i < totalPixels * 4; i += 4) {
      data[i] = 10;
      data[i + 1] = 12;
      data[i + 2] = 10;
      data[i + 3] = 255;
    }

    const result = analyzeImageBuffer({ data, width, height });

    assert.strictEqual(result.isCropLeaf, false);
    assert.strictEqual(result.detectedSubject, 'low_light');
  });

  await t.test('Healthy Crop Leaf: Real vegetative leaf is verified with 100% precision metrics', () => {
    const width = 20;
    const height = 20;
    const totalPixels = width * height;
    const data = new Uint8ClampedArray(totalPixels * 4);

    // Fill buffer with rich healthy green chlorophyll pixels
    for (let i = 0; i < totalPixels * 4; i += 4) {
      data[i] = 45;      // R
      data[i + 1] = 175;  // G (Strong chlorophyll)
      data[i + 2] = 50;   // B
      data[i + 3] = 255;
    }

    const result = analyzeImageBuffer({ data, width, height });

    assert.strictEqual(result.isCropLeaf, true, 'Healthy green leaf must be verified as crop leaf');
    assert.strictEqual(result.verificationStatus, 'verified_crop');
    assert.strictEqual(result.detectedSubject, 'crop_leaf');
    assert.match(result.detectedDisease, /Healthy Vigorous/i);
    assert.strictEqual(result.lesionCoverage, '4%'); // Minimal baseline
    assert.ok(result.boundingBoxes.length > 0, 'Should have verified canopy box');
  });

  await t.test('Diseased Crop Leaf: Leaf with yellow rust pustules is verified and properly diagnosed', () => {
    const width = 20;
    const height = 20;
    const totalPixels = width * height;
    const data = new Uint8ClampedArray(totalPixels * 4);

    // 60% green leaf blade, 40% yellow-orange rust pustules
    for (let i = 0; i < totalPixels * 4; i += 4) {
      const pixelIdx = i / 4;
      if (pixelIdx < totalPixels * 0.4) {
        // Rust pustules (Yellowish-orange)
        data[i] = 210;     // R
        data[i + 1] = 145; // G
        data[i + 2] = 30;  // B
        data[i + 3] = 255;
      } else {
        // Green leaf blade
        data[i] = 50;
        data[i + 1] = 160;
        data[i + 2] = 55;
        data[i + 3] = 255;
      }
    }

    const result = analyzeImageBuffer({ data, width, height }, { cropHint: 'Wheat' });

    assert.strictEqual(result.isCropLeaf, true, 'Diseased leaf must still be verified as crop leaf');
    assert.strictEqual(result.verificationStatus, 'verified_crop');
    assert.ok(result.boundingBoxes.length > 0, 'Lesion bounding boxes must be generated on leaf');
    assert.match(result.boundingBoxes[0].label, /RUST DISEASE|Stripe Rust/i);
  });

  await t.test('Diseased Crop Leaf: Leaf with necrotic brown spots is verified and diagnosed', () => {
    const width = 20;
    const height = 20;
    const totalPixels = width * height;
    const data = new Uint8ClampedArray(totalPixels * 4);

    // 60% green leaf, 40% dark necrotic brown spots
    for (let i = 0; i < totalPixels * 4; i += 4) {
      const pixelIdx = i / 4;
      if (pixelIdx < totalPixels * 0.4) {
        // Dark necrotic brown spot
        data[i] = 85;
        data[i + 1] = 80;
        data[i + 2] = 70;
        data[i + 3] = 255;
      } else {
        // Green leaf
        data[i] = 45;
        data[i + 1] = 165;
        data[i + 2] = 48;
        data[i + 3] = 255;
      }
    }

    const result = analyzeImageBuffer({ data, width, height });

    assert.strictEqual(result.isCropLeaf, true);
    assert.strictEqual(result.isCropLeaf, true);
    assert.match(result.detectedDisease, /Brown Spot/i);
    assert.ok(result.rightWayToFix, 'Should provide rightWayToFix for brown spot / blight');
    assert.ok(result.rightWayToFix.chemicalFix, 'Should provide chemical fix');
    assert.ok(result.rightWayToFix.organicFix, 'Should provide organic fix');
    assert.ok(result.rightWayToFix.culturalFix.length >= 3, 'Should provide at least 3 cultural prevention tips');
  });

  await t.test('The Right Way to Fix: All 4 detector categories + healthy leaf have complete prescriptions', () => {
    const categories = ['RUST DISEASE', 'LEAF BLIGHT SPOT', 'INSECT DAMAGE', 'LEAF DISEASE', 'HEALTHY LEAF'];

    for (const cat of categories) {
      const fix = CROP_FIX_RECOMMENDATIONS[cat];
      assert.ok(fix, `Fix recommendation must exist for category ${cat}`);
      assert.ok(fix.chemicalFix.sprayName, `Chemical spray name required for ${cat}`);
      assert.ok(fix.chemicalFix.dosageFormula(1).includes('200 L Water') || fix.chemicalFix.dosageFormula(1).includes('Water'), `Chemical formula must include water for ${cat}`);
      assert.ok(fix.organicFix.sprayName, `Organic spray name required for ${cat}`);
      assert.ok(fix.culturalFix.length >= 3, `Cultural prevention practices required for ${cat}`);
      assert.ok(fix.recoveryTimeline.day1, `Recovery day 1 required for ${cat}`);
      assert.ok(fix.recoveryTimeline.day7, `Recovery day 7 required for ${cat}`);
      assert.ok(fix.recoveryTimeline.day14, `Recovery day 14 required for ${cat}`);
    }
  });

  await t.test('Dynamic Acreage Dosage Calculator accurately scales with land acreage', () => {
    const rustFix = CROP_FIX_RECOMMENDATIONS['RUST DISEASE'];
    
    // 1 Acre
    const dose1 = rustFix.chemicalFix.dosageFormula(1);
    assert.match(dose1, /200 ml Propiconazole/);
    assert.match(dose1, /200 L Water/);

    // 2.5 Acres
    const dose2_5 = rustFix.chemicalFix.dosageFormula(2.5);
    assert.match(dose2_5, /500 ml Propiconazole/);
    assert.match(dose2_5, /500 L Water/);

    // 5 Acres
    const dose5 = rustFix.chemicalFix.dosageFormula(5);
    assert.match(dose5, /1000 ml Propiconazole/);
    assert.match(dose5, /1000 L Water/);
  });

  await t.test('drawDetectionBox canvas renderer executes without exceptions', () => {
    // Mock 2D canvas context
    const mockCtx = {
      save: () => {},
      restore: () => {},
      strokeRect: () => {},
      fillRect: () => {},
      fillText: () => {},
      measureText: (text) => ({ width: text.length * 8 }),
      strokeStyle: '',
      lineWidth: 0,
      shadowColor: '',
      shadowBlur: 0,
      fillStyle: '',
      font: ''
    };

    const box = {
      x: 20,
      y: 20,
      width: 40,
      height: 40,
      label: 'RUST DISEASE',
      score: 0.98,
      color: '#f59e0b'
    };

    // Should run smoothly without errors
    assert.doesNotThrow(() => {
      drawDetectionBox(mockCtx, box, 640, 480);
    });
  });

  await t.test('CROP_TREATMENT_GUIDE: Validates dual-track agronomic remedies for all 4 core diseases', () => {
    const requiredKeys = ['rust disease', 'leaf blight spot', 'insect damage', 'leaf disease', 'healthy leaf'];
    
    for (const key of requiredKeys) {
      const guide = CROP_TREATMENT_GUIDE[key];
      assert.ok(guide, `Treatment guide must contain entry for "${key}"`);
      assert.ok(guide.type, `Guide "${key}" must define type`);
      assert.ok(guide.badge, `Guide "${key}" must define badge`);
      assert.ok(guide.chemical, `Guide "${key}" must define chemical control`);
      assert.ok(guide.chemDose, `Guide "${key}" must define chemical dilution dose per litre`);
      assert.ok(guide.bio, `Guide "${key}" must define organic/bio alternative`);
      assert.ok(guide.bioDose, `Guide "${key}" must define bio dilution dose per litre`);
      assert.ok(guide.tip, `Guide "${key}" must define safety/spray pro-tip`);
    }

    // Specific dosages per litre matching Indian agronomic standards
    assert.match(CROP_TREATMENT_GUIDE['rust disease'].chemDose, /1 ml per litre of water/i);
    assert.match(CROP_TREATMENT_GUIDE['rust disease'].bioDose, /3 to 5 ml per litre of water/i);
    assert.match(CROP_TREATMENT_GUIDE['leaf blight spot'].chemDose, /2 to 2\.5 g per litre of water/i);
    assert.match(CROP_TREATMENT_GUIDE['insect damage'].chemDose, /0\.4 ml per litre or 0\.5 g per litre/i);
    assert.match(CROP_TREATMENT_GUIDE['leaf disease'].chemDose, /2 g per litre of water/i);
  });

});

