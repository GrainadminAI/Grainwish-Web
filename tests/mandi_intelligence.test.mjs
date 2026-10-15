import { test } from 'node:test';
import assert from 'node:assert/strict';
import { 
  INDIAN_STATES_AND_UTS, 
  COMPREHENSIVE_MANDI_RECORDS, 
  IMD_WEATHER_ALERTS, 
  calculateHaversineDistance 
} from '../src/lib/allStatesMandiData.js';

test('Mandi 28-State Coverage: Verify all 28 states of India are represented', async (t) => {
  const official28States = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  await t.test('All 28 official Indian states are in the state selector list', () => {
    for (const state of official28States) {
      assert.ok(
        INDIAN_STATES_AND_UTS.includes(state),
        `State ${state} should be included in INDIAN_STATES_AND_UTS`
      );
    }
  });

  await t.test('Key Union Territories are also included', () => {
    const keyUTs = ['Jammu and Kashmir', 'Delhi', 'Puducherry', 'Chandigarh', 'Ladakh'];
    for (const ut of keyUTs) {
      assert.ok(
        INDIAN_STATES_AND_UTS.includes(ut),
        `UT ${ut} should be included in INDIAN_STATES_AND_UTS`
      );
    }
  });

  await t.test('Every one of the 28 states has at least one verified mandi crop record', () => {
    const coveredStates = new Set(COMPREHENSIVE_MANDI_RECORDS.map(r => r.state));
    for (const state of official28States) {
      assert.ok(
        coveredStates.has(state),
        `State ${state} must have at least one mandi record in the dataset`
      );
    }
  });
});

test('Mandi Data Quality: Verify modal prices, varieties, MSPs, and coordinates', async (t) => {
  await t.test('Every record contains complete agronomic and price metrics', () => {
    for (const rec of COMPREHENSIVE_MANDI_RECORDS) {
      assert.ok(rec.commodity && rec.commodity.length > 0, `Record ${rec.id} missing commodity`);
      assert.ok(rec.variety && rec.variety.length > 0, `Record ${rec.id} missing variety`);
      assert.ok(rec.state && rec.state.length > 0, `Record ${rec.id} missing state`);
      assert.ok(rec.district && rec.district.length > 0, `Record ${rec.id} missing district`);
      assert.ok(rec.market && rec.market.length > 0, `Record ${rec.id} missing market`);
      assert.ok(typeof rec.modalPrice === 'number' && rec.modalPrice > 0, `Record ${rec.id} invalid modalPrice`);
      assert.ok(typeof rec.msp === 'number' && rec.msp > 0, `Record ${rec.id} invalid msp`);
      assert.ok(typeof rec.lat === 'number' && typeof rec.lon === 'number', `Record ${rec.id} invalid lat/lon`);
      assert.ok(typeof rec.defaultDistanceKm === 'number' && rec.defaultDistanceKm > 0, `Record ${rec.id} invalid distance`);
    }
  });

  await t.test('Haversine distance calculation is accurate', () => {
    // New Delhi (28.6139, 77.2090) to Karnal (29.6857, 76.9905) is approx 120-130 km
    const dist = calculateHaversineDistance(28.6139, 77.2090, 29.6857, 76.9905);
    assert.ok(dist >= 115 && dist <= 135, `Distance should be approx 120-130 km, got ${dist}`);
  });
});

test('IMD Weather Advisories: Verify tarpaulin protection alerts and humidity metrics', async (t) => {
  await t.test('Weather alerts exist and contain tarpaulin or grain protection guidance', () => {
    assert.ok(IMD_WEATHER_ALERTS.length >= 4, 'Should have at least 4 active weather alerts');
    const hasTarpaulin = IMD_WEATHER_ALERTS.some(a => 
      a.advisory.toLowerCase().includes('tarpaulin') || 
      a.advisory.toLowerCase().includes('protect') ||
      a.advisory.toLowerCase().includes('shed')
    );
    assert.ok(hasTarpaulin, 'At least one advisory must advise tarpaulin or grain protection');
  });
});
