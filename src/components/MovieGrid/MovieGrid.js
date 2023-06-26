import "./MovieGrid.scss";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import tmdbApi, { tvType, movieType, category } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../Button/Button";
import Input from "../Input/Input";
import MovieCard from "../MovieCard/MovieCard";

function MovieGrid({ categoryProps }) {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (categoryProps) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(
                            movieType.now_playing,
                            { params }
                        );
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {
                            params,
                        });
                }
            } else {
                const params = { query: keyword };
                response = await tmdbApi.search(categoryProps, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        };

        getList();
    }, [categoryProps, keyword]);
    const loadMore = async () => {
        let response = null;

        if (keyword === undefined) {
            const params = {
                page: page + 1,
            };
            switch (categoryProps) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(
                        movieType.now_playing,
                        {
                            params,
                        }
                    );
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {
                        params,
                    });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            response = await tmdbApi.search(categoryProps, { params });
        }

        setItems([...items, ...response.results]);
        setPage(page + 1);
    };
    return (
        <div className="section mb-3">
            <div className=" mb-3">
                <MovieSearch
                    categoryProps={categoryProps}
                    keyWord={keyword}
                ></MovieSearch>
            </div>
            <div className=" movie-grid">
                {items.map((item, index) => (
                    <MovieCard
                        key={index}
                        data={item}
                        categoryProps={categoryProps}
                    ></MovieCard>
                ))}
            </div>
            {page < totalPage && (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            )}
        </div>
    );
}

export function MovieSearch({ keyWord, categoryProps }) {
    const [keyword, setKeyword] = useState(keyWord);

    const navigate = useNavigate();

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`/${category[categoryProps]}/search/${keyword}`);
        }
    }, [keyword, navigate, categoryProps]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        window.addEventListener("keyup", enterEvent);
        return () => {
            window.removeEventListener("keyup", enterEvent);
        };
    }, [goToSearch, keyword]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
}

export default MovieGrid;
