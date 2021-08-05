import React, { useState, useContext } from "react";
import { Avatar, Paper, Grid, Typography, Container, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { Context } from "../Context";

const initialState = { email: "", password: "" };

const Login = () => {
	const baseURL = "https://assignment0010.herokuapp.com";
	const [formData, setFormData] = useState(initialState);
	const { setToken } = useContext(Context);
	const classes = useStyles();
	const history = useHistory();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		try {
			fetch(`${baseURL}/api/login`, {
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((res) => res.json())
				.then((res) => {
					const { access_token, message } = res;
					if (message === "success") {
						setToken(access_token);
						history.push("/home");
					} else {
						alert(message);
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="loginContainer">
			<Container component="main" maxWidth="xs">
				<Paper className={classes.paper} elevation={4}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variant="h5">SignIn</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="email"
									label="Email"
									type="email"
									onChange={handleChange}
									xs={12}
									variant="outlined"
									fullWidth
									autoFocus
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="password"
									label="Password"
									type="password"
									onChange={handleChange}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							SignIn
						</Button>
					</form>
				</Paper>
			</Container>
		</div>
	);
};

export default Login;
