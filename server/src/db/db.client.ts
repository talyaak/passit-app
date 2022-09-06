import { Client } from 'pg';
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;

export const client = new Client({

    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();