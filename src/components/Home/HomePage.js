import { useEffect, useState } from "react";
import Product from "../Products/Product";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Sidebarr from '../Sidebar/Sidebarr'
import { getProducts, getProductsFiltered, searchProductsService } from "../../ServiceAxios/homeService";

import "./HomePage.scss"
import { Button } from "react-bootstrap";
const HomePage = () => {
    const [keywordPage, setKeywordPage] = useState("");
    const [keywordAll, setKeywordAll] = useState("");
    const [dataMilks, setDataMilks] = useState([]);
    // const [theFilterMilk, setTheFilterMilk] = useState();

    useEffect(() => {
        getPageHome();
    }, []
    )
    const getPageHome = async () => {
        let responseData = await getProducts();
        setDataMilks(responseData.DT.data);
    };

    const filterMilk = async (typeMilk) => {
        console.log("check typeMilk before send Request: ", typeMilk);
        let responseData = await getProductsFiltered(1, typeMilk);
        setDataMilks(responseData.DT.data);
    }

    const handleSearchPage = (e) => {
        setKeywordPage(e.target.value);
    }

    const filteredProducts = dataMilks.filter((item) =>
        item.title.toLowerCase().includes(keywordPage.toLowerCase())
    );

    const handleSearchAll = (e) => {
        setKeywordAll(e.target.value);
    }
    const searchProducts = async (e) => {
        e.preventDefault();
        let response = await searchProductsService(1, keywordAll);
        setDataMilks(response.DT.data);
    }
    return (
        <>
            <div className="searchBar">
                <Form onSubmit={searchProducts}>
                    <InputGroup className="mb-3 mt-3 container">
                        <InputGroup.Text>Tìm kiếm tất cả</InputGroup.Text>
                        <Form.Control className="searchAll"
                            placeholder="Tên sản phẩm..."
                            value={keywordAll}
                            onChange={handleSearchAll}
                        /><Button type="submit" variant="primary">
                            Tìm kiếm
                        </Button>
                    </InputGroup>
                </Form>
                <InputGroup className="mb-3 mt-3 container">
                    <InputGroup.Text>Tìm nhanh trong trang</InputGroup.Text>
                    <Form.Control className="searchPage"
                        placeholder="Tên sản phẩm..."
                        value={keywordPage}
                        onChange={handleSearchPage}
                    />
                </InputGroup>
            </div>
            <div className="Homepage_content d-flex">
                <Sidebarr filterMilk={filterMilk} />
                <div className="Homepage_content_right">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => {

                            return <div className="oneObject" key={item.idProduct}>
                                <Product idProduct={item.idProduct} image={item.image} title={item.title} price={item.price}
                                    brand={item.brand} description={item.description} category={item.category} quantity={item.quantity} />
                            </div>
                        }
                        )
                    ) : (dataMilks && dataMilks.length > 0 &&
                        dataMilks.map((item, index) => {
                            return <div className="oneObject" key={item.idProduct}>
                                <Product idProduct={item.idProduct} image={item.image} title={item.title} price={item.price}
                                    brand={item.brand} description={item.description} category={item.category} quantity={item.quantity} />
                            </div>
                        })
                    )
                    }
                </div>
            </div>
        </>
    )
}
export default HomePage;