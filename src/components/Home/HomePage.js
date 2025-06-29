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
    const [typeMilk, setTypeMilk] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const [action, setAction] = useState("HOME");
    useEffect(() => {
        setPage(1);
    }, [action])

    useEffect(() => {
        getPageHome();
    }, [page & action === "HOME"])

    useEffect(() => {
        getFilterMilk();
    }, [page & action === "FILTER", typeMilk])

    const getPageHome = async () => {
        if (action === "HOME") {
            setAction("HOME");
            let responseData = await getProducts(page);
            setDataMilks(responseData.DT.data);
            setTotalPage(responseData.DT.totalPages);
        }
    };

    const setFilterMilk = async (filterMilk) => {
        setAction("FILTER");
        setTypeMilk(filterMilk);
    }

    const getFilterMilk = async () => {
        if (action === "FILTER") {
            let responseData = await getProductsFiltered(page, typeMilk);
            setDataMilks(responseData.DT.data);
            setTotalPage(responseData.DT.totalPages);
        }
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
        let response = await searchProductsService(page, keywordAll);
        setDataMilks(response.DT.data);
        setTotalPage(response.DT.totalPages);
    }
    return (
        <>
            <div className="searchBar">
                <Form onSubmit={(e) => { setAction("SEARCH"); searchProducts(e) }}>
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
                <p className="alert-search container">{filteredProducts.length === 0 && keywordPage.length > 0 && "🚨Không có sản phẩm tìm nhanh"}</p>
            </div >
            <div className="Homepage_content d-flex">
                <Sidebarr setFilterMilk={setFilterMilk} />
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
                    <span className="d-flex" style={{ justifyContent: 'center', alignItems: 'center', flex: '0 0 100%' }}>
                        Trang hiện tại:
                        <span>
                            <Form.Select onChange={(event) => setPage(Number(event.target.value))}>
                                {
                                    totalPage && Array.from({ length: totalPage }, (index, value) => value + 1).map((value, index) => (
                                        <option key={index} value={value} >{value}</option>
                                    ))
                                }
                            </Form.Select>
                        </span>
                    </span>
                </div>
            </div>
        </>
    )
}
export default HomePage;