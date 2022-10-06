import { QueryResult } from "pg";
import { postModel } from "../models/post.model";
import { client } from "../db/db.client";

/**
 *
 * Gets all liked posts by user
 */
export const getLikedPosts = async (
	userID: number
): Promise<boolean> =>
	new Promise<boolean>((resolve, reject) => {
		const query = {
			text: `SELECT * FROM likes WHERE user_id=$1;`,
			values: [userID],
		};

		client.query(
			query,
			async (error: Error, result: QueryResult<void | any>) => {
				if (error) reject(false);
				else if (result.rows.length > 0) resolve(true);
				else resolve(false);
			}
		);
	});

/**
 *
 * Checks for a 'like' instance between userID and postID, returns true/false
 */
export const checkLike = async (
	userID: number,
	postID: number
): Promise<boolean> =>
	new Promise<boolean>((resolve, reject) => {
		const query = {
			text: `SELECT * FROM likes WHERE user_id=$1 AND post_id=$2;`,
			values: [userID, postID],
		};

		client.query(
			query,
			async (error: Error, result: QueryResult<void | any>) => {
				if (error) reject(false);
				else if (result.rows.length > 0) resolve(true);
				else resolve(false);
			}
		);
	});

/**
 *
 * Creates a 'like' instance between userID and postID
 */
export const likePost = async (
	userID: number,
	postID: number
): Promise<any[] | void> =>
	new Promise<any[] | void>((resolve, reject) => {
		const query = {
			text: `INSERT INTO likes(
            user_id, post_id
            ) VALUES (
            $1, $2);`,
			values: [userID, postID],
		};

		client.query(
			query,
			async (error: Error, result: QueryResult<void | any>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});

/**
 *
 * Deletes a 'like' instance between userID and postID (if exists)
 */
export const unlikePost = async (
	userID: number,
	postID: number
): Promise<any[] | void> =>
	new Promise<any[] | void>((resolve, reject) => {
		const query = {
			text: `DELETE FROM likes WHERE user_id=$1 AND post_id=$2;`,
			values: [userID, postID],
		};

		client.query(
			query,
			async (error: Error, result: QueryResult<void | any>) => {
				if (error) reject(error);
				else resolve(result.rows);
			}
		);
	});
