import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";
import { Navigate } from "react-router-dom";

export const Profile = () => {
	const [data, setData] = useState<any>();
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get<any>("/users/myposts", {
				withCredentials: true,
			});
			setData(result.data.userInfo);
			console.log(result.data);
		};

		fetchData();

		return () => {};
	}, []);

	return (
		<>
			{auth ? (
				data ? (
					<>
						<h1>Profile Page</h1>
						<br />
						<h2>User details:</h2>
						<br />
						<div>email: {data.email}</div>
						<div>name: {`${data["first_name"]} ${data["last_name"]}`}</div>
						<div>user id: {data["user_id"]}</div>
					</>
				) : (
					<>Loading</>
				)
			) : (
				<Navigate to="/login" />
			)}
			
		</>
	);
};
