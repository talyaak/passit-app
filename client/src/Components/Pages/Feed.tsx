import { Box, Stack, Skeleton } from "@mui/material";
import { useState } from "react";
import { Post } from "../Common/Post";

export const Feed = () => {
	const [loading, setLoading] = useState(true);

    // TODO: Implement data fetching from DB via server
    // TODO: Integrate "loading" UI whilst data fetching
	setTimeout(() => {
		setLoading(false);
	}, 3000);

	return (
		<>
			{loading ? (
				<Stack spacing={1}>
					<Skeleton variant="text" height={100} />
					<Skeleton variant="text" height={20} />
					<Skeleton variant="text" height={20} />
					<Skeleton variant="rectangular" height={300} />
				</Stack>
			) : (
				<Box p={2}>
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
				</Box>
			)}
		</>
	);
};
