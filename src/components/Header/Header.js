import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logoHeader from "../../assets/tmovie.png";
import "./Header.scss";
function Header() {
    useEffect(() => {
        const shrinkHeader = () => {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        };

        window.addEventListener("scroll", shrinkHeader);
        return () => window.removeEventListener("scroll", shrinkHeader);
    }, []);

    const headerRef = useRef("");
    return (
        <header className="header" ref={headerRef}>
            <div className="container header__wrap">
                <div className="header__logo">
                    <img src={logoHeader} alt="" />
                    <Link to="/">tMovies</Link>
                </div>
                <div className="header__nav">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/movie"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Movies
                    </NavLink>
                    <NavLink
                        to="/tv"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        TV Series
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;
