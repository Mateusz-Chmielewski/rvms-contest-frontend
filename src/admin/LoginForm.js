import Cookies from "js-cookie";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { apiUrl, apiHeader } from "./../settings";
import "./LoginForm.css";

function LoginForm({ setLoginToken }) {
	const handleSubmit = (event) => {
		const username = event.target.username.value;
		const password = event.target.password.value;
		const user = JSON.stringify({
			username: username,
			password: password,
		});

		fetch(`${apiUrl}/auth/login`, {
			method: "POST",
			headers: apiHeader,
			body: user,
		}).then((response) => {
			Cookies.set("loginToken", response.status == 200 ? user : "", {
				expires: 1 / 12,
			});
		});

		event.preventDefault();
	};

	return (
		<div className="form-container">
			<h1>Logowanie do panelu administracyjnego</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mt-4">
					<Form.Label>Login</Form.Label>
					<Form.Control type="text" placeholder="Login" name="username" />
				</Form.Group>
				<Form.Group className="mt-2">
					<Form.Label>Hasło</Form.Label>
					<Form.Control type="password" placeholder="Hasło" name="password" />
				</Form.Group>
				<Button className="mt-3" type="submit" variant="primary">
					Zaloguj się
				</Button>
			</Form>
		</div>
	);
}

export default LoginForm;
