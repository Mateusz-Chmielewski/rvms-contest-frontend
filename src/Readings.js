import React, { useState, useEffect } from "react";
import { apiUrl, apiHeader } from "./settings";

function Readings() {
	const [sensors, setSensors] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`${apiUrl}/sensor`, {
			method: "GET",
			headers: apiHeader,
		})
			.then((response) => response.json())
			.then((data) => {
				setSensors(data);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Ładowanie danych</div>;

	return <div>{JSON.stringify(sensors)}</div>;
}

export default Readings;
