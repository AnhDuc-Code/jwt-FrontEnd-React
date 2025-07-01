import axios from "../Setup/axios";
const addToCart = async (data) => {
    return await axios.post(`api/cart/product`, data);
}
const deleteOrderService = async (data) => {
    return await axios.delete(`api/order/delete`, { data: data });
}

const getOrdersService = async (page) => {
    // return await axios.get(`api/home?page=${page}`);
    return await axios.get(`api/order?page=${page}`);
}
const getGuestOrdersService = async (page) => {
    // return await axios.get(`api/home?page=${page}`);
    return await axios.get(`api/order/guest?page=${page}`);
}


export {
    addToCart, getOrdersService, deleteOrderService,
    getGuestOrdersService
}