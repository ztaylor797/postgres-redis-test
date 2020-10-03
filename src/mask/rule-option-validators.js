import requiredParam from "../helpers/required-param";
import isValidInteger from "../helpers/is-valid-integer";
import { MaskSecondaryParameterError, MaskGenericError } from './mask-errors';

/////////////////////////////////////////

const validRandomMethods = {
    ALPHA: 'random',
    NUMERIC: 'numeric',
    ALPHANUMERIC: 'alphanumeric'
}

export function validateRandomOptions({ rule = requiredParam('rule'), method = requiredParam('method'), ...otherOptions }) {
    if (!isValidMethod(method)) {
        throw new MaskSecondaryParameterError(rule, 'method', Object.values(validRandomMethods));
    }
    if (method == validRandomMethods.NUMERIC) {
        if (!isValidMinMax(otherOptions.min, otherOptions.max)) {
            throw new MaskGenericError(`Field mask of type: ${method} must have a valid integer set for both the "min" and "max" options.`);
        }
    }
}

function isValidMethod(method) {
    return Object.values(validRandomMethods).includes(method);
}

function isValidMinMax(min, max) {
    return isValidInteger(min) && isValidInteger(max);
}

/////////////////////////////////////////

const validLibraries = {
    FIRSTNAME: 'firstname',
    LASTNAME: 'lastname',
    EMAIL: 'email'
}

export function validateLibraryOptions({ rule = requiredParam('rule'), library = requiredParam('library'), ...otherOptions }) {
    if (!isValidLibrary(library)) {
        throw new MaskSecondaryParameterError(rule, 'library', Object.values(validLibraries));
    }
}

function isValidLibrary(library) {
    return Object.values(validLibraries).includes(library);
}

/////////////////////////////////////////

export function validateDeleteOptions({ ...otherOptions }) {
    return;
}