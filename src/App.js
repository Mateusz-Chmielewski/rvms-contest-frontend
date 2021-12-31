import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "./logo.svg";
import Readings from "./Readings";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Container className="bg-light">
					<Navbar sticky="top" expand="sm" className="bg-light border-bottom">
						<Navbar.Brand>
							<img src={logo} alt="zsel" height="50" width="50" />
						</Navbar.Brand>

						<Navbar.Toggle />

						<Navbar.Collapse>
							<Nav>
								<Nav.Link href="/">Odczyty</Nav.Link>
								<Nav.Link href="/about">O Projekcie</Nav.Link>
								<Nav.Link href="/admin">Panel Administracyjny</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>

					<Routes>
						<Route path="/" element={<Readings />} />
						<Route path="/about" element={<Readings />} />
						<Route path="/admin" element={<Readings />} />
					</Routes>
				</Container>
			</div>
		</BrowserRouter>
	);
}

export default App;
