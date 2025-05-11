import axios from "../Setup/axios";

const getProductsService = async () => {
    return await axios.get(`api/products/user`);
}
export {
    getProductsService
}