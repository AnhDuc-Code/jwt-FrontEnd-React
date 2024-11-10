import React, { useState } from "react";


const AddUserInfo = (props) => {

    const [id, setId] = useState(1);
    const [name, setName] = useState("Nguyễn A");
    const [age, setAge] = useState(13);
    const Handle_onClick = (event) => {
        event.preventDefault();
        props.addUser({
            id: 101,
            name: setName('Nguyễn Anh Đức'),
            age: setAge(13)
        });
    }

    const Handle_Home = (event) => {
        event.preventDefault();
        props.addUser({
            id: 111,
            name: name,
            age: age
        })
        console.log('check state in AddUserInfo: ', id, name, age);
    }

    const Handle_Input_Name = (event) => {
        setName(event.target.value);
    }
    const Handle_Input_Age = (event) => {
        setAge(event.target.value);
    }
    return (

        <div>
            Tôi tên là {name}, {age} tuổi
            <form>
                <button onClick={Handle_onClick}>BUTTON</button>
            </form>
            <form onSubmit={Handle_Home}>
                <input type="text" onChange={Handle_Input_Name} /><br />
                <input type="text" onChange={Handle_Input_Age} />
                <button type="submit">Submit</button>
            </form>
            <br />
        </div >
    )
}

export default AddUserInfo;