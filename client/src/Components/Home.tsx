import { Navbar, Sidebar, Rightbar } from "./Navigators";
import { Box, Stack } from "@mui/system";
import { Outlet } from "react-router-dom";

interface HomeProps {
	data: string;
}

export const Home = (props: HomeProps) => {
	return (
		<Box>
			<Navbar />
			<Stack direction="row" spacing={2} justifyContent="space-between">
				<Sidebar />
				<Box flex={4} p={{ xs: 0, md: 2 }} textAlign="center">
					<Outlet />
				</Box>
				<Rightbar data={props.data} />
			</Stack>
		</Box>
	);
};
