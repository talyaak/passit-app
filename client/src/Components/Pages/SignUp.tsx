import * as React from "react";
import { useState } from "react";

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

export const SignUp = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
    
    const theme = createTheme();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
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
