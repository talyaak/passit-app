import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Stack,
	Button,
} from "@mui/material";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import React from "react";

export const Navbar = () => {
	return (
		<>
			<AppBar
				position="static"
				sx={{ background: "#ff5e00", color: "#FFF6EF" }}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="logo"
					>
						
						<VolunteerActivismRoundedIcon />
						<ForwardRoundedIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						PassIt!
					</Typography>
					<Stack direction="row" spacing={2}>
						<Button color="inherit">About</Button>
						<Button color="inherit">Home</Button>
						<Button color="inherit">Browse</Button>
						<Button color="inherit">Login</Button>
					</Stack>
				</Toolbar>
			</AppBar>
		</>
	);
};
