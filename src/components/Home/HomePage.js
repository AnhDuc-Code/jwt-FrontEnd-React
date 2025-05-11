import { useEffect, useState } from "react";
import Product from "../Products/Product";
import { getProducts } from "../../ServiceAxios/homeService";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Sidebarr from '../Sidebar/Sidebarr'
import { getProductsFiltered } from "../../ServiceAxios/homeService";

import "./HomePage.scss"
const HomePage = () => {
    const [dataMilks, setDataMilks] = useState([]);
    const [theFilterMilk, setTheFilterMilk] = useState();
    useEffect(() => {
        getPageHome();
    }, []
    )
    const getPageHome = async () => {
        let responseData = await getProducts();
        setDataMilks(responseData.DT.data);

        console.log("check response Homepage: ", responseData.DT.data)
    };

    const filterMilk = async (typeMilk) => {
        console.log("check typeMilk before send Request: ", typeMilk);
        let responseData = await getProductsFiltered(1, typeMilk);
        console.log("check response Homepage: ", responseData)
        setDataMilks(responseData.DT.data);
    }

    return (
        <>
            <div className="searchBar">
                <InputGroup className="mb-3 mt-3 container">
                    <InputGroup.Text>Search</InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" />

                </InputGroup>
            </div>
            <div className="Homepage_content d-flex container">
                <Sidebarr filterMilk={filterMilk} />
                <div className="row">

                    {dataMilks && dataMilks.length > 0 &&
                        dataMilks.map((item, index) => {
                            console.log(item, index);

                            return <div className="oneObject col-3" key={item.idProduct}>
                                <Product title={item.title} price={item.price} brand={item.brand} description={item.description} category={item.category} />
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default HomePage;