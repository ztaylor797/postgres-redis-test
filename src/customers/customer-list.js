import makeCustomer from './customer'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeCustomerList ({ database }) {
    return Object.freeze({
        add,
        findByEmail,
        findById,
        getItems,
        remove,
        replace,
        update
    })
    
    // async function getItems ({ max = 100, before, after } = {}) {
    async function getItems (options = {}) {
        // const db = await database;
        const db = await database;
        const query = {
            text: 'select * from customer'
        };

        try {
            const { rows } = await db.query(query);
            return rows.map(rowToCustomer);
        } catch (err) {
            console.error('getItems error: ', err.stack);
        }
        // const query = {};
        // if (before || after) {
        //     query._id = {}
        //     query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        //     query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        // }
        
        // return (await db
        //     .collection('customer')
        //     .find(query)
        //     .limit(Number(max))
        //     .toArray()
        // ).map(documentToCustomer);
    }
        
    // async function add ({ customerId, ...customer }) {
    async function add ({ ...customer }) {
        const db = await database;
        // if (customerId) {
        //     customer._id = db.makeId(customerId);
        // }
        const query = {
            text: 'insert into customer (firstname, lastname, email, age) values ($1, $2, $3, $4);',
            values: [
                customer.firstname,
                customer.lastname,
                customer.email,
                customer.age
            ]
        };
        try {
            const result = await db.query(query);
            return {
                success: true
                // created: documentToCustomer(ops[0])
            };            
        } catch (err) {
            throw new Error(err.stack);
        }
            //     const [errorCode] = mongoError.message.split(' ')
            //     if (errorCode === 'E11000') {
            //         const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
            //         throw new UniqueConstraintError(
            //             mongoIndex === 'CustomerEmailIndex' ? 'emailAddress' : 'customerId'
            //         );
            //     }
            //     throw mongoError;
            // });


    }
    
    async function findById ({ id }) {
        const db = await database;
        const query = {
            text: 'select * from customer where id = $1',
            values: [ id ]
        };

        try {
            const { rows } = await db.query(query);
            return rows.map(rowToCustomer);
        } catch (err) {
            console.error('getItems error: ', err.stack);
        }        
        // TODO
        // const db = await database
        // const found = await db
        // .collection('customer')
        // .findOne({ _id: db.makeId(customerId) })
        // if (found) {
        //     return documentToCustomer(found)
        // }
        // return null
    }
    
    async function findByEmail ({ email }) {
        // TODO
        // const db = await database;
        // const results = await db
        //     .collection('customer')
        //     .find({ emailAddress })
        //     .toArray();
        // return results.map(documentToCustomer)
    }
    
    async function remove ({ id, ...customer }) {
        // todo
        // const db = await database
        // if (customerId) {
        //     customer._id = db.makeId(customerId)
        // }
        
        // const { result } = await db.collection('customer').deleteMany(customer)
        // return result.n
    }
    
    // todo:
    async function replace (customer) {}
    
    // todo:
    async function update (customer) {}
    
    function rowToCustomer ({ ...row }) {
        console.log(`Row: ${JSON.stringify(row, undefined, 2)}`);
        return makeCustomer({ ...row })
    }
}
