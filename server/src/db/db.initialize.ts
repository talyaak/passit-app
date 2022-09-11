import { client } from "./db.client";

// Create user table in db
async function initUsers() {
	console.log("Start user gen");
	try {
		// Creating users table
		const result = await client.query(
			`CREATE TABLE IF NOT EXISTS users(
                user_id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                is_admin BOOLEAN NOT NULL
            );`
		);
		console.log(result);
        
	} catch (error) {
		console.log(error);
	}
}

async function main() {
	await initUsers();
	client.end();
}

main();
