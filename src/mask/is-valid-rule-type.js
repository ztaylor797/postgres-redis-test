import ruleTypes from './rule-types';

export default function isValidRuleType (ruleType) {
    return ruleType && Object.values(ruleTypes).includes(ruleType);
}
  