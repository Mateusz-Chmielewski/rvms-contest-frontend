import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";

function AdminPage() {
	const [loginToken, setLoginToken] = useState(Cookies.get("loginToken"));

	return <div>{loginToken ? "OK" : <LoginForm setLoginToken />}</div>;
}

export default AdminPage;
