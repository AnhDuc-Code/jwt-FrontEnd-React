import React from "react";
import ListUsers from "./ListUsers"
import AddUserInfo from "./AddUserInfo";
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

    render() {

        return (
            <div>
                <AddUserInfo addUser={this.Handle_AddNewUser} />
                <ListUsers listUser={this.state.listUser} />
            </div>

        )
    }

}
export default MyComponent;