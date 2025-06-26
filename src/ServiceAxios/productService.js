import axios from "../Setup/axios";

const getProductsService = async () => {
    return await axios.get(`api/products/user`);
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
    getProductsService, createProduct, editProduct, deleteProductWithId
}