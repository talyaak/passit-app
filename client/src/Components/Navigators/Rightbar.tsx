import React from "react";
import { Box } from "@mui/material";

interface rBar {
    data: string
}

export const Rightbar = (props: rBar) => {
	return (
		<Box
			bgcolor="inherit"
			flex={1}
			p={2}
            // Below are settings for responsive breakpoints
			sx={{ display: { xs: "none", md: "block" } }}
		>
			{props.data}
		</Box>
	);
};
