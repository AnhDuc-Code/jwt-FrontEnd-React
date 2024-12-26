import { useEffect, useState } from "react";
import { readUsers, readUsersWithPage } from "../../ServiceAxios/userService";
import Pagination from 'react-bootstrap/Pagination';
import "./User.scss"
import Form from 'react-bootstrap/Form';

const User = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    useEffect(() => {
        getUsers();
    }, [currentPage])

    let response;
    let responseData;
    const getUsers = async () => {
        try {
            response = await readUsersWithPage(currentPage);
            console.log("check response", response);
            if (response) {
                responseData = response.data;
                if (+responseData.EC === 0) {
                    setListUsers(responseData.DT.data);
                    console.log("checkTotalPage", responseData.DT.totalPages);
                    setTotalPage(responseData.DT.totalPages);
                }
            }
        } catch (error) {

        }
    }
    // const setPage = (page) => {
    //     setCurrentPage({ page });
    // }

    const changePage = (page) => {
        setCurrentPage(page);
    }
    return (
        <div className="User-container container">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr className="d-flex">
                        <th style={{ flex: 2 }}>Username</th>
                        <th style={{ flex: 3 }}>Email</th>
                        <th style={{ flex: 3 }}>Address</th>
                        <th style={{ flex: 2 }}>Phone</th>
                        <th style={{ flex: 2 }}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 ?
                            <>
                                {listUsers.map((item, index) => {
                                    return (
                                        <tr className="d-flex" key={index}>
                                            <td style={{ flex: 2 }}>{item.username}</td>
                                            <td style={{ flex: 3 }}>{item.email}</td>
                                            <td style={{ flex: 3 }}>{item.address}</td>
                                            <td style={{ flex: 2 }}>{item.phone}</td>
                                            <td style={{ flex: 2 }}>{item.Role ? item.Role.roleName : "null"}</td>
                                        </tr>
                                    )

                                })}
                            </>
                            :
                            <>
                                <tr>
                                    <td>
                                        Không có bản ghi nào
                                    </td>
                                </tr>
                            </>
                    }
                </tbody>

            </table>
            <span className="d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                Trang hiện tại:
                <span>
                    <Form.Select onChange={(event) => changePage(Number(event.target.value))}>
                        {
                            totalPage && Array.from({ length: totalPage }, (index, value) => value + 1).map((value, index) => (

                                <option key={index} value={value} >{value}</option>
                            ))

                        }
                    </Form.Select>
                </span>
            </span>
        </div >
    )
}
export default User;