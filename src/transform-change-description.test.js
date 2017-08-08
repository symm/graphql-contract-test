const transformChangeDescription = require('./transform-change-description');

test('Transforms breaking change descriptions', () => {
  expect(transformChangeDescription('Shift.thing was removed.')).toBe('Shift.thing is not present.');

  expect(transformChangeDescription('Shift.end changed type from Int to String.')).toBe('Shift.end expected Int but got String.');
});
