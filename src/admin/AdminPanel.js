import React, { useEffect, useState } from "react";
import { apiUrl, apiHeader } from "./../settings";
import { Row, Col, Button } from "react-bootstrap";
import SensorForm from "./SensorForm";

function AdminPanel() {
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
		<div className="py-3">
			<Button variant="danger">Wyloguj się</Button>
			<Row className="py-2">
				{sensors.map((sensor) => (
					<Col key={sensor.id} xs="12">
						<SensorForm key={sensor.id} {...sensor} />
					</Col>
				))}
			</Row>
			<Button variant="primary">Dodaj nowy</Button>
		</div>
	);
}

export default AdminPanel;
