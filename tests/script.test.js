import test from 'node:test';
import assert from 'node:assert/strict';
import { formatStatValue, validateTrialForm } from '../script.js';

test('formatStatValue adds an optional prefix to animated statistics', () => {
  assert.equal(formatStatValue(800, '+'), '+800');
});

test('formatStatValue adds an optional suffix to animated statistics', () => {
  assert.equal(formatStatValue(900, '', ' m²'), '900 m²');
});

const validTrial = {
  firstName: 'Ana',
  lastName: 'Pérez',
  email: 'ana@example.com',
  phone: '099 123 456',
  training: 'fuerza',
  accepted: true,
};

test('validateTrialForm reports every missing required field', () => {
  assert.deepEqual(validateTrialForm({}), {
    firstName: 'Ingresá tu nombre.',
    lastName: 'Ingresá tu apellido.',
    email: 'Ingresá tu email.',
    phone: 'Ingresá tu teléfono.',
    training: 'Elegí una modalidad.',
    accepted: 'Necesitás aceptar para continuar.',
  });
});

test('validateTrialForm rejects malformed email', () => {
  assert.equal(validateTrialForm({ ...validTrial, email: 'ana@' }).email, 'Ingresá un email válido.');
});

test('validateTrialForm rejects a phone with fewer than eight digits', () => {
  assert.equal(validateTrialForm({ ...validTrial, phone: '123-45' }).phone, 'Ingresá un teléfono válido.');
});

test('validateTrialForm accepts complete valid data', () => {
  assert.deepEqual(validateTrialForm(validTrial), {});
});
