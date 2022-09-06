import { userModel } from "../models/user.model";
import { client } from "./db.client";

// Function for user row generation in db
async function generateUsers() {
	console.log("started users generation");

	const users: userModel[] = [
		// user 1
		{
			firstName: "John",
			lastName: "Doe",
			email: "johndoe@gmail.com",
			password: "abcdefg123",
			isAdmin: false,
		},
		// user 2
		{
			firstName: "Jane",
			lastName: "Doe",
			email: "janedoe@gmail.com",
			password: "123456",
			isAdmin: false,
		},
		// user 3
		{
			firstName: "Jim",
			lastName: "Beam",
			email: "jimbeam@gmail.com",
			password: "abcdefg123",
			isAdmin: true,
		},
	];

	for (let user of users) {
		const firstName = user.firstName;
		const lastName = user.lastName;
		const email = user.email;
		const password = user.password;
		const isAdmin = user.isAdmin;

		let query = 
        `INSERT INTO users(
        email, first_name, last_name, password, is_admin
        ) VALUES (
            '${firstName}', '${lastName}', '${email}', '${password}', ${isAdmin}
        );`;

		await client.query(query).then(
			(result) => {
				console.log(`User '${user.firstName}' insert success`);
			},
			(error) => console.log(`User '${user.firstName} insert fail'\n${error}`)
		);
	}
}

// Generate users
async function main() {
	await generateUsers().then((result) => {
		client.end();
	});
}

main();
