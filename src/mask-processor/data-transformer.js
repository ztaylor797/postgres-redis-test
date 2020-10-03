import requiredParam from "../helpers/required-param";

export default function makeDataTransformer ({ database }) {
    return Object.freeze({
        updateAllRandom,
        updateAllFromLib,
        deleteAll
    });

    async function updateAllRandom ({ objectName = requiredParam('objectName'), fieldName = requiredParam('fieldName'), library = requiredParam('method') }) {
        // Generate random values on the fly as we iterate using pg? Or instead read the record count, generate a random list of equal size, then update.
        // Execute using pgp.helpers.update(). To generate the insert values, we would need to build it off the data returned from querying the initial object table.
        // Doing this on very large tables would necessitate something like cursor functionality. Could use the query logic below with a select and do say 1000 records at a time pulling back only the id and field to be updated.
        // An alternative solution would be to generate the list of random values, then insert this as a temp table in postgres. 
        // It would need an id column that matches the PK of the object table that is going to be updated. Then could perform a simple update where ids match.
    }

    async function updateAllFromLib ({ objectName = requiredParam('objectName'), fieldName = requiredParam('fieldName'), library = requiredParam('library') }) {
        // Refactor to use pg-promise instead of pg and pg-cursor, faster multi-row updates for library-type rule updates and random.
        // const db = await database;
        
        // // const query = {
        // //     text: `update ${objectName} set ${fieldName} = $1`,
        // //     values: [
        // //         newValue
        // //     ]
        // // };
        // const cursor = db.query(new Cursor(query));

        // let rows, rowsModified = 0;
        // while (rowsModified == 0 && (!rows || rows.length > 0)) {
        //     try {
        //         cursor.read(100, (err, rows) => {
        //             // TODO
        //             // Modify row here using cursor, not sure if possible with this lib
        //             // Use pg-promise instead: https://stackoverflow.com/questions/39119922/postgresql-multi-row-updates-in-node-js
        //             // const text = `update ${objectName} where current of `
        //             rowsModified += rows.length;
        //         });

        //     } catch (err) {
        //         throw new Error(err.stack);
        //     } finally {
        //         cursor.close(() => {
        //         });        
        //     }    
        // }
    }

    async function deleteAll ({ objectName = requiredParam('objectName'), fieldName = requiredParam('fieldName') }) {
        const db = await database;
        // TODO Right now, this only works for TEXT columns, don't try on age atm
        const query = {
            text: `update ${objectName} set ${fieldName} = ''`
        };
        try {
            const result = await db.query(query);
            // const result = "passed";
            console.log(`result: ${JSON.stringify(result, undefined, 2)}`);
            return {
                success: true
                // created: documentToCustomer(ops[0])
            };            
        } catch (err) {
            console.error('Error in deleteAll: ', err);
            return {
                success: false
            }
        }
    }
}
