import { generateUsers, generateUsersFromAPI} from './generators/user.generator';
import { generate30PostsUnsplashAPI, generatePostsFakestoreLorem } from './generators/post.generator';

// Execute a generator by choosing which function to uncomment
async function main() {
	// await generateUsers();
	// await generateUsersFromAPI(47);
    await generatePostsFakestoreLorem();
}

main();
