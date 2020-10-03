import ruleTypes from './rule-types';

export class InvalidRuleTypeError extends Error {
    constructor (rule) {
        super(`Invalid field mask type: ${rule}. Valid types: [${Object.values(ruleTypes).join(', ')}]`);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidRuleTypeError)
        }
    }
}

export class MaskSecondaryParameterError extends Error {
    constructor (rule, param, validValues = undefined) {
        const validValuesStr = validValues ? ` Valid values: [${Object.values(validValues).join(', ')}]` : '';
        super(`Field mask additional parameter: ${param} was invalid for rule type: ${rule}.${validValuesStr}`);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MaskSecondaryParameterError)
        }
    }
}

export class MaskGenericError extends Error {
    constructor (message) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MaskGenericError)
        }
    }
}