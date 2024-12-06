import { useNavigate, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';


const Home = (props) => {
    let navigate = useNavigate();
    const handleGetLoginPage = () => {
        navigate("login");
    }
    const handleGetSignupPage = () => {
        navigate("signup");
    }

    const [isAuthen, setIsAuthen] = useState(false);
    useEffect(() => {
        let keySession = sessionStorage.getItem('key');
        let dataKey = JSON.parse(keySession);
        if (dataKey) {
            setIsAuthen(true);
            // window.location.reload();
        }
    }, [])
    return (
        <>


            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">My App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="">
                            <NavLink to="" className='nav-link'>Home</NavLink>
                        </Nav>
                        {isAuthen &&
                            <Nav className="me-auto">
                                <NavLink to="admin" className='nav-link'>Admin</NavLink>
                                <NavLink to="user" className='nav-link'>Users</NavLink>
                            </Nav>
                        }
                        {!isAuthen &&
                            <Nav className="ms-auto">
                                <span>
                                    <button className='btn-login' onClick={() => handleGetLoginPage()}>
                                        Login
                                    </button>
                                    <button className='btn-signup' onClick={() => handleGetSignupPage()}>Signup</button>
                                </span>
                            </Nav>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Home;