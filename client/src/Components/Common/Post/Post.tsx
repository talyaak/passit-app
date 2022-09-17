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
import React, { useState } from "react";
import { Map } from "./Map";
import { expandedPostModel } from "../../../models/post.model";

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
}

export const Post = (props: postProps) => {
	const [expanded, setExpanded] = useState(false);
	const [postData, setPostData] = useState(props.postData);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ margin: 5, height: "fit-content", maxWidth: {lg: "37%"} }}>
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
				<IconButton aria-label="add to favorites">
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite sx={{ color: "red" }} />}
					/>
				</IconButton>
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
					<Map address={postData ? postData.address : undefined} />
				</CardContent>
			</Collapse>
		</Card>
	);
};
