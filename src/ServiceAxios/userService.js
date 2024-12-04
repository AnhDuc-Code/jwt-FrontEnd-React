import axios from "axios";
const createUser = async (email, username, phone, password) => {
    return await axios.post("http://localhost:9000/api/signup", { email, username, phone, password })
}
const loginUser = async (email, password) => {
    return await axios.post("http://localhost:9000/api/login", { email, password })
}
export {
    createUser, loginUser
}