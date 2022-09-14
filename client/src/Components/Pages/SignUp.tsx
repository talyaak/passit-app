import * as React from "react";
import { useState } from "react";
import { userModel } from "../../models/user.model";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	// FormControlLabel,
	// Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from "@mui/material";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

export const SignUp = () => {
	const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
    
    const theme = createTheme();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const user: userModel = {
            first_name: firstName,
            last_name: lastName,
			email: email,
			password: password,
            is_admin: false
		}

        axios.post("/users/signup", user).then(
            () => { // Success 
                alert("User created successfully!");
                navigate("/login");
            }, 
            (error) => { // Error
                alert(error.response.data.message)
            }
        )
	};

	return (
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
                    {/* FORM HEADER*/}
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
                    {/* FORM */}
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
                            {/* FIRST NAME INPUT */}
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
                                    onChange={(e) => {
										setFirstName(e.target.value);
									}}
								/>
							</Grid>
                            {/* LAST NAME INPUT */}
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
                                    onChange={(e) => {
										setLastName(e.target.value);
									}}
								/>
							</Grid>
                            {/* EMAIL INPUT */}
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
                                    onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</Grid>
                            {/* PASSWORD INPUT */}
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
                                    onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</Grid>
						</Grid>
                        {/* SUBMIT (SIGN-IN) BUTTON */}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
                        {/* FORM FOOTER */}
						<Grid container justifyContent="center">
							{/* SIGN IN REFERRAL */}
                            <Grid item>
								<Link 
                                component={RouteLink}
                                to="/login"
                                variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};
