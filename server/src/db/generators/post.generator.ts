import "dotenv/config";
import { postModel } from "../../models/post.model";
import { client } from "../db.client";
import axios from "axios";

interface pgQuery {
	text: string;
	values: (string | number | undefined)[];
}

// Generate random users (API: unsplash)
export async function generate30PostsUnsplashAPI() {
	const unsplashKey = process.env.UNSPLASH_API_KEY!;
	const unsplashBaseUrl = "https://api.unsplash.com/search/photos?page=2";
	const searchTerms = [
		"furniture items",
		"womens mens shirt jeans clothes",
		"household items",
	];
	let userCount = 1;

	for (let j = 0; j < 3; j++) {
		// Iterate through search terms (30 results total)

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

			const loremDescription =
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

			const post: postModel = createPost(
				userCount,
				category,
				i,
				loremDescription,
				searchResults.data.results[i].urls.regular
			);

			await dbAddPost(post, userCount);
		}
	}
	client.end();
}

// Generate random users (API: fakestoreapi, lorem.space)
export async function generatePostsFakestoreLorem() {
	let [numOfItem, numOfUser] = [1, 1];
    const loremBaseUrl = "https://cdn.lorem.space/images/";

    const furnitureEndpoints = [
		"furniture/.cache/600x450/lennon-cheng-3FmDZJtF4ho-unsplash.jpg",
		"furniture/.cache/600x450/paul-hanaoka-JUJ5osLgXpQ-unsplash.jpg",
		"furniture/.cache/600x450/mitch-moondae-zXFtsdi9dIc-unsplash.jpg",
		"furniture/.cache/600x500/sam-moqadam-ofxbaFNFNmo-unsplash.jpg",
		"furniture/.cache/600x500/phillip-goldsberry-fZuleEfeA1Q-unsplash.jpg",
		"furniture/.cache/600x500/bence-balla-schottner-vFwjD8JLP4M-unsplash.jpg",
		"furniture/.cache/600x500/minh-pham-OtXADkUh3-I-unsplash.jpg",
		"furniture/.cache/600x500/cesar-couto-OB2F6CsMva8-unsplash.jpg",
		"furniture/.cache/600x450/paul-weaver-nWidMEQsnAQ-unsplash.jpg",
		"furniture/.cache/600x500/behnam-norouzi-phXwnWWz-BM-unsplash.jpg",
	];

    for (const furnitureUrl of furnitureEndpoints) { // 3 shoe items
		const post = createPost(
			numOfUser,
			"furniture",
			numOfItem,
			`GIVING AWAY FOR FREE: Good piece of furniture for home, 'like new' condition!`,
			`${loremBaseUrl}${furnitureUrl}`
		);
		await dbAddPost(post, numOfUser);
		numOfItem++;
		numOfUser++;
    }
    numOfItem = 1;

	const fetchMenClothes = await axios.get(
		"https://fakestoreapi.com/products/category/men's%20clothing"
	);

	for (const result of fetchMenClothes.data) {
		// 4 men's clothes items
		const post = createPost(
			numOfUser,
			"clothes",
			numOfItem,
			`GIVING AWAY FOR FREE: ${result.description}`,
			result.image
		);
		await dbAddPost(post, numOfUser);
		numOfItem++;
		numOfUser++;
	}
	numOfItem = 1;

	const fetchWomenClothes = await axios.get(
		"https://fakestoreapi.com/products/category/men's%20clothing"
	);
	for (let i = 0; i < 3; i++) { // 3 women's clothes items
		const result = fetchWomenClothes.data[i];
		const post = createPost(
			numOfUser,
			"clothes",
			numOfItem,
			`GIVING AWAY FOR FREE: ${result.description}`,
			result.image
		);
		await dbAddPost(post, numOfUser);
		numOfItem++;
		numOfUser++;
	}
    numOfItem = 1;

	const shoesEndpoints = [
		"shoes/.cache/600x400/ryan-plomp-jvoZ-Aux9aw-unsplash.jpg",
		"shoes/.cache/600x400/usama-akram-g3CMh2nqj_w-unsplash.jpg",
		"shoes/.cache/600x400/matthew-dagelet-tBdkpxj3A7Q-unsplash.jpg",
	];

    for (const shoeUrl of shoesEndpoints) { // 3 shoe items
		const post = createPost(
			numOfUser,
			"clothes",
			numOfItem,
			`GIVING AWAY FOR FREE: Some fine shoes!`,
			`${loremBaseUrl}${shoeUrl}`
		);
		await dbAddPost(post, numOfUser);
		numOfItem++;
		numOfUser++;
    }
    
    client.end();
}

function createPost(
	userId: number,
	category: string,
	numOfItem: number,
	description: string,
	url: string
) {
	const post: postModel = {
		user_id: userId,
		category: category,
		product_name: `${category} item ${numOfItem}`,
		description: description,
		img_url: url,
	};
	return post;
}

async function dbAddPost(post: postModel, userCount: number) {
	const query: pgQuery = {
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
		console.log(
			`Post '${post.product_name}' from user_id ${userCount} insert success`
		);
		userCount++;
	} catch (error) {
		console.log(
			`Post '${post.product_name}' from user_id ${userCount} insert fail\n${error}`
		);
	}
}
