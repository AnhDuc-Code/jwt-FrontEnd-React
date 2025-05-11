import axios from "../Setup/axios";
const getProducts = async (page) => {
    // return await axios.get(`api/home?page=${page}`); // chưa đúng nên chưa lấy đc dữ liệu
    return await axios.get(`api/home?page=1`);

}
const getProductsFiltered = async (page, filtered) => {
    // return await axios.get(`api/home?page=${page}`);
    return await axios.get(`api/home?page=1&filtered=${filtered}`);

}


export {
    getProducts, getProductsFiltered
}