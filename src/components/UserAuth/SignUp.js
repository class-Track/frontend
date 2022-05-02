import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { Footer } from "../../Footer";
// import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getDegrees, SignUpAPI } from "../../API";

const theme = createTheme();

export default function SignUp(props) {
	const history = useHistory();
	// const API = "https://classtrack-backend.herokuapp.com/";
	//const API = props.API
	const [degrees, setDegrees] = React.useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		SignUpAPI(data, history)

		// axios({
		// 	method: "POST",
		// 	url: API + "user",
		// 	data: {
		// 		isAdmin: false,
		// 		variant_id: parseInt(data.get("degree")),
		// 		first_name: data.get("first_name"),
		// 		last_name: data.get("last_name"),
		// 		email: data.get("email"),
		// 		password: data.get("password"),
		// 	},
		// })
		// 	.then((res) => {
		// 		console.log("results:", res.data);
		// 		history.push("/");
		// 	})
		// 	.catch((error) => {
		// 		console.log("error:", error);
		// 	});
	};

	// const getDegrees = async () => {
	// 	axios({
	// 		method: "GET",
	// 		url: API + "degrees_dept",
	// 	})
	// 		.then((res) => {
	// 			console.log("Degrees: ", res.data);
	// 			setDegrees(res.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log("error", error);
	// 		});
	// };

	React.useEffect(() => {
		getDegrees(setDegrees);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			{/* <Grid container alignItems='flex-start'>
                <Button onClick={() => { history.push("/") }}>Back</Button>
            </Grid> */}
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
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="first_name"
									required
									fullWidth
									id="first_name"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="last_name"
									label="Last Name"
									name="last_name"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth required>
									<InputLabel id="select-degree-label">
										Select your degree...
									</InputLabel>
									<Select
										defaultValue={""}
                                        id="degree-select"
										labelId="select-degree-label"
                                        label="Select your degree..."
                                        name="degree"
									>
										{degrees?.map((value) => {
											return (
												<MenuItem key={value.degree_id} value={value.degree_id}>
													{value.degree}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>
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
							{/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="center">
							<Grid item>
								<Link href="Login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Footer />
			</Container>
		</ThemeProvider>
	);
}
