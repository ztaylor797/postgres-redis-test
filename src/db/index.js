const { Client } = require('pg');

export default async function makeDb() {
    // console.log(`makeDb DB_URL: ${process.env.DATABASE_URL}`);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        // ssl: true
        ssl: {
            rejectUnauthorized: false
        }
    });
    
    try {
        console.log(`Connecting to: ${process.env.DATABASE_URL}`);
        await client.connect();
        return client;
    } catch (err) {
        console.error('Error connecting postgres client: ', err);
    }
}