import { Client } from "pg";

/**
 * 
 * @param email email address input, to be checked in db.
 * @returns a promise resolving true/false based on email existence in db.
 */
export const checkEmail = (client: Client ,email: String) => {
	return new Promise<boolean>(async (resolve, reject) => {
		console.log("start email checking query");

		const query = {
			text: `SELECT email FROM users WHERE email=$1;`,
			values: [email],
		};

		// If query result is empty => true
		let emailIsAvailable = false;

		await client
        .query(query)
        .then((res) => {
			if (res.rows.length === 0) emailIsAvailable = true;

			console.log(res.rows);
			console.log(`finished query\nemail is available: ${emailIsAvailable}`);
			resolve(emailIsAvailable);
		})
		.catch((e) => {
			console.log("ERROR");
			console.error(e.stack);
			reject(e);
		});
	});
};