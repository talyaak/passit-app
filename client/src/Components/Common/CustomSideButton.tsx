import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface CustomSideButtonProps {
	component: JSX.Element;
	link: string;
    primary: string;
}

export const CustomSideButton = (props: CustomSideButtonProps) => {
	return (
		<ListItem disablePadding>
			<ListItemButton component={Link} to={props.link}>
				<ListItemIcon>
					{props.component}
				</ListItemIcon>
				<ListItemText primary={props.primary} />
			</ListItemButton>
		</ListItem>
	);
};
