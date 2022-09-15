import { userModel, addressModel } from "../../models/user.model";
import { client } from "../db.client";
import { generateCrypt } from "../../services/helpers/generateCrypt";
import axios from "axios";

// Generate 3 hardcoded users
export async function generateUsers() {
	console.log("started users generation");
	const address1: addressModel = {
		city: "נתניה",
		street_address: "רמז 11",
		country: "ישראל",
		lat: 34.8535034,
		lng: 34.8535034,
	};
	const users: userModel[] = [
		// user 1
		{
			first_name: "John",
			last_name: "Doe",
			email: "johndoe@gmail.com",
			password: "abcdefg123",
			address: address1,
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
		const query = {
			text: `INSERT INTO users(
                    first_name, last_name, email, address, password, is_admin
                    ) VALUES (
                    $1, $2, $3, $4, $5, $6);`,
			values: [
				first_name,
				last_name,
				email,
				address1,
				hashedPassword,
				is_admin,
			],
		};

		try {
			await client.query(query);
			console.log(`User '${user.first_name}' insert success`);
		} catch (error) {
			console.log(`User '${user.first_name} insert fail'\n${error}`);
		}
	}
    client.end();
}

// Generate random users (API: random-data-api.com)
export async function generateUsersFromAPI(numOfUsers: number) {
	// let users: userModel[] = [];
	const apiUsers = await axios.get(
		`https://random-data-api.com/api/v2/users?size=${numOfUsers}`
	);

	for (const apiUser of apiUsers.data) {
		const address: addressModel = {
			city: "",
			street_address: "",
			country: "",
			lat: apiUser.address.coordinates.lat,
			lng: apiUser.address.coordinates.lng,
		};

        const hashedPassword = await generateCrypt(apiUser.password);

		const user: userModel = {
			first_name: apiUser.first_name,
			last_name: apiUser.last_name,
			email: apiUser.email,
			password: hashedPassword,
			address: address,
			is_admin: false,
		};

        const query = {
			text: `INSERT INTO users(
                    first_name, last_name, email, address, password, is_admin
                    ) VALUES (
                    $1, $2, $3, $4, $5, $6);`,
			values: [
				user.first_name,
				user.last_name,
				user.email,
				user.address,
				user.password,
				user.is_admin,
			],
		};

		try {
			await client.query(query);
			console.log(`User '${user.first_name}' insert success`);
		} catch (error) {
            console.log(`User '${user.first_name} insert fail'\n${error}`);
		}
		// users.push(user);
	}
	// console.log(users);
    client.end();
}