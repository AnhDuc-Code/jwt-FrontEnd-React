import React from "react";
import Child from "./ChildComponent"
class MyComponent extends React.Component {
    render() {
        return (
            <Child name={'Đức'} age={21} />


        )
    }

}
export default MyComponent;