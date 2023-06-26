import { useParams } from "react-router-dom";

import CatalogHeader from "../components/CatalogHeader/CatalogHeader";
import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../components/MovieGrid/MovieGrid";

function Catalog() {
    const { category } = useParams();

    return (
        <div className="catalog">
            <CatalogHeader>
                {cate.movie === category ? "Movies" : "Tv Series"}
            </CatalogHeader>
            <div className="container">
                <MovieGrid categoryProps={category} />
            </div>
        </div>
    );
}

export default Catalog;
