import React from "react";
import { Button, Form } from "react-bootstrap";
import "./LoginForm.css";

function LoginForm() {
	const handleSubmit = (event) => {
		alert(event.target);
		event.preventDefault();
	};

	return (
		<div className="form-container">
			<h1>Logowanie do panelu administracyjnego</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mt-4">
					<Form.Label>Login</Form.Label>
					<Form.Control type="text" placeholder="Login" />
				</Form.Group>
				<Form.Group className="mt-2">
					<Form.Label>Hasło</Form.Label>
					<Form.Control type="password" placeholder="Hasło" />
				</Form.Group>
				<Button className="mt-3" type="submit" variant="primary">
					Zaloguj się
				</Button>
			</Form>
		</div>
	);
}

export default LoginForm;
