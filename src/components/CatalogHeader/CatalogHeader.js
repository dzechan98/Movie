import "./CatalogHeader.scss";
import bg from "../../assets/footer-bg.jpg";
function CatalogHeader({ children }) {
    return (
        <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
            <h2>{children}</h2>
        </div>
    );
}

export default CatalogHeader;
