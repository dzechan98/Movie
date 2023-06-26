import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function DefaultLayout({ children }) {
    return (
        <div className="DefaultLayout">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
