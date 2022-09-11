import axios from "axios";
import React, { useEffect, useState } from "react";

export const Profile = () => {
	const [data, setData] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get<any>("/users/myposts", { withCredentials: true })
				.then((result) => {
					setData(result.data.userInfo);
					console.log(result.data);
				});
		};

		fetchData();

		return () => {};
	}, []);

	return (
		<>
			{data ? (
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
			)}
		</>
	);
};
