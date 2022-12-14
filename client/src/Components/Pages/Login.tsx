import * as React from "react";
import { useState, useContext } from "react";

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from "@mui/material";

import { Link as RouteLink, useNavigate, Navigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../App";
import axios from "axios";
import { ProtectedComponent } from "../Common/ProtectedComponent";

export function Login() {
	const theme = createTheme();
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { auth, setAuth } = useContext(AuthContext);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const user = {
			email: email,
			password: password,
		};
		console.log(user);
		axios.post("/users/login", user).then(
			(result) => {
				// Success
				console.log(result);
				setAuth!(true);
				navigate("/profile");
			},
			(error) => {
				// Error
				alert(error.response.data.message);
			}
		);
	};

	return (
		<>
            <ProtectedComponent 
            authComponent={<Navigate replace to="/profile" />}
            default={
                <ThemeProvider theme={theme}>
					<Container component="main" maxWidth="xs">
						<CssBaseline />
						<Box
							sx={{
								marginTop: 8,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							{/* FORM HEADER AVATAR */}
							<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
								<LockOutlinedIcon />
							</Avatar>
							{/* FORM HEADER */}
							<Typography component="h1" variant="h5">
								Login
							</Typography>
							{/* FORM */}
							<Box
								component="form"
								onSubmit={handleSubmit}
								noValidate
								sx={{ mt: 1 }}
							>
								{/* EMAIL INPUT */}
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										console.log(email);
									}}
								/>
								{/* PASSWORD INPUT */}
								<TextField
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										console.log(password);
									}}
								/>
								{/* REMEMBER ME TODO: Implement "Remember me" button in login*/}
								{/* <FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/> */}
								{/* SUBMIT (SIGN-IN) BUTTON */}
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Sign In
								</Button>
								{/* FORM FOOTER */}
								<Grid container justifyContent="center">
									{/* FORGOT PASSWORD? TODO: Implement */}
									{/* <Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid> */}
									{/* SIGN UP REFERRAL */}
									<Grid item>
										<Link component={RouteLink} to="/signup" variant="body2">
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
            }
            />
			
		</>
	);
}
