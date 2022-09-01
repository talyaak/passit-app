import React from "react";
import { Box } from "@mui/material";

interface rBar {
    data: string
}

export const Rightbar = (props: rBar) => {
	return (
		<Box
			bgcolor="lightcoral"
			flex={1}
			p={2}
            // Below are settings for responsive breakpoints
			sx={{ display: { xs: "none", sm: "block" } }}
		>
			{props.data}
		</Box>
	);
};
