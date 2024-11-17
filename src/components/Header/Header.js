import { useNavigate, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Home = () => {
    let navigate = useNavigate();
    const handleGetLoginPage = () => {
        navigate("login");
    }
    const handleGetSignupPage = () => {
        navigate("signup");
    }
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
                                <button className='btn-login' onClick={() => handleGetLoginPage()}>
                                    Login
                                </button>
                                <button className='btn-signup' onClick={() => handleGetSignupPage()}>Signup</button>
                            </span>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default Home;