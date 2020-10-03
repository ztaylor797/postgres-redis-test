import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
} from '../helpers/errors';
import makeHttpError from '../helpers/http-error';
import makeObjectMask from './object-mask';

export default function makeMaskEndpointHandler ({ maskQueue }) {
    return async function handle (httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return postMask(httpRequest);
            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                });
        }
    }
    
    async function postMask (httpRequest) {
        let maskInfo = httpRequest.body;
        if (!maskInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No POST body.'
            });
        }
        
        if (typeof httpRequest.body === 'string') {
            try {
                maskInfo = JSON.parse(maskInfo);
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. POST body must be valid JSON.'
                });
            }
        }
        
        try {
            const objectMask = makeObjectMask(maskInfo);

            // console.log(`objectMask => ${JSON.stringify(objectMask, undefined, 2)}`);
            const job = await maskQueue.push(objectMask);
            // console.log(`job => ${JSON.stringify(job, undefined, 2)}`);

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                data: JSON.stringify(job)
            };
        } catch (e) {
            return makeHttpError({
                errorMessage: e.message,
                statusCode:
                    e instanceof UniqueConstraintError
                        ? 409
                        : e instanceof InvalidPropertyError ||
                    e instanceof RequiredParameterError
                        ? 400
                        : 500
            });
        }
    }
}
