import React, { useState } from "react";
import "./ListUsers.scss";

const ListUsers = (props) => {
    const listUsers = props.listUsers;
    const [isShowHide, setShowHide] = useState(true);
    const Handle_ShowHide = () => {
        setShowHide(!isShowHide);
    }

    // const { listUser } = this.props;
    return (
        <div className={"listUsers"}>
            <div>
                <button onClick={() => { Handle_ShowHide() }}>
                    {isShowHide ? "Ẩn thông tin" : "Hiện thông tin"}
                </button>
            </div>
            {isShowHide &&
                <div>
                    {listUsers.map((item) => {
                        return (
                            <div key={item.id} className={+item.age > 18 ? 'green' : 'red'}>
                                Props động Tên tôi là {item.name}, tuổi {item.age}
                                <button onClick={() => { props.deleteUser(item.id) }}>Delete</button>
                                <hr />
                            </div>
                        )
                    })}
                </div >
            }
        </div>
    );
}


export default ListUsers;