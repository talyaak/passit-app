import axios from "axios";
import "./App.scss";
import { useState, useEffect, createContext, Context } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import {
	Feed,
	Login,
	SignUp,
	LikedPosts,
	MyPosts,
	Profile,
} from "./Components/Pages";
import {
	defaultAuthState,
	defaultFeedState,
	AuthInterface,
	FeedInterface,
} from "./models/context.interfaces";
import { expandedPostModel } from "./models/post.model";
import { userInfo } from "./models/user.model";

export const AuthContext: Context<AuthInterface> =
	createContext(defaultAuthState);
export const FeedContext: Context<FeedInterface> =
	createContext(defaultFeedState);

interface serverResponse {
	express: string;
}

function App() {
	const [myData, setMyData] = useState(""); // Dummy data (Rightbar placeholder)
	const [auth, setAuth] = useState<boolean | null>(null); // User authentication
    const [userInfo, setUserInfo] = useState<userInfo | null>(null); // User credentials
	const [feedData, setFeedData] = useState<expandedPostModel[] | null>(null); // Feed data (posts)

	// on-load data fetching
	// TODO: Implement Promise.all for multiple data-fetch instances
	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			try {
                const authResponse = await axios.post<boolean>("/users/auth");
				if (mounted) setAuth(authResponse.data);

                if (authResponse.data) {
                    const userInfoResponse = await axios.post<userInfo>("/users/credentials");
                    console.log(userInfoResponse.data);
                    if (mounted) setUserInfo(userInfoResponse.data);
                }

				const result = await axios.get<serverResponse>("/express_backend");
				if (mounted) setMyData(result.data.express);
				console.log(auth);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();

		// Cleanup function
		return () => {
			const clear = async () => (mounted = false);
			clear();
		};
	}, [auth]);

	return (
		<>
			<AuthContext.Provider value={{ auth, setAuth, userInfo }}>
				<FeedContext.Provider value={{ feedData, setFeedData }}>
					<Routes>
						<Route path="/" element={<Home data={myData} />}>
							<Route index element={<Feed />} />

							<Route path="login" element={<Login />} />

							<Route path="signup" element={<SignUp />} />

							<Route path="profile/posts" element={<MyPosts />} />

							<Route path="profile/liked" element={<LikedPosts />} />

							<Route path="profile" element={<Profile />} />

							{/* TODO: Implement 'Settings' component */}
							<Route path="settings" element={<Feed />} />

							<Route path="*" element={<div>Page not found</div>} />
						</Route>
					</Routes>
				</FeedContext.Provider>
			</AuthContext.Provider>
		</>
	);
}

export default App;
