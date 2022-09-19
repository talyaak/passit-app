import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";
import { Navigate } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
import { Masonry } from "@mui/lab";
import { Post } from "../Common/Post";
import { expandedPostModel } from "../../models/post.model";

export const Posts = () => {
	const [postData, setPostData] = useState<expandedPostModel[]>();
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			try {
				const result = await axios.get<expandedPostModel[]>("/api/myposts", {
					withCredentials: true,
				});
				if (mounted) {
					setPostData(result.data);                   

				}
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
			{
                auth ? (
                    !postData ? ( 
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
                    )
                ):(
                    <Navigate replace to="/profile" />
                )
            }
		</>
	);
};
