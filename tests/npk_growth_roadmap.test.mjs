import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('NPK Growth Roadmap & Farmers Application Schedule', async (t) => {
  const npkPath = path.join(rootDir, 'src', 'components', 'NPKCalculator.jsx');
  assert.ok(fs.existsSync(npkPath), 'src/components/NPKCalculator.jsx must exist');
  const npkCode = fs.readFileSync(npkPath, 'utf8');

  await t.test('1. Guided Input Sequence: Step 1 (Growth Stage) -> Step 2 (Acreage) -> Step 3 (Soil Test) -> Step 4 (Combined Roadmap)', () => {
    // Step 1: Growth Stage & Crop
    assert.match(npkCode, /Select Growth Stage &amp; Crop|Select Growth Stage/);
    assert.match(npkCode, /GROWTH_STAGES/);
    assert.match(npkCode, /selectedStageIndex/);

    // Step 2: Field Acreage
    assert.match(npkCode, /Field Acreage &amp; Land Size|Field Acreage/);
    assert.match(npkCode, /ACREAGE_PRESETS/);
    assert.match(npkCode, /bighaEquivalent/);

    // Step 3: Soil Test & Health
    assert.match(npkCode, /Soil Test &amp; Soil Profile|Soil Test/);
    assert.match(npkCode, /soilNStatus/);
    assert.match(npkCode, /soilPStatus/);
    assert.match(npkCode, /soilKStatus/);
    assert.match(npkCode, /soilPH/);

    // Step 4: Combined Synthesis
    assert.match(npkCode, /Combined Agronomic Synthesis/);
  });

  await t.test('2. Roadmap to Fix the Growth is rendered with biological goals and corrective dosing', () => {
    assert.match(npkCode, /Roadmap to Fix &amp; Optimize Crop Growth/);
    assert.match(npkCode, /Biological Goal at Current Growth Stage/);
    assert.match(npkCode, /Immediate Growth Fixing Application/);
    assert.match(npkCode, /currentStageUreaKg/);
    assert.match(npkCode, /currentStageDapKg/);
    assert.match(npkCode, /currentStageMopKg/);
  });

  await t.test('3. Farmers Roadmap defines What Quantity to Get (Shopping List with 45kg/50kg commercial bags)', () => {
    assert.match(npkCode, /What Quantity to Get \(Shopping List\)/);
    assert.match(npkCode, /ureaBags/);
    assert.match(npkCode, /dapBags/);
    assert.match(npkCode, /mopBags/);
    assert.match(npkCode, /zincKg/);
    assert.match(npkCode, /Neem Coated Urea/);
    assert.match(npkCode, /estSubsidizedCost/);
  });

  await t.test('4. Farmers Roadmap defines When and What Quantity to Use in Field (4-Stage Protocol)', () => {
    assert.match(npkCode, /Farmers Application Roadmap \(When &amp; How to Use\)/);
    assert.match(npkCode, /Basal Application \(At Sowing \/ Transplanting\)/);
    assert.match(npkCode, /First Top Dressing \(Active Tillering \/ Branching\)/);
    assert.match(npkCode, /Second Top Dressing \(Panicle Initiation \/ Pre-Flowering\)/);
    assert.match(npkCode, /Finishing &amp; Grain Filling \(Milking \/ Pod Maturation\)/);
    assert.match(npkCode, /YOUR CURRENT STAGE — APPLY THIS IN FIELD TODAY/);
  });

  await t.test('5. Backward Compatibility: Preserves captureFieldCoordinates and DPDP legal prompts', () => {
    assert.match(npkCode, /captureFieldCoordinates/);
    assert.match(npkCode, /enableHighAccuracy:\s*true/);
    assert.match(npkCode, /Location access required for regional NPK recommendations/);
    assert.match(npkCode, /saveNPKToDB/);
    assert.match(npkCode, /recordConsentAuditLog/);
  });

  await t.test('6. Prescription Export: Provides WhatsApp-ready copy and print functionality', () => {
    assert.match(npkCode, /handleCopyPrescription/);
    assert.match(npkCode, /handlePrintPrescription/);
    assert.match(npkCode, /Grainwish AI — Farmers Growth Roadmap & NPK Prescription/);
  });
});
