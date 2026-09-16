import assert from 'node:assert/strict';
import test from 'node:test';
import {
  formatMonth,
  formatRange,
  latestStart,
  tenure,
  totalSpan,
} from './dates.ts';

test('formatMonth', () => {
  assert.equal(formatMonth('2024-03-01'), 'Mar 2024');
  assert.equal(formatMonth('2023-05-15T01:30:00.000Z'), 'May 2023');
  assert.equal(formatMonth(undefined), '');
});

test('formatRange', () => {
  assert.equal(
    formatRange({ startDate: '2023-05-01', endDate: '2023-08-01' }),
    'May 2023 – Aug 2023',
  );
  assert.equal(
    formatRange({ startDate: '2023-05-01', current: true }),
    'May 2023 – Present',
  );
});

test('tenure sums every period', () => {
  assert.equal(
    tenure([{ startDate: '2024-03-01', endDate: '2024-03-31' }]),
    '1 mo',
  );
  assert.equal(
    tenure([{ startDate: '2022-01-01', endDate: '2024-03-01' }]),
    '2 yrs 3 mos',
  );
  assert.equal(
    tenure([
      { startDate: '2023-05-01', endDate: '2023-08-01' },
      { startDate: '2024-05-01', endDate: '2024-08-01' },
    ]),
    '8 mos',
  );
});

test('totalSpan measures first start to last end, gaps included', () => {
  assert.equal(
    totalSpan([
      { startDate: '2023-05-01', endDate: '2023-08-01' },
      { startDate: '2024-05-01', endDate: '2024-08-01' },
    ]),
    '1 yr 4 mos',
  );
});

test('latestStart picks the most recent period', () => {
  assert.equal(
    latestStart([
      { startDate: '2023-05-01', endDate: '2023-08-01' },
      { startDate: '2024-05-01', endDate: '2024-08-01' },
    ]),
    '2024-05-01',
  );
});
