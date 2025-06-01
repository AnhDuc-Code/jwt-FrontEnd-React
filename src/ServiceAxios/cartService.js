import axios from "../Setup/axios";
const getCartService = async () => {
    // return await axios.get(`api/home?page=${page}`); // chưa đúng nên chưa lấy đc dữ liệu
    return await axios.get(`api/cart`);

}
const getProductsFiltered = async (page, filtered) => {
    // return await axios.get(`api/home?page=${page}`);
    return await axios.get(`api/home?page=1&filtered=${filtered}`);
}
const addToCart = async (data) => {
    return await axios.post(`api/cart/product`, data);
}
const deleteInCart = async (data) => {
    return await axios.delete(`api/cart/delete`, { data: data });
}
export {
    getCartService, addToCart, deleteInCart
}