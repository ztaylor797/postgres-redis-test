import requiredParam from '../helpers/required-param';
// import { MaskSecondaryParameterError } from './mask-errors';
import ruleTypes from '../mask/rule-types';
import { InvalidRuleTypeError } from '../mask/mask-errors';

import { validateRandomOptions, validateLibraryOptions, validateDeleteOptions } from '../mask/rule-option-validators';
import { makeRandomExecutor, makeLibraryExecutor, makeDeleteExecutor } from './rule-executors';

export function makeFieldMaskValidator ({ rule = requiredParam('rule'), ...otherInfo }) {
    let validateOptions;
    switch (rule) {
        case ruleTypes.RANDOM:
            validateOptions = validateRandomOptions;
            break;
        case ruleTypes.LIBRARY:
            validateOptions = validateLibraryOptions;
            break;
        case ruleTypes.DELETE:
            validateOptions = validateDeleteOptions;
            break;
        default:
            // Shouldn't be able to reach this point since executor is created by field-mask which is already validated.
            throw new InvalidRuleTypeError(rule);
    }

    return Object.freeze(validateOptions);
}
export function makeFieldMaskExecutor ({ dataTransformer = requiredParam('dataTransformer'), rule = requiredParam('rule'), ...otherInfo }) {
    let makeExecutor;
    switch (rule) {
        case ruleTypes.RANDOM:
            makeExecutor = makeRandomExecutor;
            break;
        case ruleTypes.LIBRARY:
            makeExecutor = makeLibraryExecutor;
            break;
        case ruleTypes.DELETE:
            makeExecutor = makeDeleteExecutor;
            break;
        default:
            // Shouldn't be able to reach this point since executor is created by field-mask which is already validated.
            throw new InvalidRuleTypeError(rule);
    }

    return Object.freeze(makeExecutor({ dataTransformer }));
}