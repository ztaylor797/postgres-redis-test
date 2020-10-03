import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import makeFieldMask from './field-mask';
import upperFirst from '../helpers/upper-first';

export default function makeObjectMask (maskInfo = requiredParam('maskInfo')) {

    const validMask = validate(maskInfo);

    // Instantiate each fieldMask via makeFieldMask which will validate them and add executor method
    const fieldMasks = [];
    validMask.fieldMasks.forEach(fMask => {
        const fieldMask = makeFieldMask(fMask);
        fieldMasks.push(fieldMask);
    });
    validMask.fieldMasks = fieldMasks;

    const normalMask = normalize(validMask);

    return Object.freeze(normalMask); // Taking advantage of function-hoisting here to put this at the top for clarity on what this function returns.
    
    function validate ({
        objectName = requiredParam('objectName'),
        fieldMasks = requiredParam('fieldMasks'),
        ...otherInfo
    } = {}) {
        validateObjectName(objectName);
        validateFieldMasks(fieldMasks);
        return { objectName, fieldMasks, ...otherInfo };
    }
    
    function validateObjectName (objectName) {
        if (objectName.length < 2) {
            throw new InvalidPropertyError(
                `An object name must be at least 2 characters long.`
            );
        }
    }     

    function validateFieldMasks (fieldMasks) {
        // Most of the validation logic on these is done when makeFieldMask is called, here we are just checking that this array is not empty
        if (!fieldMasks || fieldMasks.length < 1) {
            throw new InvalidPropertyError(
                `fieldMasks must contain at least one or more field entry.`
            );        
        }
        // TODO check here to make sure the fieldName in each fieldMask is unique, can't have more than one mask on a single field in a single object per execution
    }    
    
    function normalize ({ objectName, ...otherInfo }) {
        return {
            objectName: upperFirst(objectName),
            ...otherInfo
        };
    }
}