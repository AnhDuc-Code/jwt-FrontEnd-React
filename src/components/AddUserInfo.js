import React from "react";
class AddUserInfo extends React.Component {
    state = {
        id: 1,
        name: 'Duc1',
        age: 22
    }
    Handle_onClick = (event) => {
        this.props.addUser({
            id: 10,
            name: 'Nguyễn Anh Đức',
            age: 21
        });
    }

    Handle_Home = (event) => {
        event.preventDefault();
        this.props.addUser({
            id: 11,
            name: this.state.name,
            age: this.state.age
        })
        console.log('check state in AddUserInfo: ', this.state);
    }

    Handle_Input_Name = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    Handle_Input_Age = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    render() {
        return (

            <div>
                Tôi tên là {this.state.name}, {this.state.age} tuổi

                < button onClick={this.Handle_onClick} > BUTTON</button >
                <form onSubmit={this.Handle_Home}>
                    <input type="text" onChange={this.Handle_Input_Name} /><br />
                    <input type="text" onChange={this.Handle_Input_Age} />
                    <button>Submit</button>
                </form>
                <br />
            </div >
        )
    }
}
export default AddUserInfo;