import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import AdminPanel from "./AdminPanel";

function AdminPage() {
	const [loginToken, setLoginToken] = useState(Cookies.get("loginToken"));

	return <div>{loginToken ? <AdminPanel /> : <LoginForm />}</div>;
}

export default AdminPage;
