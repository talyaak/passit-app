import { QueryResult } from "pg";
import { postModel, expandedPostModel } from "../models/post.model";
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
export const getExpandedPosts = async (): Promise<expandedPostModel[] | void> =>
	new Promise<expandedPostModel[]>((resolve, reject) => {
		const query = `
                SELECT posts.post_id, users.user_id,
                users.first_name, users.last_name, users.email, users.email, 
                posts.category, posts.product_name, posts.description, posts.img_url, users.address
                FROM users
                INNER JOIN posts on
                users.user_id = posts.user_id;`;

		client.query(
			query,
			async (error: Error, result: QueryResult<expandedPostModel>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});

export const getMyPosts = async (
	userId: number
): Promise<expandedPostModel[] | void> =>
	new Promise<expandedPostModel[]>((resolve, reject) => {
		const query = {
			text: `SELECT posts.post_id, users.user_id,
            users.first_name, users.last_name, users.email, 
            posts.category, posts.product_name, posts.description, posts.img_url, users.address
            FROM users
            INNER JOIN posts on
            users.user_id = posts.user_id
            WHERE users.user_id = $1;`,
			values: [userId],
		};

		client.query(
			query,
			async (error: Error, result: QueryResult<expandedPostModel>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});

export const getLikedPosts = async (
	userId: number
): Promise<expandedPostModel[] | void> =>
	new Promise<expandedPostModel[]>((resolve, reject) => {
		const query = {
			text: `SELECT likes.post_id, posts.user_id, users.first_name, users.last_name, users.email, 
            posts.category, posts.product_name, posts.description, posts.img_url, users.address
            FROM likes
            INNER JOIN posts ON
            likes.post_id = posts.post_id
            INNER JOIN users ON
            posts.user_id = users.user_id
            WHERE likes.user_id = $1;`,
			values: [userId],
		};

		client.query(
			query,
			async (error: Error, result: QueryResult<expandedPostModel>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});
