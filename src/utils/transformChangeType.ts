export const BreakingChangeMapping = {
    ARG_CHANGED_KIND: "Argument is the wrong kind",
    ARG_DEFAULT_VALUE_CHANGE: "Argument default value does not match",
    ARG_REMOVED: "Arg not present",
    FIELD_CHANGED_KIND: "Field is the wrong kind",
    FIELD_REMOVED: "Field does not exist",
    INTERFACE_REMOVED_FROM_OBJECT: "Interface not present on object",
    TYPE_CHANGED_KIND: "Type is the wrong kind",
    TYPE_REMOVED: "Type does not exist",
    TYPE_REMOVED_FROM_UNION: "Type not in Union",
    VALUE_REMOVED_FROM_ENUM: "Value not in ENUM",
}

export function transformChangeType(message: string): string {
    return BreakingChangeMapping[message]
}
