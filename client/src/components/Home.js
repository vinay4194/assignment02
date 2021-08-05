import React, { useState, useContext } from "react";
import { Paper, Grid, Typography, Container, TextField, Button } from "@material-ui/core";
import ShowUsers from "./ShowUsers";
import { Context } from "../Context";

import { useHistory } from "react-router-dom";
import useStyles from "./styles";
const initialState = { username: "", mobileNo: "", email: "", address: "" };

const Home = () => {
	const baseURL = "https://assignment0010.herokuapp.com";
	const classes = useStyles();
	const [formData, setFormData] = useState(initialState);
	const { token } = useContext(Context);
	const history = useHistory();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			fetch(`${baseURL}/api/adduser`, {
				method: "POST",
				headers: {
					"content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			})
				.then((res) => res.json())
				.then((res) => {
					const { message } = res;
					if (message === "success") {
						alert("User added successfully");
					} else if (message === "unAuthorized") {
						alert("unAuthorized, Please Login");
						history.push("/");
					} else {
						alert(message);
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={classes.mainContainer}>
			<Container component="main" maxWidth="xs">
				<Paper className={classes.paper} elevation={4}>
					<Typography variant="h5">Add a User</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="username"
									label="UserName"
									type="string"
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
									name="mobileNo"
									label="Mobile No"
									type="number"
									onChange={handleChange}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
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
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="address"
									label="Address"
									type="string"
									onChange={handleChange}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Add
						</Button>
					</form>
				</Paper>
			</Container>
			<ShowUsers />
		</div>
	);
};

export default Home;
