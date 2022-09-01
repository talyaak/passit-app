import { AddBox } from "@mui/icons-material";

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
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";

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
	return (
		<AppBar
			position="sticky"
			// sx={{ background: "#ff5e00", color: "#FFF6EF" }}
		>
			<StyledToolBar>
				<IconButton size="large" edge="start" color="inherit" aria-label="logo">
					<VolunteerActivismRoundedIcon />
					<ForwardRoundedIcon />
					<Typography
						variant="h6"
						component="div"
						sx={ breakpointStyle }
					>
						PassIt!
					</Typography>
				</IconButton>

				<Stack
					direction="row"
					spacing={2}
					sx={{ width: "40%", justifyContent: "space-between" }}
				>
					<Search sx={{}}>
						<InputBase placeholder="search..." />
					</Search>
					<IconButton color="inherit">
						<AddBox />
					</IconButton>
				</Stack>

				<Stack direction="row" spacing={2}>
					<Button color="inherit" sx={ breakpointStyle }>
						About
					</Button>

					<Button color="inherit">Browse</Button>

					<Button color="inherit" sx={ breakpointStyle }>
						Login
					</Button>
				</Stack>
			</StyledToolBar>
		</AppBar>
	);
};
