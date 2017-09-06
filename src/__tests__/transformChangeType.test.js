import transformChangeType from '../transformChangeType'

test('Transforms breaking change messages', () => {
  expect(transformChangeType('FIELD_CHANGED_KIND')).toBe('Field is the wrong kind')
  expect(transformChangeType('FIELD_REMOVED')).toBe('Field does not exist')
  expect(transformChangeType('TYPE_CHANGED_KIND')).toBe('Type is the wrong kind')
  expect(transformChangeType('TYPE_REMOVED')).toBe('Type does not exist')
  expect(transformChangeType('TYPE_REMOVED_FROM_UNION')).toBe('Type not in Union')
  expect(transformChangeType('VALUE_REMOVED_FROM_ENUM')).toBe('Value not in ENUM')
  expect(transformChangeType('ARG_REMOVED')).toBe('Arg not present')
  expect(transformChangeType('ARG_CHANGED_KIND')).toBe('Argument is the wrong kind')
  expect(transformChangeType('INTERFACE_REMOVED_FROM_OBJECT')).toBe('Interface not present on object')
  expect(transformChangeType('ARG_DEFAULT_VALUE_CHANGE')).toBe('Argument default value does not match')
})
