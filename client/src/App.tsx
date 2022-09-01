import React, { useState, useEffect } from "react";
import "./App.scss";
import { Navbar } from "./Components/Navbar";
import { Sidebar } from "./Components/Sidebar";
import { Feed } from "./Components/Feed";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import { Rightbar } from "./Components/Rightbar";

interface serverResponse {
	express: string;
}

function App() {
	const [myData, setMyData] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			await axios.get<serverResponse>("/express_backend").then((result) => {
				console.log(result);
                setMyData(result.data.express);
			});
		};

		fetchData();

		return () => {};
	});

	return (
		<Box>
			<Navbar />
			<Stack direction="row" spacing={2} justifyContent="space-between">
				<Sidebar />
				<Feed />
				<Rightbar data={myData}/>
			</Stack>

			{/* <header className="App-header">
				<Typography variant="h1" component="h1">
					Hello PassIt!
				</Typography>


				<h2>Message from server:</h2>

				<Typography variant="h4" component="h4">
					{myData}
				</Typography>

				<Button variant="contained" href="https://reactjs.org" target="_blank">
					Starting the app
				</Button>
			</header> */}
		</Box>
	);
}

export default App;
