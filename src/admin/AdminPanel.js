import React, { useEffect, useState } from "react";
import { apiUrl, apiHeader } from "./../settings";
import { Row, Col, Button } from "react-bootstrap";
import SensorForm from "./SensorForm";
import Cookies from "js-cookie";

function AdminPanel() {
	const [sensors, setSensors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [rerender, setRerender] = useState(true);

	const getSensors = () => {
		fetch(`${apiUrl}/sensor`, {
			method: "GET",
			headers: apiHeader,
		})
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				setSensors(data);
			});
	};

	useEffect(getSensors, []);

	if (loading) return <div>Ładowanie danych</div>;

	return (
		<div className="py-3">
			<Button
				variant="danger"
				onClick={() => {
					Cookies.remove("loginToken");
					window.location.reload(false);
				}}
			>
				Wyloguj się
			</Button>
			<Row className="py-2">
				{sensors.map((sensor) => (
					<Col key={sensor.id} xs="12">
						<SensorForm
							key={sensor.id}
							{...sensor}
							rerender={() => {
								getSensors();
								setRerender(true);
							}}
						/>
					</Col>
				))}
			</Row>
			<Button variant="primary">Dodaj nowy</Button>
		</div>
	);
}

export default AdminPanel;
