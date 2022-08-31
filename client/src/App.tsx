import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";

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
			<header className="App-header">
				<p>Hello PassIt!</p>
				<h2>Message from server:</h2>
				<p>{myData}</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Starting the app
				</a>
			</header>
		</div>
	);
}

export default App;
