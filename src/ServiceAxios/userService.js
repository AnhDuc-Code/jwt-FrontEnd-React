import axios from "axios";
const createUser = async (email, username, phone, password) => {
    return await axios.post("http://localhost:9000/api/signup", { email, username, phone, password });
}
const loginUser = async (email, password) => {
    return await axios.post("http://localhost:9000/api/login", { email, password });
}
const readUsers = async () => {
    return await axios.get("http://localhost:9000/api/users");
}
const readUsersWithPage = async (page) => {
    return await axios.get(`http://localhost:9000/api/userspage?page=${page}`);
}
export {
    createUser, loginUser, readUsers, readUsersWithPage
}