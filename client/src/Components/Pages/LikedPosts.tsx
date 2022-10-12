import { ProtectedPosts } from "../Common/ProtectedPosts";

export const LikedPosts = () => {
	return <ProtectedPosts endpoint={"/api/likedposts"} />;
};