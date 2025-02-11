import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import arrow_back from "../../authImage/arrow_back.png";
import Ellipse1 from "../../authImage/Ellipse1.png";
import Ellipse2 from "../../authImage/Ellipse2.png";
import Group2 from "../../authImage/Group2.png";

const Signup = () => {
	const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
		confrim_password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<img src={arrow_back} className={styles.arrow} />
			<img src={Ellipse1} className={styles.Ellipse1}/>
			<img src={Ellipse2} className={styles.Ellipse2}/>

			<div className={styles.signup_form_container}>				
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Enter a username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						{/* <input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/> */}
						<input
							type="email"
							placeholder="Enter your email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Enter your password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Enter your confirm password"
							name="confrim_password"
							onChange={handleChange}
							value={data.confrim_password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.loginButton}>Sign Up</button>
						<p className={styles.registerText}>
							Already have an account? <Link to="/login" className={styles.loginLink}>Login</Link>
						</p>
					</form>
				</div>
			</div>
			<img src={Group2} className={styles.Group2} />
		</div>
	);
};

export default Signup;
