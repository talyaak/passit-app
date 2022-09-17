import { Box, Stack, Skeleton } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useState, useEffect } from "react";
import { Post } from "../Common/Post";
import axios from "axios";
import { expandedPostModel } from "../../models/post.model";

export const Feed = () => {
	const [loading, setLoading] = useState(true);
	const [postData, setPostData] = useState<expandedPostModel[]>();

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			try {
				const result = await axios.get<expandedPostModel[]>(
					"/api/expanded-posts"
				);
				if (mounted) setPostData(result.data);
				console.log(result.data);
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
	}, []);


	return (
		<>
			{!postData ? ( 
                // Loading animation while data-fetching
				<Stack spacing={1}>
					<Skeleton variant="text" height={100} />
					<Skeleton variant="text" height={20} />
					<Skeleton variant="text" height={20} />
					<Skeleton variant="rectangular" height={300} />
				</Stack>
			) : (
				
				<Masonry
					columns={{ xs: 1, lg: 2, xl: 3 }}
					spacing={10}
					sx={{ marginLeft: {xs: "-8px", sm: "0"}, margin: "5px" }}
				>
					{postData.map((post) => (
						<Post key={post.post_id} postData={post} />
					))}
				</Masonry>
			)}
		</>
	);
};
