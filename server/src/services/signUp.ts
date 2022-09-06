import { QueryResult } from "pg";
import { generateCrypt } from "./generateCrypt";
import { client } from "../db/db.client";
import { userModel } from "../models/user.model";

/**
 * 
 * @param email email address input, to be checked in db.
 * @returns a promise resolving true/false based on email existence in db.
 */
export const checkEmail = (email: String) => {
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

/**
 * 
 * Receives user data, checks if email is already used in users database,
 * if not -> continues to insert user data into database
 * @param user user object abiding to userModel interface.
 * @returns a promise that either resolves "sign-up complete"
 * or rejects otherwise.
 */
export const signUp = (user: userModel) => {
	return new Promise(async (resolve, reject) => {
		console.log("start sign-up, referring to email check");
        
		await checkEmail(user.email)
        .then(async (emailIsAvailable) => {
			console.log(
				`finished email check result=${emailIsAvailable}\ncontinue signup`
			);

			if (!emailIsAvailable) { // email is taken, stop function
                reject(new Error("email is already in use"));
                return
            }
            
            // email is fine, continue db insert
			await generateCrypt(user.password)
            .then(async (hashedPassword) => {
                console.log(`generated crypt:\n${hashedPassword}`);
                console.log(user.first_name);
                
				const query = {
					text: `INSERT INTO users(
                        first_name, last_name, email, password, is_admin
                        ) VALUES (
                        $1, $2, $3, $4, $5);`,
					values: [
						user.first_name,
						user.last_name,
						user.email,
						hashedPassword,
						user.is_admin,
					],
				};
				await client
					.query(query)
					.then((res) => resolve(res.rows))
					.catch((e) => reject(e));
			});
		});
	});
};
