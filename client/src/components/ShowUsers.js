import React, { useEffect, useState, useContext } from "react";
import { Paper, Typography, Container, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { Context } from "../Context";

const ShowUsers = () => {
	const baseURL = "https://assignment0010.herokuapp.com";
	const [inputData, setInputData] = useState([]);
	const classes = useStyles();
	const history = useHistory();
	const { token } = useContext(Context);

	useEffect(() => {
		fetch(`${baseURL}/api/getusers`)
			.then((res) => res.json())
			.then((res) => {
				setInputData(res);
			});
	}, [inputData]);

	const handleDelete = (id) => {
		fetch(`${baseURL}/api/deleteuser/${id}`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				const { message } = res;
				if (message === "success") {
					alert("User deleted successfully");
				} else if (message === "unAuthorized") {
					alert("unAuthorized, Please Login!");
					history.push("/");
				} else {
					alert(message);
				}
			});
	};

	return (
		<Container component="main" maxWidth="md">
			<Paper className={classes.paper} elevation={4}>
				<Typography variant="h5">Users</Typography>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Username</TableCell>
								<TableCell align="center">MobileNo</TableCell>
								<TableCell align="center">Email</TableCell>
								<TableCell align="center">Address</TableCell>
								<TableCell align="center">Delete</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{inputData.map((item) => (
								<TableRow key={item._id}>
									{/* <TableCell component="th" scope="row">
										{row.name}
									</TableCell> */}
									<TableCell align="center">{item.username}</TableCell>
									<TableCell align="center">{item.mobileNo}</TableCell>
									<TableCell align="center">{item.email}</TableCell>
									<TableCell align="center">{item.address}</TableCell>
									<TableCell align="center">
										{
											<Button
												onClick={() => {
													handleDelete(item._id);
												}}
											>
												{<DeleteIcon />}
											</Button>
										}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
};

export default ShowUsers;
