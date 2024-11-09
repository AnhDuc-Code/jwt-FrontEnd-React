import React, { useState } from "react";
import "./ListUsers.scss";
// class ListUsers extends React.Component {
//     state = {
//         isShow: true
//     }


//     Handle_ShowHide = () => {
//         this.setState({
//             isShow: !this.state.isShow
//         })
//     }

//     render() {
//         // const { listUser } = this.props;
//         const listUser = this.props.listUser;
//         return (
//             <div className={"listUsers"}>
//                 <div>
//                     <button onClick={() => { this.Handle_ShowHide() }}>
//                         {this.state.isShow ? "Ẩn thông tin" : "Hiện thông tin"}
//                     </button>
//                 </div>
//                 {this.state.isShow &&
//                     <div>
//                         {listUser.map((item) => {
//                             return (
//                                 <div key={item.id} className={+item.age > 18 ? 'green' : 'red'}>
//                                     Props động Tên tôi là {item.name}, tuổi {item.age}
//                                     <button onClick={() => { this.props.deleteUser(item.id) }}>Delete</button>
//                                     <hr />
//                                 </div>
//                             )
//                         })}
//                     </div >
//                 }
//             </div>
//         );
//     }
// }



const ListUsers = (props) => {
    const listUser = props.listUser;
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
                    {listUser.map((item) => {
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