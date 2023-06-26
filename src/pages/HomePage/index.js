import { Link } from "react-router-dom";

import { OutlineButton } from "../../components/Button/Button";
import HeroSlide from "../../components/HeroSilde/HeroSlide";
import { category, movieType, tvType } from "../../api/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import "./HomePage.scss";
function HomePage() {
    return (
        <>
            <HeroSlide />
            <div className="container">
                <section className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">
                                View More
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        type={movieType.popular}
                        categoryProps={category.movie}
                    ></MovieList>
                </section>
                <section className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        type={movieType.top_rated}
                        categoryProps={category.movie}
                    ></MovieList>
                </section>
                <section className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Tv Series</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        type={tvType.popular}
                        categoryProps={category.tv}
                    ></MovieList>
                </section>
                <section className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>On The Air Tv</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        type={tvType.on_the_air}
                        categoryProps={category.tv}
                    ></MovieList>
                </section>
            </div>
        </>
    );
}

export default HomePage;
