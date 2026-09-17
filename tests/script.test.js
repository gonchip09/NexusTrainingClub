import test from 'node:test';
import assert from 'node:assert/strict';
import { formatStatValue } from '../script.js';

test('formatStatValue adds an optional prefix to animated statistics', () => {
  assert.equal(formatStatValue(800, '+'), '+800');
});

test('formatStatValue adds an optional suffix to animated statistics', () => {
  assert.equal(formatStatValue(900, '', ' m²'), '900 m²');
});
