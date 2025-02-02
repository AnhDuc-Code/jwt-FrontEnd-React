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

const deleteUserWithId = async (user) => {
    return await axios.delete('http://localhost:9000/api/user/delete', { data: user });
}

const editUserWithId = (id, data) => {
    return axios.put("http://localhost:9000/api/user/update" + id.idUser, data);
}

const readRoles = () => {
    return axios.get("http://localhost:9000/api/users/roles");
}

export {
    createUser, loginUser, readUsers, readUsersWithPage, editUserWithId, deleteUserWithId, readRoles
}