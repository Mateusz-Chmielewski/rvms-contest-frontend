import React from "react";
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { apiUrl, apiHeader } from "./../settings";

function SensorForm(props) {
	console.log(props);
	const { id, ipAddress, roomName, isActive, rerender } = props;
	const [editable, setEditable] = useState(false);
	const [sensorState, setSensorState] = useState({
		ipAddress: ipAddress,
		roomName: roomName,
	});

	const onInputChange = (event) => {
		setSensorState({ ...sensorState, [event.target.name]: event.target.value });
	};

	const edit = () => {
		setEditable(true);
	};

	const cancel = () => {
		setEditable(false);
		setSensorState({
			ipAddress: ipAddress,
			roomName: roomName,
		});
	};

	const deleteSensor = () => {
		if (!window.confirm("Czy na pewno chcesz usunąć ten czujnik? ")) {
			return;
		}

		fetch(`${apiUrl}/sensor/${id}`, {
			method: "DELETE",
			headers: apiHeader,
			body: JSON.stringify(sensorState),
		}).then((response) => {
			rerender();
		});
	};

	const save = () => {
		fetch(`${apiUrl}/sensor/describe/${id}`, {
			method: "POST",
			headers: apiHeader,
			body: JSON.stringify(sensorState),
		}).then((response) => {
			setEditable(false);
			rerender();
		});
	};

	return (
		<Form className="p-2">
			<Row>
				<Form.Group as={Col}>
					<Form.Label>Adres IP</Form.Label>
					<Form.Control
						name="ipAddress"
						type="text"
						placeholder="127.0.0.1"
						value={sensorState.ipAddress}
						readOnly={!editable}
						onChange={onInputChange}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Opis</Form.Label>
					<Form.Control
						name="roomName"
						type="text"
						placeholder="Sala 1"
						value={sensorState.roomName}
						readOnly={!editable}
						onChange={onInputChange}
					/>
				</Form.Group>
				<Col xs="auto" className="d-flex align-items-center">
					{editable ? (
						<Button variant="success" onClick={save}>
							Zapisz
						</Button>
					) : (
						<Button variant="primary" onClick={edit}>
							Edytuj
						</Button>
					)}
				</Col>
				<Col xs="auto" className="d-flex align-items-center">
					{editable ? (
						<Button variant="secondary" onClick={cancel}>
							Anuluj
						</Button>
					) : (
						<Button variant="danger" onClick={deleteSensor}>
							Usuń
						</Button>
					)}
				</Col>
				<Col xs="auto">
					<Form.Label>Aktywny</Form.Label>
					<Form.Check
						type="switch"
						checked={isActive}
						onChange={() => {
							fetch(`${apiUrl}/sensor/active/${id}`, {
								method: "POST",
								headers: apiHeader,
								body: JSON.stringify({ isActive: !isActive }),
							}).then((response) => {
								rerender();
							});
						}}
					/>
				</Col>
			</Row>
		</Form>
	);
}

export default SensorForm;
