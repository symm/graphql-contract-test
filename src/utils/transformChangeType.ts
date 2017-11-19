export const BreakingChangeMapping = {
    FIELD_CHANGED_KIND: 'Field is the wrong kind',
    FIELD_REMOVED: 'Field does not exist',
    TYPE_CHANGED_KIND: 'Type is the wrong kind',
    TYPE_REMOVED: 'Type does not exist',
    TYPE_REMOVED_FROM_UNION: 'Type not in Union',
    VALUE_REMOVED_FROM_ENUM: 'Value not in ENUM',
    ARG_REMOVED: 'Arg not present',
    ARG_CHANGED_KIND: 'Argument is the wrong kind',
    INTERFACE_REMOVED_FROM_OBJECT: 'Interface not present on object',
    ARG_DEFAULT_VALUE_CHANGE: 'Argument default value does not match',
};

export function transformChangeType(message) {
    return BreakingChangeMapping[message];
}