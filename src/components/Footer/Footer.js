import "./Footer.scss";
import footerBg from "../../assets/footer-bg.jpg";
import footerLogo from "../../assets/tmovie.png";
function Footer() {
    return (
        <footer
            className="footer"
            style={{ backgroundImage: `url(${footerBg})` }}
        >
            <div className="container footer__wrap">
                <div className="footer__logo">
                    <img src={footerLogo} alt="" />
                    <h2>tMovies</h2>
                </div>
                <div className="footer__content">
                    <div className="footer__content__col">
                        <li>Home</li>
                        <li>Contact us</li>
                        <li>Term of service</li>
                        <li>About us</li>
                    </div>
                    <div className="footer__content__col">
                        <li>Live</li>
                        <li>FAQ</li>
                        <li>Premium</li>
                        <li>Pravacy policy</li>
                    </div>
                    <div className="footer__content__col">
                        <li>You must watch</li>
                        <li>Recent release</li>
                        <li>Top TMDB</li>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
