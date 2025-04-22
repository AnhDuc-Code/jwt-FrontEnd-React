import "./Sidebarr.scss";
// import { NavLink } from "react-router-dom";
const milksidebar = (props) => {
    const fiveStar = () => {

    }
    return (
        <>
            <aside className="sidebar">
                <h3>LOẠI SỮA</h3>
                <nav className="category-list">
                    <span className="powderMilk">Sữa Bột</span>
                    <span className="liquidMilk">Sữa Hộp Tươi</span>
                    <span className="qualityMilk">Sữa Dinh Dưỡng Cao</span>
                    <span className="candyMilk">Bánh/Kẹo Sữa</span>
                    <span >★★★★☆</span>
                    <span className="D">D</span>
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