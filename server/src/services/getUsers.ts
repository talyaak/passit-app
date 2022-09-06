import { QueryResult } from "pg";
import { userModel } from "../models/user.model";
import { client } from "../db/db.client";

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
