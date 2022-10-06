import { UserSpecificPosts } from "../Common/UserSpecificPosts";

export const MyPosts = () => {
	
	return (
		<>
            <UserSpecificPosts endpoint={"/api/myposts"} />
		</>
	);
};
