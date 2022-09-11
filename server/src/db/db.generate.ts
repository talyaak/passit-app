import { userModel } from "../models/user.model";
import { client } from "./db.client";
import { generateCrypt } from "../services/helpers/generateCrypt";

// Function for user row generation in db
async function generateUsers() {
	console.log("started users generation");

	const users: userModel[] = [
		// user 1
		{
			first_name: "John",
			last_name: "Doe",
			email: "johndoe@gmail.com",
			password: "abcdefg123",
			is_admin: false,
		},
		// user 2
		{
			first_name: "Jane",
			last_name: "Doe",
			email: "janedoe@gmail.com",
			password: "123456",
			is_admin: false,
		},
		// user 3
		{
			first_name: "Jim",
			last_name: "Beam",
			email: "jimbeam@gmail.com",
			password: "abcdefg123",
			is_admin: true,
		},
	];

	for (let user of users) {
		const first_name = user.first_name;
		const last_name = user.last_name;
		const email = user.email;
		const password = user.password.toString();
		const is_admin = user.is_admin;

		// Hashed passwords using bcrypt

		const hashedPassword = await generateCrypt(password);
		let query = `INSERT INTO users(
                first_name, last_name, email, password, is_admin
                ) VALUES (
                '${first_name}', '${last_name}', '${email}', '${hashedPassword}', ${is_admin});`;

		try {
			await client.query(query);
			console.log(`User '${user.first_name}' insert success`);
		} catch (error) {
			console.log(`User '${user.first_name} insert fail'\n${error}`);
		}
	}
}

// Generate users
async function main() {
	await generateUsers();
	client.end();
}

main();
