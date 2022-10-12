import { Masonry } from "@mui/lab";
import { Skeleton, Stack } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext, FeedContext } from "../../App";
import { expandedPostModel } from "../../models/post.model";
import { Post } from "./Post/Post";

interface PSProps {
	endpoint: string; // Link to API endpoint
}

export const PostStack = (props: PSProps) => {
	const { auth, userInfo } = useContext(AuthContext); // User authentication
	const { feedData, setFeedData } = useContext(FeedContext); // Feed data (posts)
	const [likedPosts, setLikedPosts] = useState<number[]>([]); // Liked posts IDs (if authenticated)

	useEffect(() => {
		setFeedData!(null); // Reset state to enable loading animation
		let mounted = true;
		const fetchData = async () => {
			try {
                // If user is authenticated, acquire liked posts IDs
                if (auth) {
                    const likedPostsResult = await axios.get<number[]>(
                        "/api/fetch/likes",
                        {
                            withCredentials: true,
                        }
                    );
                    console.log(likedPostsResult.data);
                    
                    if (mounted) setLikedPosts(likedPostsResult.data);
                }

				// Get posts (via prop endpoint)
				const postsResult = await axios.get<expandedPostModel[]>(
					props.endpoint,
					{
						withCredentials: true,
					}
				);

				if (mounted) setFeedData!(postsResult.data);
				console.log(postsResult.data);

			} catch (error) {
				console.log(error);
			}
		};

		fetchData();

		// Cleanup function
		return () => {
			const clear = async () => (mounted = false);
			clear();
		};
	}, [auth]);

	return (
		<>
			{!feedData ? (
				// Loading animation while data-fetching
				<Stack spacing={1}>
					<Skeleton variant="text" height={100} />
					<Skeleton variant="text" height={20} />
					<Skeleton variant="text" height={20} />
					<Skeleton variant="rounded" height={300} />
				</Stack>
			) : (
				<Masonry
					columns={{ xs: 1, lg: 2, xl: 3 }}
					spacing={10}
					sx={{ marginLeft: { xs: "-8px", sm: "0" }, margin: "5px" }}
				>
					{feedData.map((post) => (
						<Post
							key={post.post_id}
							postData={post}
							liked={likedPosts.includes(post.post_id)}
                            auth={auth}
                            userInfo={userInfo}
						/>
					))}
				</Masonry>
			)}
		</>
	);
};

export default PostStack;
