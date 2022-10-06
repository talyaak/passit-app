import { UserSpecificPosts } from "../Common/UserSpecificPosts";

export const LikedPosts = () => {
	
	return (
		<>
            <UserSpecificPosts endpoint={"/api/likedposts"} />
		</>
	);
};
