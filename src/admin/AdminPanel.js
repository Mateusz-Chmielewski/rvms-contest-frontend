import React, { useEffect, useState } from "react";
import { apiUrl, apiHeader } from "./../settings";
import { Row, Col, Button, Form } from "react-bootstrap";
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

  const addNew = (event) => {
    const form = event.target;
    const sensor = {
      ipAddress: form.ipAddress.value,
      roomName: form.roomName.value,
      isActive: form.isActive.checked,
    };

    fetch(`${apiUrl}/sensor`, {
      method: "POST",
      headers: apiHeader,
      body: JSON.stringify(sensor),
    });
  };

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
      <Form className="p-2 mt-5" onSubmit={addNew}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Adres IP</Form.Label>
            <Form.Control
              name="ipAddress"
              type="text"
              placeholder="127.0.0.1"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Opis</Form.Label>
            <Form.Control name="roomName" type="text" placeholder="Sala 1" />
          </Form.Group>
          <Col xs="auto">
            <Form.Label>Aktywny</Form.Label>
            <Form.Check name="isActive" type="switch" />
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Button type="submit" variant="success">
              Dodaj
            </Button>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Button type="reset" variant="secondary">
              Anuluj
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AdminPanel;
