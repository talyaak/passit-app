import { client } from "./db.client";

// Create user table in db
async function initUsers() {
    console.log("Start user gen");
    
    // Users table
    await client.query(
        `CREATE TABLE IF NOT EXISTS users(
            user_id SERIAL PRIMARY KEY,
            email TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            password TEXT NOT NULL,
            is_admin BOOLEAN NOT NULL
        );`)
    .then((result)=>{
        console.log(result);
    }, (error)=> {
        console.log(error);
    })
}

async function main() {
    await initUsers()
    .then((result)=>{
        client.end()
    })
}

main();