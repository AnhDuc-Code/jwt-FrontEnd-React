import { useEffect, useState } from "react";
import Product from "../Products/Product";
import { getProducts } from "../../ServiceAxios/homeService";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Sidebarr from '../Sidebar/Sidebarr'

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
                <Sidebarr />
                {dataMilks && dataMilks.length > 0 &&
                    dataMilks.map((item) => {
                        console.log(item);
                        return <Product title={item.title} key={item.idProduct} price={item.price} brand={item.brand} />

                    })
                }
            </div>

            <main className="product-list">
                <div className="product-card">
                    <img src="https://via.placeholder.com/120" alt="So Good" />
                    <h4>So Good</h4>
                    <p>Plant-Based Soy Beverage - Original</p>
                    <p className="rating">⭐ 3.9 (289 Ratings)</p>
                    <select>
                        <option>2x1 L - Multipack</option>
                    </select>
                    <p className="price">₹290</p>
                    <button>Add</button>
                </div>

                <div className="product-card">
                    <img src="https://via.placeholder.com/120" alt="Nestle A+" />
                    <h4>Nestle A+</h4>
                    <p>Slim Fat Free Milk</p>
                    <p className="rating">⭐ 5 (1 Rating)</p>
                    <select>
                        <option>1 L - (Pack of 12)</option>
                    </select>
                    <p className="price">₹1140</p>
                    <button>Add</button>
                </div>

                <div className="product-card">
                    <img src="https://via.placeholder.com/120" alt="Purabi" />
                    <h4>Purabi</h4>
                    <p>Standard Milk</p>
                    <p className="rating">⭐ 4.8 (4 Ratings)</p>
                    <select>
                        <option>500 ml - Pouch</option>
                    </select>
                    <p className="price">₹33</p>
                    <button>Add</button>
                </div>
            </main>
        </>
    )
}
export default HomePage;