import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";

function AdminPage() {
	const [loginToken, setLoginToken] = useState(Cookies.get("loginToken"));
	const [formContent, setFormContent] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return <div>{loginToken ? "OK" : <LoginForm />}</div>;
}

export default AdminPage;
