import {
	AddBox,
	VolunteerActivismRounded,
	ForwardRounded,
} from "@mui/icons-material";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Stack,
	Button,
	styled,
	InputBase,
} from "@mui/material";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

// Breakpoint styling for responsiveness
const breakpointStyle = { display: { xs: "none", sm: "block" } };

const StyledToolBar = styled(Toolbar)({
	display: "flex",
	justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
	backgroundColor: "white",
	padding: "0 10px",
	borderRadius: theme.shape.borderRadius,
	width: "100%",
	alignSelf: "center",
}));

export const Navbar = () => {
	const { auth, setAuth } = useContext(AuthContext);

	return (
		<AppBar
			position="sticky"
			// sx={{ background: "#ff5e00", color: "#FFF6EF" }}
		>
			<StyledToolBar>
				{/* Logo (PassIt!) */}
				<IconButton
					size="large"
					edge="start"
					component={Link}
					to="/"
					color="inherit"
					aria-label="logo"
				>
					<VolunteerActivismRounded />
					<ForwardRounded />
					<Typography variant="h6" component="div" sx={breakpointStyle}>
						PassIt!
					</Typography>
				</IconButton>

				{/* Search bar + Add button */}
				<Stack
					direction="row"
					spacing={2}
					sx={{ width: "40%", justifyContent: "space-between" }}
				>
					<Search sx={{}}>
						<InputBase placeholder="search..." />
					</Search>
					<IconButton color="inherit">
						{/* '+' button will emulate userAuth for UI testing */}
						<AddBox />
					</IconButton>
				</Stack>

				{/* Functional navigation buttons */}
				<Stack direction="row" spacing={2}>
					<Button color="inherit" sx={breakpointStyle}>
						About
					</Button>

					<Button color="inherit">Browse</Button>

					{/* Render login/sign-up button based on user authentication */}
					{auth ? (
						<Button
							component={Link}
							to="/"
							color="inherit"
							sx={breakpointStyle}
							onClick={() => {
								axios
									.post("/users/logout")
									.then((result) => setAuth!(false))
									.catch((error) => alert(error));
							}}
						>
							Sign Out
						</Button>
					) : (
						<Button
							component={Link}
							to="/login"
							color="inherit"
							sx={breakpointStyle}
						>
							Login
						</Button>
					)}

					{/* TODO: Implement three-dot button for mobile UI
                        Will include About and Login/Sign-up buttons */}
				</Stack>
			</StyledToolBar>
		</AppBar>
	);
};
