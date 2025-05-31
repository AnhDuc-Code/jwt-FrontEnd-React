import { useNavigate, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
// import "./Header.scss";

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


            <Navbar expand="lg" className="mynav bg-body-tertiary ">
                <Container className='bodynav' style={{ background: '#FFFFFF' }}>
                    <Navbar.Brand as={NavLink} to="/">My App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        {isAuthen &&
                            <div className="d-flex justify-content-between w-100">
                                {/* Nhóm bên trái */}
                                <Nav className="me-auto">
                                    <NavLink to="" className='nav-link'>Trang Chủ</NavLink>
                                    <NavLink to="admin" className='nav-link'>Admin</NavLink>
                                    <NavLink to="user" className='nav-link'>QL Người dùng</NavLink>
                                    <NavLink to="seller" className='nav-link'>Cửa hàng của bạn</NavLink>
                                </Nav>

                                {/* Giỏ hàng bên phải */}
                                <Nav className='ms-auto me-3'>
                                    <NavLink to="cart" className="nav-link">🛒 Giỏ hàng</NavLink>
                                </Nav>
                            </div>

                        }
                        {!isAuthen &&
                            <Nav className="ms-auto">
                                <span>
                                    <button className='btn-login' onClick={() => handleGetLoginPage()}>
                                        Đăng Nhập
                                    </button>
                                    <button className='btn-signup' onClick={() => handleGetSignupPage()}>Đăng Ký</button>
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