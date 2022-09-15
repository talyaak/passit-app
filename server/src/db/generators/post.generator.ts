import "dotenv/config";
import { postModel } from "../../models/post.model";
import { client } from "../db.client";
import axios from "axios";

// Generate random users (API: random-data-api.com)
export async function generatePosts() {

    const unsplashKey = process.env.UNSPLASH_API_KEY!;
	const unsplashBaseUrl = "https://api.unsplash.com/search/photos?page=2";
	const searchTerms = [
		"furniture items",
		"womens mens shirt jeans clothes",
		"household items",
	];
    let userCount = 1;
	for (let j = 0; j < 3; j++) { // Iterate through search terms (30 results total)
		
        const searchResults = await axios.get<any>(
			`${unsplashBaseUrl}&query=${searchTerms[j]}&client_id=${unsplashKey}`
		);
        // Iterate through 10 search results of current term
		for (let i = 0; i < 10; i++) { 
			let category = "";
			switch (j) {
				case 0:
					category = "furniture";
					break;
				case 1:
					category = "clothes";
					break;
				case 2:
					category = "household";
					break;
				default:
					break;
			}

			const post: postModel = {
				user_id: userCount,
				category: category,
				product_name: `${category} item ${i}`,
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
				img_url: searchResults.data.results[i].urls.regular,
			};

			const query = {
				text: `INSERT INTO posts(
                    user_id, category, product_name, description, img_url
                    ) VALUES (
                    $1, $2, $3, $4, $5);`,
				values: [
					post.user_id,
					post.category,
					post.product_name,
					post.description,
					post.img_url,
				],
			};

			try {
				await client.query(query);
				console.log(`Post '${post.product_name}' from user_id ${userCount} insert success`);
                userCount++;
			} catch (error) {
				console.log(`Post '${post.product_name}' from user_id ${userCount} insert fail\n${error}`);
			}
			// users.push(user);
		}
		// console.log(users);
	}
	client.end();
}
