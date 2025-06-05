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
                    <span className="powderMilk" onClick={() => { props.filterMilk("Sữa bột"); }}>Sữa Bột</span>
                    <span className="liquidMilk" onClick={() => { props.filterMilk("Sữa hộp"); }}>Sữa Hộp Tươi</span>
                    <span className="qualityMilk" onClick={() => { props.filterMilk("Sữa dinh dưỡng"); }}>Sữa Dinh Dưỡng Cao</span>
                    <span className="candyMilk" onClick={() => { props.filterMilk("Bánh kẹo sữa"); }}>Bánh/Kẹo Sữa</span>
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