const transformChangeType = require('./transform-change-type');

test('Transforms breaking change messages', () => {
  expect(transformChangeType('FIELD_CHANGED_KIND')).toBe('Field is the wrong kind');
});
