import axios from "axios";
import { useState, useEffect, createContext, Context } from "react";
import { Route, Routes } from "react-router-dom";
import { Feed } from "./Components/Pages/Feed";
import { Profile } from "./Components/Pages/Profile";
import "./App.scss";
import { Home } from "./Components/Home";
import { Login, SignUp } from "./Components/Pages";

interface AuthInterface { 
    auth: boolean | null 
    setAuth: React.Dispatch<React.SetStateAction<boolean | null>> | null 
}

const defaultState: AuthInterface = {
    auth: null,
    setAuth: null
}

export const AuthContext: Context<AuthInterface> = createContext(defaultState);

interface serverResponse {
	express: string;
}

function App() {
	const [myData, setMyData] = useState("");
	const [auth, setAuth] = useState<boolean | null>(null);

	// on-load data fetching
	// TODO: Implement fetching from DB via server
	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			try {
				const serverAuth = await axios.post<boolean>("/users/auth");
				if (mounted) setAuth(serverAuth.data);

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
	});

	return (
		<>
			<AuthContext.Provider value={{auth, setAuth}}>
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
			</AuthContext.Provider>
		</>
	);
}

export default App;
