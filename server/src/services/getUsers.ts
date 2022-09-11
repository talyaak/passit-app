import { QueryResult } from "pg";
import { userModel } from "../models/user.model";
import { client } from "../db/db.client";

/**
 * 
 * @returns all users from db.
 */
export const getUsers = async (): Promise<userModel[] | void> =>
	new Promise<userModel[]>((resolve, reject) => {
		const query = `SELECT * FROM users;`;

		client.query(
			query,
			async (error: Error, result: QueryResult<userModel>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});

/**
 * 
 * @param id id input, to be checked in db.
 * @returns 
 */
export const getUserById = async (id: string): Promise<userModel[] | void> =>
	new Promise<userModel[]>((resolve, reject) => {
		const query = `SELECT * FROM users WHERE user_id=$1;`;

		client.query(
			query, [id],
			async (error: Error, result: QueryResult<userModel>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});

/**
 * 
 * @param email email address input, to be checked in db.
 * @returns 
 */
export const getUserByEmail = (email: String) => {
	return new Promise<userModel>(async (resolve, reject) => {
		console.log("start email checking query");

		const query = {
			text: `SELECT * FROM users WHERE email=$1;`,
			values: [email]
		};

        try {
            const result = await client.query(query);
            if(result.rows.length === 0) { // No results
                console.log("User not found in e-mail check");
                reject(new Error("Invalid email or password"));
                return;
            }

            // Query completed, resolve result
			console.log(`finished query\nemail is available`);
			resolve(result.rows[0]);

        } catch (error) {
            console.log("ERROR");
			console.error(error);
			reject(error);
        }

	});
};