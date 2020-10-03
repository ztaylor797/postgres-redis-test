import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
} from '../helpers/errors';
import makeHttpError from '../helpers/http-error';
import makeCustomer from './customer';

export default function makeCustomersEndpointHandler ({ customerList }) {
    return async function handle (httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return postCustomer(httpRequest);
            
            case 'GET':
                return getCustomers(httpRequest);
            
            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                });
        }
    }
    
    async function getCustomers (httpRequest) {
        const { id } = httpRequest.pathParams || {};
        const { max, before, after } = httpRequest.queryParams || {};
        
        const result = id
            ? await customerList.findById({ id })
            : await customerList.getItems({ max, before, after });
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        };
    }
    
    async function postCustomer (httpRequest) {
        let customerInfo = httpRequest.body;
        if (!customerInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No POST body.'
            });
        }
        
        if (typeof httpRequest.body === 'string') {
            try {
                customerInfo = JSON.parse(customerInfo);
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. POST body must be valid JSON.'
                });
            }
        }
        
        try {
            const customer = makeCustomer(customerInfo);
            const result = await customerList.add(customer);
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                data: JSON.stringify(result)
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
