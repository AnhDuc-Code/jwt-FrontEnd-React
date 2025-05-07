import "./Sidebarr.scss";
import { getProductsFiltered } from "../../ServiceAxios/homeService";
// import { NavLink } from "react-router-dom";
const milksidebar = (props) => {
    const fiveStar = () => {

    }
    const filterMilk = (typeMilk) => {
        console.log("check typeMilk before send Request: ", typeMilk);
        getProductsFiltered(1, typeMilk);
    }
    return (
        <>
            <aside className="sidebar">
                <h3>LOẠI SỮA</h3>
                <nav className="category-list">
                    <span className="powderMilk" onClick={() => { filterMilk("powderMilk"); }}>Sữa Bột</span>
                    <span className="liquidMilk" onClick={() => { filterMilk("liquidMilk"); }}>Sữa Hộp Tươi</span>
                    <span className="qualityMilk" onClick={() => { filterMilk("qualityMilk"); }}>Sữa Dinh Dưỡng Cao</span>
                    <span className="candyMilk" onClick={() => { filterMilk("candyMilk"); }}>Bánh/Kẹo Sữa</span>
                </nav>

                <h3>ĐÁNH GIÁ</h3>
                <nav className="filter-rating">
                    <span onClick={() => fiveStar()}>★★★★★</span>
                    <span >★★★★☆</span>
                    <span >★★★☆☆</span>
                    <span >★★☆☆☆</span>
                </nav>
            </aside>
        </>
    )
}
export default milksidebar;