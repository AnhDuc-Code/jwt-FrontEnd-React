import axios from "../Setup/axios";

const getProductsService = async () => {
    return await axios.get(`api/products/user`);
}
const getProductDetailService = async (idProduct) => {
    return await axios.get(`api/product/detail?idProduct=${idProduct}`);
}

const createProduct = async (formCreate) => {
    return await axios.post("api/product", formCreate);
}

const editProduct = async (formUpdate) => {
    return await axios.put("api/product/update", formUpdate);
}

const deleteProductWithId = async (user) => {
    return await axios.delete('api/product/delete', { data: user });
}
export {
    getProductsService, getProductDetailService, createProduct, editProduct, deleteProductWithId
}