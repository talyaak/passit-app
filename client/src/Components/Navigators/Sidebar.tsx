import {
	ThumbUpAlt,
	AccountCircleRounded,
	Article,
	Home,
	ModeNight,
	Settings,
} from "@mui/icons-material";
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Switch,
} from "@mui/material";
import { CustomSideButton } from "../Common/CustomSideButton";

export const Sidebar = () => {
	return (
		<Box
			flex={1}
			p={2}
			// Below are settings for responsive breakpoints
			sx={{ display: { xs: "none", sm: "block" } }}
		>
			<Box position="fixed">
				<List>
					{/* 'Home' button */}
					<CustomSideButton component={<Home />} link="/" primary="Home" />

					{/* 'My Posts' button */}
                    <CustomSideButton component={<Article />} link="/profile/posts" primary="My Posts" />

					{/* 'Liked' button*/}
                    <CustomSideButton component={<ThumbUpAlt />} link="/profile/liked" primary="Liked"/>

					{/* 'Setting' button
					<CustomSideButton component={<Settings />} link="/settings" primary="Settings"/> */}

					{/* 'Profile' button */}
                    <CustomSideButton component={<AccountCircleRounded />} link="/profile" primary="Profile"/>


					{/* TODO: Implement 'Night Mode' button */}
					<ListItem disablePadding>
						<ListItemButton component="a" href="#simple-list">
							<ListItemIcon>
								<ModeNight />
							</ListItemIcon>
							<Switch
							// onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Box>
	);
};
