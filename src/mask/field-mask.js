import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidRuleType from './is-valid-rule-type';
import { makeFieldMaskValidator } from '../mask-processor/executor-factory';
import { InvalidRuleTypeError } from './mask-errors';

export default function makeFieldMask (fieldMaskInfo = requiredParam('fieldMaskInfo')) {
    const validFieldMask = validate(fieldMaskInfo);
    const normalFieldMask = normalize(validFieldMask);

    // Build the rule-type specific
    // console.log(`WHY 04 ${JSON.stringify(tmpOtherInfo)}`);
    // console.log(`Calling makeFieldMaskExecutor: ${JSON.stringify({ rule: normalFieldMask.rule, ...tmpOtherInfo }, undefined, 2)}`);
    // This needs to be refactored, database method should only be built on consumer queue creation of field mask, not on submittal but the optional fields still need to be validated based on the rule type
    // if (fieldMaskInfo.database) {
    const fieldMaskValidator = makeFieldMaskValidator(normalFieldMask);
    fieldMaskValidator(fieldMaskInfo);
    // }

    return Object.freeze(normalFieldMask); // Taking advantage of function-hoisting here to put this at the top for clarity on what this function returns.
    
    function validate ({
        fieldName = requiredParam('fieldName'),
        rule = requiredParam('rule'),
        ...otherInfo
    } = {}) {
        validateFieldName(fieldName);
        validateRule(rule);
        return { fieldName, rule, ...otherInfo };
    }
    
    function validateFieldName (fieldName) {
        if (fieldName.length < 2) {
            throw new InvalidPropertyError(
                `A field name must be at least 2 characters long.`
            );
        }
    }

    function validateRule (rule) {
        if (!isValidRuleType(rule)) {
            throw new InvalidRuleTypeError(rule);
        }
    }   
    
    function normalize ({ fieldName, rule, ...otherInfo }) {
        return {
            fieldName: fieldName.toLowerCase(),
            rule,
            ...otherInfo
        };
    }
}