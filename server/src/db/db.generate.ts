import { generateUsers, generateUsersFromAPI} from './generators/user.generator';
import { generatePosts } from './generators/post.generator';

// Execute a generator by choosing which function to uncomment
async function main() {
	// await generateUsers();
	// await generateUsersFromAPI(50);
    await generatePosts();
}

main();
