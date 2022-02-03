import React from "react";
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function SensorForm(props) {
	const { ipAddress, roomName, isActive } = props;
	const [editable, setEditable] = useState(true);

	return (
		<Form className="p-2">
			<Row>
				<Form.Group as={Col}>
					<Form.Label>Adres IP</Form.Label>
					<Form.Control
						type="text"
						placeholder="127.0.0.1"
						value={ipAddress}
						readOnly={editable}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Sala</Form.Label>
					<Form.Control
						type="text"
						placeholder="Sala 1"
						value={roomName}
						readOnly
					/>
				</Form.Group>
				<Col xs="auto" className="d-flex align-items-center">
					<Button variant="primary">{editable ? "Edytuj" : "Zapisz"}</Button>
				</Col>
				<Col xs="auto" className="d-flex align-items-center">
					<Button variant="danger">Usuń</Button>
				</Col>
				<Col xs="auto">
					<Form.Label>Aktywny</Form.Label>
					<Form.Check type="switch" checked={isActive} />
				</Col>
			</Row>
		</Form>
	);
}

export default SensorForm;
