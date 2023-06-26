import "./CastList.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
function CastList({ id }) {
    const [casts, setCasts] = useState([]);

    const { category } = useParams();

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, id);
            setCasts(res.cast.slice(0, 5));
        };

        getCredits();
    }, [category, id]);
    console.log(casts);
    return (
        <div className="casts">
            {casts.map((item, index) => (
                <div className="casts__item" key={index}>
                    <div
                        className="casts__item__img"
                        style={{
                            backgroundImage: `url(${apiConfig.w500Image(
                                item.profile_path
                            )})`,
                        }}
                    ></div>
                    <p className="casts__item__name">{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CastList;
