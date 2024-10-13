import React from "react";
class Child extends React.Component {
    state = {
        name: 'Duc',
        age: 21
    }


    Handle_onClick = (event) => {
        this.setState({
            name: 'Nguyễn Anh Đức'
        });
    }

    Handle_Home = (event) => {
        event.preventDefault();
        console.log('check input ', this.state);
    }

    Handle_Input = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        const { name, age } = this.props;

        return (
            <div>
                Tôi tên là {this.state.name}, {this.state.age} tuổi
                <br />
                Props Tôi tên là {name}, {age} tuổi
                <button onClick={this.Handle_onClick}>BUTTON</button>
                <form onSubmit={this.Handle_Home}>
                    <input type="text" onChange={this.Handle_Input} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
export default Child;