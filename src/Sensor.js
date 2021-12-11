import React, { useState, useEffect } from "react";
import { refreshTime, apiUrl, apiHeader } from "./settings";
import { Row, Col } from "react-bootstrap";
import "./Sensor.css";

function Sensor(props) {
	const [readings, setReadings] = useState([]);
	const [air, setAir] = useState({
		class: "air-error",
		quality: "Nie aktywny",
		qualityClass: "d-none",
	});
	const { id, roomName, isActive } = props;

	const fetchData = () => {
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
	};

	useEffect(() => {
		let tempAir = {};

		if (!isActive) {
			tempAir = {
				class: "air-error",
				quality: "Nie aktywny",
				qualityClass: "d-none",
			};
		} else if (
			readings.length < 1 ||
			readings[readings.length - 1].quality === 0
		) {
			tempAir = {
				class: "air-error",
				quality: "Brak odczytu",
				qualityClass: "d-none",
			};
		} else {
			tempAir = {
				class: "air-ok",
				quality: readings[readings.length - 1].quality,
				temperature: readings[readings.length - 1].temperature,
			};

			if (readings[readings.length - 1].quality > 1000) {
				tempAir.class = "air-danger";
			} else if (readings[readings.length - 1].quality > 400) {
				tempAir.class = "air-warn";
			}
		}

		setAir(tempAir);
	}, [readings]);

	useEffect(() => {
		fetchData();

		setInterval(fetchData, refreshTime * 6 * 1000);
	}, [id]);

	return (
		<div className="sensor">
			<Row>
				<Col className="name">
					<h3>{roomName}</h3>
				</Col>
				<Col>
					{air.temperature}
					<span className={air.qualityClass}>&deg;C</span>
				</Col>
				<Col>
					<div className={air.class}>
						{air.quality}
						<span className={air.qualityClass}>
							ppm CO<sub>2</sub>
						</span>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Sensor;
