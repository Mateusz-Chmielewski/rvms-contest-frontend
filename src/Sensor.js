import React, { useState, useEffect } from "react";
import { validateData } from "./functions/validateData";
import { refreshTime, readingsInterval, apiUrl, apiHeader } from "./settings";
import { Row, Col } from "react-bootstrap";
import "./Sensor.css";
import { Line } from "react-chartjs-2";

function Sensor(props) {
	const [air, setAir] = useState({
		class: "air-error",
		quality: "Nie aktywny",
		qualityClass: "d-none",
	});
	const { id, roomName, isActive } = props;

	const fetchData = () => {
		fetch(`${apiUrl}/reading/${id}/${readingsInterval}`, {
			method: "GET",
			headers: apiHeader,
		})
			.then((response) => response.json())
			.then((data) => {
				setAir(validateData(data, isActive));
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
			<Row className="mt-2">
				<Col>
					<Line
						data={{
							labels: air.labels,
							datasets: [
								{
									label: "ppm CO2",
									data: air.data,
									borderColor: "rgb(255, 99, 132)",
									backgroundColor: "rgba(255, 99, 132, 0.5)",
								},
							],
						}}
						options={{
							plugins: { legend: { display: false } },
							scales: {
								yAxes: {
									type: "linear",
									suggestedMin: 0,
									suggestedMax: 2000,
								},
							},
						}}
					/>
				</Col>
			</Row>
		</div>
	);
}

export default Sensor;
