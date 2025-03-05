import { useEffect, useState } from "react";
import Product from "../Products/Product";
import { getProducts } from "../../ServiceAxios/homeService";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


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
            <div className="searchBar">
                <InputGroup className="mb-3 mt-3 container">
                    <InputGroup.Text>Search</InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" />

                </InputGroup>
            </div>
            <div className="Homepage_content d-flex container">
                {dataMilks && dataMilks.length > 0 &&
                    dataMilks.map((item) => {
                        console.log(item);
                        return <Product title={item.title} key={item.idProduct} price={item.price} brand={item.brand} />

                    })
                }
            </div>
        </>
    )
}
export default HomePage;