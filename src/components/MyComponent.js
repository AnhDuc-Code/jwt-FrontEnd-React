import React from "react";
import ListUsers from "./ListUsers"
import AddUserInfo from "./AddUserInfo";
import a from "../logo.svg"
import "./ListUsers.scss"
class MyComponent extends React.Component {

    state = {
        listUser: [
            { id: 1, name: 'a', age: 12 },
            { id: 2, name: 'b', age: 13 },
            { id: 3, name: 'c', age: 19 }

        ]
    }

    Handle_AddNewUser = (user) => {
        console.log(user);
        this.setState({
            listUser: [user, ...this.state.listUser]
        })
    }

    Handle_DeleteUser = (id_User) => {
        let listUserNew = [...this.state.listUser];
        listUserNew = listUserNew.filter(item =>
            item.id !== id_User
        )
        this.setState({
            listUser: listUserNew
        })
        alert("delete user: ", id_User)
    }

    render() {

        return (
            <div className="MainComponent">
                <img src={a} />
                <AddUserInfo addUser={this.Handle_AddNewUser} />
                <ListUsers listUser={this.state.listUser} deleteUser={this.Handle_DeleteUser} />
            </div>

        )
    }

}
export default MyComponent;