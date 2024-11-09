import React from "react";
import "./ListUsers.scss";
class ListUsers extends React.Component {
    state = {
        isShow: true
    }


    Handle_ShowHide = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        // const { listUser } = this.props;
        const listUser = this.props.listUser;
        return (
            <div className={"listUsers"}>
                <div>
                    <button onClick={() => { this.Handle_ShowHide() }}>
                        {this.state.isShow ? "Ẩn thông tin" : "Hiện thông tin"}
                    </button>
                </div>
                {this.state.isShow &&
                    <div>
                        {listUser.map((item) => {
                            return (
                                <div key={item.id} className={+item.age > 18 ? 'green' : 'red'}>
                                    Props động Tên tôi là {item.name}, tuổi {item.age}
                                    <button onClick={() => { this.props.deleteUser(item.id) }}>Delete</button>
                                    <hr />
                                </div>
                            )
                        })}
                    </div >
                }
            </div>
        );
    }
}
export default ListUsers;