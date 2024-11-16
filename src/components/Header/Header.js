import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Home = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">My App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="" className='nav-link'>Home</NavLink>
                            <NavLink to="admin" className='nav-link'>Admin</NavLink>
                            <NavLink to="user" className='nav-link'>Users</NavLink>
                        </Nav>
                        <Nav>
                            <span>
                                <button className='btn-login'>Login</button>
                                <button className='btn-signup'>Signup</button>
                            </span>
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="">Login</NavDropdown.Item>
                                <NavDropdown.Item href="">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="">Logout</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default Home;