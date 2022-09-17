import { QueryResult } from "pg";
import { postModel } from "../models/post.model";
import { client } from "../db/db.client";

/**
 *
 * @returns all users from db.
 */
export const getPosts = async (): Promise<postModel[] | void> =>
	new Promise<postModel[]>((resolve, reject) => {
		const query = `SELECT * FROM posts;`;

		client.query(
			query,
			async (error: Error, result: QueryResult<postModel>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});

/**
 *
 * @returns all users from db.
 */
export const getExpandedPosts = async (): Promise<postModel[] | void> =>
	new Promise<postModel[]>((resolve, reject) => {
		const query = `
                SELECT posts.post_id, users.user_id,
                users.first_name, users.last_name, users.email, users.email, 
                posts.category, posts.product_name, posts.description, posts.img_url, users.address
                FROM users
                INNER JOIN posts on
                users.user_id = posts.user_id;`;

		client.query(
			query,
			async (error: Error, result: QueryResult<postModel>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});
