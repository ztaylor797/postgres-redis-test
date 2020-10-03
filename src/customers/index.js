import makeDb from '../db';
import makeCustomerList from './customer-list';
import makeCustomersEndpointHandler from './customers-endpoint';

const database = makeDb(); // Postgres pg connection, promise
const customerList = makeCustomerList({ database });
const customersEndpointHandler = makeCustomersEndpointHandler({ customerList });

export default customersEndpointHandler;
