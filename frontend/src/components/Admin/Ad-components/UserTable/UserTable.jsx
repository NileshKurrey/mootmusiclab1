import { useState } from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	CircularProgress,
} from "@mui/material";
import {AiFillEdit} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import styles from "./styles.module.scss";

const UserTable = () => {
	const [loading, setLoading] = useState(true);
	// const dispatch = useDispatch();

	setTimeout(() => setLoading(false), 1000);

	// const handleUserDelete = (id) => {
	// 	deleteUser(id, dispatch);
	// };

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Name</TableCell>
						<TableCell align="center">Email</TableCell>
						<TableCell align="center">Gender</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				{loading && (
					<TableBody>
						<TableRow>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center">
								<CircularProgress
									style={{ color: "#1ed760", margin: "2rem 0" }}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableBody>
				)}
				{!loading && (
					<TableBody>
						{/* {users &&
							users.length !== 0 &&
							users.map((user) => ( */}
								<TableRow >
									<TableCell align="center">abhay Prakash</TableCell>
									<TableCell align="center">abahay@6@gmail.com</TableCell>
									<TableCell align="center">Male</TableCell>
									<TableCell align="center">
										12-15-2020
									</TableCell>
									<TableCell align="center">
										<Link to={`/users`}>
											<IconButton className={styles.edit_btn}>
												<AiFillEdit style={{color:'grey'}}/>
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											// onClick={() => handleUserDelete(user._id)}
										>
											<MdDelete style={{color:'red'}} />
										</IconButton>
									</TableCell>
								</TableRow>
							{/* ))} */}
						{/* {users && users.length === 0 && ( */}
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt=""
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						{/* )} */}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
};

export default UserTable;