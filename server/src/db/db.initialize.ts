import { client } from "./db.client";

// Create user table in db
async function initDb() {
	console.log("Start database creation");
	try {
		const query = `
        CREATE TABLE "users" (
            "user_id" SERIAL PRIMARY KEY,
            "first_name" TEXT NOT NULL,
            "last_name" TEXT NOT NULL,
            "email" TEXT NOT NULL,
            "address" JSONB,
            "password" TEXT NOT NULL,
            "is_admin" BOOLEAN NOT NULL
            );
            
        CREATE TABLE "posts" (
            "post_id" SERIAL PRIMARY KEY,
            "user_id" INTEGER,
            "category" TEXT NOT NULL,
            "product_name" TEXT NOT NULL,
            "description" TEXT NOT NULL
        );
        
        CREATE TABLE "likes" (
            "like_id" SERIAL PRIMARY KEY,
            "user_id" INTEGER,
            "post_id" INTEGER
        );
        
        ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
        
        ALTER TABLE "likes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
        
        ALTER TABLE "likes" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("post_id");
        `;
		// Creating users table
		const result = await client.query(query);
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}

async function main() {
	await initDb();
	client.end();
}

main();
