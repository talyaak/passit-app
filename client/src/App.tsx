import React, { useState, useEffect } from "react";
import "./App.scss";
import { Navbar } from "./Componenets/Navbar";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface serverResponse {
	express: string;
}

function App() {
	const [myData, setMyData] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			await axios.get<serverResponse>("/express_backend").then((result) => {
				setMyData(result.data.express);
			});
		};

		fetchData();

		return () => {};
	});

	return (
        <div className="App">
            <Navbar />
			<header className="App-header">
				<Typography variant="h1" component="h1">Hello PassIt!</Typography>
				{/* <p></p> */}
				<h2>Message from server:</h2>
                <Typography variant="h4" component="h4">{myData}</Typography>
				<Button variant="contained" href="https://reactjs.org" target="_blank">
					Starting the app
				</Button>
			</header>
		</div>
	);
}

export default App;
