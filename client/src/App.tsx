import axios from "axios";
import "./App.scss";
import { useState, useEffect, createContext, Context } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Feed, Login, SignUp, LikedPosts, MyPosts, Profile } from "./Components/Pages";



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
	// TODO: Implement Promise.all for multiple data-fetch instances
	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
            try {
                const result = await axios.get<serverResponse>("/express_backend");
                if (mounted) setMyData(result.data.express);

                const serverAuth = await axios.post<boolean>("/users/auth");
				if (mounted) setAuth(serverAuth.data);
                
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

						<Route path="profile/posts" element={<MyPosts />} />

						<Route path="profile/liked" element={<LikedPosts />} />

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
