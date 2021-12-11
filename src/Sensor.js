import React, { useState, useEffect } from "react";
import { refreshTime, apiUrl, apiHeader } from "./settings";
import { Row, Col } from "react-bootstrap";
import "./Sensor.css";

function Sensor(props) {
	// const [readings, setReadings] = useState([]);
	const [air, setAir] = useState({
		class: "air-error",
		quality: "Nie aktywny",
		qualityClass: "d-none",
	});
	const { id, roomName, isActive } = props;

	const validateData = (fetchedData) => {
		console.log(fetchedData);
		let tempAir = {};

		if (!isActive) {
			tempAir = {
				class: "air-error",
				quality: "Nie aktywny",
				qualityClass: "d-none",
			};
		} else if (
			fetchedData.length < 1 ||
			fetchedData[fetchedData.length - 1].quality === 0
		) {
			tempAir = {
				class: "air-error",
				quality: "Brak odczytu",
				qualityClass: "d-none",
			};
		} else {
			const qualities = fetchedData.map((read) => read.quality);
			const times = fetchedData.map((read) => read.date);

			tempAir = {
				class: "air-ok",
				quality: fetchedData[fetchedData.length - 1].quality,
				temperature: fetchedData[fetchedData.length - 1].temperature,
				data: qualities,
				columns: times,
			};

			if (fetchedData[fetchedData.length - 1].quality > 1000) {
				tempAir.class = "air-danger";
			} else if (fetchedData[fetchedData.length - 1].quality > 400) {
				tempAir.class = "air-warn";
			}
		}

		setAir(tempAir);
	};

	const fetchData = () => {
		console.log(`${apiUrl}/reading/${id}`);
		fetch(`${apiUrl}/reading/${id}`, {
			method: "GET",
			headers: apiHeader,
		})
			.then((response) => response.json())
			.then((data) => {
				validateData(data);
			});
	};

	useEffect(() => {
		fetchData();

		setInterval(fetchData, refreshTime * 1000);
	}, [id]);

	return (
		<div className="sensor">
			<Row>
				<Col className="name" xs="4">
					<h3>{roomName}</h3>
				</Col>
				<Col className="name" xs="3">
					<div>
						{air.temperature}
						<span className={air.qualityClass}>&deg;C</span>
					</div>
				</Col>
				<Col xs="5">
					<div className={air.class}>
						{air.quality}
						<span className={air.qualityClass}>
							{" "}
							ppm CO<sub>2</sub>
						</span>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Sensor;
