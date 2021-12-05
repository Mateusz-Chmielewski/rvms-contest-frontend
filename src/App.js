import "./App.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "./logo.svg";
import Readings from "./Readings";

function App() {
  return (
    <div className="App">
      <Container className="bg-light">
        <Navbar sticky="top" expand="sm">
          <Navbar.Brand>
            <img src={logo} alt="zsel" height="50" width="50" />
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav>
              <Nav.Link>Odczyty</Nav.Link>
              <Nav.Link>O Projekcie</Nav.Link>
              <Nav.Link>Panel Administracyjny</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Readings />
      </Container>
    </div>
  );
}

export default App;
