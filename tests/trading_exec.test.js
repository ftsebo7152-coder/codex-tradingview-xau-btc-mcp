import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeQuantityForSymbol } from '../src/core/tradingExec.js';

test('normalizes BTCUSDT quantity to TradingView paper step', () => {
  const result = normalizeQuantityForSymbol(0.000781, 'BINANCE:BTCUSDT');

  assert.equal(result.quantity, 0.0008);
  assert.equal(result.step, 0.0001);
  assert.equal(result.adjusted, true);
});

test('keeps already-valid BTCUSDT quantity unchanged', () => {
  const result = normalizeQuantityForSymbol(0.0008, 'BTCUSDT');

  assert.equal(result.quantity, 0.0008);
  assert.equal(result.adjusted, false);
});

test('leaves unknown symbols untouched', () => {
  const result = normalizeQuantityForSymbol(12.34567, 'EURUSD');

  assert.equal(result.quantity, 12.34567);
  assert.equal(result.step, null);
  assert.equal(result.adjusted, false);
});
