import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Feed } from "./Components/Pages/Feed";
import { Profile } from "./Components/Pages/Profile";
import "./App.scss";
import { Home } from "./Components/Home";
import { Login, SignUp } from "./Components/Pages";

interface serverResponse {
	express: string;
}

function App() {
	const [myData, setMyData] = useState("");

	// on-load data fetching
	// TODO: Implement fetching from DB via server
	useEffect(() => {
		const fetchData = async () => {
			await axios.get<serverResponse>("/express_backend").then((result) => {
				// console.log(result);
				setMyData(result.data.express);
			});
		};

		fetchData();
		// TODO: Implement cleanup function
		return () => {};
	});

	return (
		<>

			<Routes>
				<Route path="/" element={<Home data={myData} />}>
					<Route index element={<Feed />} />

					<Route path="login" element={<Login />} />

					<Route path="signup" element={<SignUp />} />

					{/* TODO: Implement 'My Posts' component */}
					<Route path="profile/posts" element={<Feed />} />

					{/* TODO: Implement 'Liked' component */}
					<Route path="profile/liked" element={<Feed />} />

					{/* TODO: Implement 'Profile' component */}
					<Route path="profile" element={<Profile />} />

					{/* TODO: Implement 'Settings' component */}
					<Route path="settings" element={<Feed />} />

                    <Route path="*" element={<div>Page not found</div>} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
