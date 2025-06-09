import axios from "../Setup/axios";

const reqCheckJWT = async () => {
    return await axios.get("api/checkJWT");
}

const createUser = async (email, username, phone, password) => {
    return await axios.post("api/signup", { email, username, phone, password });
}
const loginUser = async (email, password) => {
    return await axios.post("api/login", { email, password });
}
const readUsers = async () => {
    return await axios.get("api/users");
}
const readUsersWithPage = async (page) => {
    return await axios.get(`api/userspage?page=${page}`);
}

const deleteUserWithId = async (user) => {
    return await axios.delete('api/user/delete', { data: user });
}

const createFullUser = async (dataUserFull) => {
    return await axios.post("api/user/createFullUser", { dataUserFull });
}

const editUserWithId = (data) => {
    return axios.put("api/user/update", { data });
}

const readRoles = () => {
    return axios.get("api/users/roles");
}

export {
    reqCheckJWT,
    createUser, loginUser, readUsers, readUsersWithPage, createFullUser, editUserWithId, deleteUserWithId, readRoles
}