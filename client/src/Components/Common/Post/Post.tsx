import { styled } from "@mui/material/styles";
import {
	Favorite,
	FavoriteBorder,
	MoreVert,
	Share,
	ContactPhone,
	ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
	Avatar,
	Card,
	Link,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Checkbox,
	Collapse,
	IconButton,
	Typography,
} from "@mui/material";
import { IconButtonProps } from "@mui/material/IconButton";
import React, { useState, FormEvent, useEffect } from "react";
import { Link as RouteLink } from "react-router-dom";
import { Map } from "./Map";
import { expandedPostModel } from "../../../models/post.model";
import { ProtectedComponent } from "../ProtectedComponent";
import { userInfo } from "../../../models/user.model";
import axios from "axios";

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

interface postProps {
	postData?: expandedPostModel;
	auth?: boolean | null;
	liked?: boolean;
	userInfo?: userInfo | null;
}

export const Post = (props: postProps) => {
	const [expanded, setExpanded] = useState(false);
	const [postData] = useState(props.postData);
	const [liked, setLiked] = useState(props.liked);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// Handle 'Like' event vs DB & React state
	const handleLike = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!props.auth) {
			alert("Log in or sign up to like posts")
            return;
		}

		let likeEndpoint = "/api/like";
		if (liked) likeEndpoint = "/api/unlike";

		console.log(
			`Like endpoint: ${likeEndpoint}\nPost ID: ${postData?.post_id}\nUser ID: ${props.userInfo?.user_id}`
		);

		await axios.post(likeEndpoint, {
			post_id: postData?.post_id,
		});
		setLiked(!liked);
	};

	useEffect(() => {
		// Log liked state
		console.log(liked);
		return () => {};
	}, [liked]);

	return (
		<Card sx={{ margin: 5, height: "fit-content", maxWidth: { lg: "37%" } }}>
			<CardHeader
				avatar={
					// USER AVATAR (Initials)
					<Avatar sx={{ bgcolor: "blue" }} aria-label="item post">
						{postData
							? postData?.first_name.slice(0, 1) +
							  postData?.last_name.slice(0, 1)
							: ""}
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVert />
					</IconButton>
				}
				// USER NAME
				title={postData ? postData.first_name + " " + postData.last_name : ""}
				subheader="September 14, 2022"
			/>
			{/* IMAGE URL */}
			<CardMedia
				component="img"
				height="auto"
				// sx={{ maxHeight: "10%", maxWidth: }}
				image={postData ? postData.img_url : ""}
				alt="Second-hand sofa"
			/>
			<CardContent>
				{/* POST DESCRIPTION */}
				<Typography variant="body2" color="text.secondary">
					{postData ? postData.description : " "}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{/* TODO: Implement like button */}
				{/* <IconButton
					aria-label="add to favorites"
					
				> */}
				<Checkbox
					checked={liked}
					onChange={handleLike}
					inputProps={{ "aria-label": "controlled" }}
					icon={<FavoriteBorder />}
					checkedIcon={<Favorite sx={{ color: "red" }} />}
				/>
				{/* </IconButton> */}
				<IconButton aria-label="share">
					<Share />
				</IconButton>
				<IconButton>
					<ContactPhone />
				</IconButton>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			{/* MAP COMPONENT */}
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent style={{ textAlign: "center" }}>
					<ProtectedComponent
						// Logged in? => Show map
						authComponent={
							<Map address={postData ? postData.address : undefined} />
						}
						// Logged out? => refer to login
						default={
							<Link
								component={RouteLink}
								to="/login"
								variant="body2"
								color="inherit"
								sx={{ textDecoration: "none" }}
							>
								Log-in to see item location
							</Link>
						}
					/>
				</CardContent>
			</Collapse>
		</Card>
	);
};
