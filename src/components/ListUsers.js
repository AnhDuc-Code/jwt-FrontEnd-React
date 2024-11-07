import React from "react";
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
            <div>
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