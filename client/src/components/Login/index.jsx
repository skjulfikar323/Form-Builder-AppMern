import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import arrow_back from "../../authImage/arrow_back.png";
import Ellipse1 from "../../authImage/Ellipse1.png";
import Ellipse2 from "../../authImage/Ellipse2.png";
import Group2 from "../../authImage/Group2.png";

// const Login = () => {
// 	const [data, setData] = useState({ email: "", password: "" });
// 	const [error, setError] = useState("");

// 	const handleChange = ({ currentTarget: input }) => {
// 		setData({ ...data, [input.name]: input.value });
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const url = "http://localhost:8080/api/auth";
// 			const { data: res } = await axios.post(url, data);
// 			localStorage.setItem("token", res.data);
// 			window.location = "/";
// 		} catch (error) {
// 			if (
// 				error.response &&
// 				error.response.status >= 400 &&
// 				error.response.status <= 500
// 			) {
// 				setError(error.response.data.message);
// 			}
// 		}
// 	};

// 	return (
// 		<div className={styles.login_container}>
// 			<div className={styles.login_form_container}>
// 				<div className={styles.left}>
// 					<form className={styles.form_container} onSubmit={handleSubmit}>
// 						<h1>Login to Your Account</h1>
// 						<input
// 							type="email"
// 							placeholder="Enter your email"
// 							name="email"
// 							onChange={handleChange}
// 							value={data.email}
// 							required
// 							className={styles.input}
// 						/>
// 						<input
// 							type="password"
// 							placeholder="Enter your password"
// 							name="password"
// 							onChange={handleChange}
// 							value={data.password}
// 							required
// 							className={styles.input}
// 						/>
// 						{error && <div className={styles.error_msg}>{error}</div>}
// 						<button type="submit" className={styles.green_btn}>
// 							Sing In
// 						</button>
// 					</form>
// 				</div>
// 				<div className={styles.right}>
// 					<h1>New Here ?</h1>
// 					<Link to="/signup">
// 						<button type="button" className={styles.white_btn}>
// 							Sing Up
// 						</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };


const Login = ({ onLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  try {
		const response = await fetch('http://localhost:8080/api/auth', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ email, password }),
		});
		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}
		const data = await response.json();
		localStorage.setItem('token', data.token);
		onLogin(data);
	  } catch (error) {
		console.error('Error:', error);
		alert('Login failed: ' + error.message);
	  }
	};
  
	return (
	  <div className={styles.loginContainer}>
		<img src={arrow_back} className={styles.arrow} />
		<img src={Ellipse1} className={styles.Ellipse1}/>
		<img src={Ellipse2} className={styles.Ellipse2}/>
		<form onSubmit={handleSubmit} className={styles.loginForm}>
		  <div className={styles.inputContainer}>
			<label className={styles.label}>Email</label>
			<input
			  type="email"
			  className={styles.input}
			  value={email}
			  onChange={(e) => setEmail(e.target.value)}
			  placeholder="Enter your email"
			  required
			/>
		  </div>
		  <div className={styles.inputContainer}>
			<label className={styles.label}>Password</label>
			<input
			  type="password"
			  className={styles.input}
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			  placeholder="********"
			  required
			/>
		  </div>
		  <button type="submit" className={styles.loginButton}>Log In</button>
		  <p className={styles.registerText}>
			Don't have an account? <Link to="/signup" className={styles.registerLink}>Register now</Link>
		  </p>
		</form>
		<img src={Group2} className={styles.Group2} />
	  </div>
	);
  };
export default Login;
