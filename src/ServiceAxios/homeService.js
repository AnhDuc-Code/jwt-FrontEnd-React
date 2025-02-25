import axios from "../Setup/axios";
const getProducts = async (page) => {
    // return await axios.get(`api/home?page=${page}`);
    return await axios.get(`api/home?page=1`);

}


export {
    getProducts
}