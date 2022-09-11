import { generateCrypt } from "./helpers/generateCrypt";
import { checkEmail } from "./helpers/checkEmail";
import { client } from "../db/db.client";
import { userModel } from "../models/user.model";

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

		try {
			const emailIsAvailable = await checkEmail(client, user.email);
			console.log(
				`finished email check result=${emailIsAvailable}\ncontinue signup`
			);

			if (!emailIsAvailable) {
				// email is taken, stop function
				reject(new Error("email is already in use"));
				return;
			}

			// email is fine, continue db insert
			const hashedPassword = await generateCrypt(user.password);
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

            const result = await client.query(query);
            resolve(result.rows);

		} catch (error) {
            reject(error);
        }
		
	});
};
