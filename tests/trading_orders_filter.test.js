import test from 'node:test';
import assert from 'node:assert/strict';
import { isTerminalOrderRow } from '../src/core/trading.js';

test('terminal filled order rows are filtered from active orders', () => {
  assert.equal(isTerminalOrderRow(['BINANCE:BTCUSDT', 'Buy', 'Market', 'filled']), true);
});

test('terminal cancelled bracket rows are filtered from active orders', () => {
  assert.equal(isTerminalOrderRow(['BINANCE:BTCUSDT', 'Sell', 'Stop Loss', 'cancelled']), true);
});

test('working order rows remain active', () => {
  assert.equal(isTerminalOrderRow(['BINANCE:BTCUSDT', 'Sell', 'Limit', 'working']), false);
});
