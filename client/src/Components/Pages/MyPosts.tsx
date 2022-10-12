import { ProtectedPosts } from "../Common/ProtectedPosts";

export const MyPosts = () => {
	return <ProtectedPosts endpoint={"/api/myposts"} />;
};