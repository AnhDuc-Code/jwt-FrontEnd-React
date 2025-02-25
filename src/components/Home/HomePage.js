import { useEffect, useState } from "react";
import Product from "../Products/Product";
import { getProducts } from "../../ServiceAxios/homeService"
const HomePage = () => {
    const [dataMilks, setDataMilks] = useState([]);
    useEffect(() => {
        getPageHome();
    }, []
    )
    const getPageHome = async () => {
        const responseData = await getProducts();
        setDataMilks(responseData.DT.data);

        console.log("check response Homepage: ", responseData.DT.data)
    };

    return (
        <>
            <div className="Homepage_content">
                <Product />
            </div>
        </>
    )
}
export default HomePage;