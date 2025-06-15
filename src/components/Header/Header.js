import { useNavigate, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { reqCheckJWT, logoutService } from '../../ServiceAxios/userService';
import "./Header.scss";

const Home = (props) => {
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();
    const handleGetLoginPage = () => {
        navigate("login");
    }
    const handleGetSignupPage = () => {
        navigate("signup");
    }
    const handleLogout = async () => {
        try {
            await logoutService();
            navigate("login");
        } catch (error) {
            console.log('Error Logout. Lỗi: ', error)
        }
    }

    const [isAuthen, setIsAuthen] = useState(false);
    useEffect(() => {
        checkAuthen();
    }, [])

    const checkAuthen = async () => {
        let response = await reqCheckJWT();
        if (response && +response.EC !== -1) {
            setIsAuthen(true);
        }
    }

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
                                    <NavLink to="cart" className="nav-link"><i className="bi bi-cart4"></i> Giỏ hàng</NavLink>
                                    <div style={{ position: "relative" }}>
                                        <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
                                            {/* <img src={user.avatar || '/avatar-default.png'} alt="avatar" width={32} /> */}
                                            <div className='info-menu bi-person-circle'>
                                                {/* <img src={'/menu.png'} alt="avatar" /> */}
                                            </div>
                                        </div>
                                        {open && (
                                            <div style={{
                                                position: "absolute",
                                                right: 0,
                                                top: "100%",
                                                background: "#fff",
                                                border: "1px solid #eee",
                                                borderRadius: 8,
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                                            }}>
                                                <Nav className='menu' style={{ margin: 0, padding: 8, listStyle: "none" }}>
                                                    <NavLink className={'nav-link bi-person-circle'} to={"/selfInfo"} style={{ padding: 8, cursor: "pointer" }}>  Tài khoản cá nhân</NavLink>
                                                    <NavLink className={'nav-link bi-gear-fill'} to={"/setting"} style={{ padding: 8, cursor: "pointer" }}>  Cài đặt</NavLink>
                                                    <hr />
                                                    <NavLink className={'nav-link bi-receipt-cutoff'} to={"/orderHistory"} style={{ padding: 8, cursor: "pointer" }}>  Lịch sử đơn hàng</NavLink>
                                                    <hr />
                                                    <li className='nav-link bi-box-arrow-right' onClick={() => handleLogout()} style={{ padding: 8, color: "red", cursor: "pointer" }}>  Đăng xuất</li>
                                                </Nav>
                                            </div>
                                        )}
                                    </div>
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