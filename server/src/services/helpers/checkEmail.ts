import { Client } from "pg";

/**
 *
 * @param email email address input, to be checked in db.
 * @returns a promise resolving true/false based on email existence in db.
 */
export const checkEmail = (client: Client, email: String) => {
	return new Promise<boolean>(async (resolve, reject) => {
		console.log("start email checking query");

		const query = {
			text: `SELECT email FROM users WHERE email=$1;`,
			values: [email],
		};

		try {
			const result = await client.query(query);
			let emailIsAvailable = result.rows.length === 0;// If query result is empty => true
			
            console.log(result.rows);
			console.log(`finished query\nemail is available: ${emailIsAvailable}`);
			
            resolve(emailIsAvailable);
		} catch (error) {
			console.log("ERROR");
			console.error(error);
			reject(error);
		}
	});
};