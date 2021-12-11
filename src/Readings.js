import React, { useState, useEffect } from "react";
import { apiUrl, apiHeader } from "./settings";
import { Row, Col } from "react-bootstrap";
import Sensor from "./Sensor";

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
				setLoading(false);
				setSensors(data);
			});
	}, []);

	if (loading) return <div>Ładowanie danych</div>;

	return (
		<div className="py-2">
			<Row>
				{sensors.map((sensor) => (
					<Col key={sensor.id} xs="12" md="6">
						<Sensor key={sensor.id} {...sensor} />
					</Col>
				))}
			</Row>
		</div>
	);
}

export default Readings;
