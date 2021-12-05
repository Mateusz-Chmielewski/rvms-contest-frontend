import React, { useState, useEffect } from "react";
import { refreshTime, apiUrl, apiHeader } from "./settings";

function Sensor(props) {
	const [readings, setReadings] = useState([]);
	const { id } = props;

	// const fetchData = () => {
	// 	console.log(`${apiUrl}/sensor/${id}`);
	// 	fetch(`${apiUrl}/sensor/${id}`, {
	// 		method: "GET",
	// 		headers: apiHeader,
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setReadings(data);
	// 			// setLoading(false);
	// 		});
	// };

	useEffect(() => {
		console.log(`${apiUrl}/reading/${id}`);
		fetch(`${apiUrl}/reading/${id}`, {
			method: "GET",
			headers: apiHeader,
		})
			.then((response) => response.json())
			.then((data) => {
				setReadings(data);
				console.log(data);
			});

		setInterval(() => {
			console.log(`${apiUrl}/reading/${id}`);
			fetch(`${apiUrl}/reading/${id}`, {
				method: "GET",
				headers: apiHeader,
			})
				.then((response) => response.json())
				.then((data) => {
					setReadings(data);
					console.log(data);
				});
		}, refreshTime * 6 * 1000);
	}, [id]);

	return (
		<div>
			<h5>{props.roomName}</h5>
			{JSON.stringify(readings)}
		</div>
	);
}

export default Sensor;
