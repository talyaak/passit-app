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
import React from "react";
import { Map } from "./Map";

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

export const Post = () => {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ margin: 5 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: "blue" }} aria-label="item post">
						R
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVert />
					</IconButton>
				}
				title="John Doe"
				subheader="September 14, 2022"
			/>
			<CardMedia
				component="img"
				height="20%"
				image="https://cdn-images.article.com/products/SKU25A/2890x1500/image74669.jpg"
				alt="Second-hand sofa"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					A great second-hand sofa that I want to give away for free. Contact me
					via phone message only! Would gladly hand it out for lone-soldiers or
					someone in need of it.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
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
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent style={{textAlign: "center"}}>
					<Map />
				</CardContent>
			</Collapse>
		</Card>
	);
};
