import React, { useEffect, useState } from "react";
import ListUsers from "./ListUsers"
import AddUserInfo from "./AddUserInfo";
import a from "../logo.svg"
import "./ListUsers.scss"

const MyComponent = () => {
    const [listUsers, setListUsers] = useState(
        [
            { id: 1, name: 'a', age: 12 },
            { id: 2, name: 'b', age: 13 },
            { id: 3, name: 'c', age: 19 }

        ]
    );

    const Handle_AddNewUser = (user) => {
        console.log('check MyComponent có gì truyền lên AddUser ', user);
        setListUsers(
            [user, ...listUsers]
        )
    }

    const Handle_DeleteUser = (id_User) => {
        let listUsersNew = [...listUsers];
        listUsersNew = listUsersNew.filter(item =>
            item.id !== id_User
        )
        setListUsers(
            listUsersNew
        )
    }

    useEffect(() => {
        console.log("useEffect as didMount")
    }, []
    )

    useEffect(() => {
        console.log("useEffect as didUpdate")
        if (listUsers.length === 0) {
            alert("Deleted All")
        }
    }, [listUsers]
    )



    return (
        <div className="MainComponent">
            <img src={a} alt="Ảnh a" />
            <AddUserInfo addUser={Handle_AddNewUser} />
            <ListUsers listUsers={listUsers} deleteUser={Handle_DeleteUser} />
        </div>

    )


}
export default MyComponent;