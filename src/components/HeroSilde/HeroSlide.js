import "./HeroSlide.scss";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper";

import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../Button/Button";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import Modal, { ModalContent } from "../Modal/Modal";
function HeroSlide() {
    const [movieItems, setMovieItems] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const params = {};
            try {
                const response = await tmdbApi.getMoviesList(
                    movieType.popular,
                    { params }
                );
                setMovieItems(response.results.slice(0, 5));
            } catch (err) {
                console.log(err);
            }
        };
        getMovies();
    }, []);

    return (
        <div className="hero-slide mb-3">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
            >
                {movieItems &&
                    movieItems.length > 0 &&
                    movieItems.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            {({ isActive }) => (
                                <HeroSlideItems
                                    data={movie}
                                    className={isActive ? "active" : ""}
                                />
                            )}
                        </SwiperSlide>
                    ))}
            </Swiper>

            {movieItems &&
                movieItems.length > 0 &&
                movieItems.map((item, index) => (
                    <TrailerModal key={index} data={item}></TrailerModal>
                ))}
        </div>
    );
}

function HeroSlideItems({ data, className }) {
    const navigate = useNavigate();
    const setModalActive = async () => {
        const modal = document.querySelector(`#modal__${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            modal
                .querySelector(".modal__content > iframe")
                .setAttribute(
                    "src",
                    `https://www.youtube.com/embed/${videos.results[0].key}`
                );
        } else {
            modal.querySelector(".modal__content").innerHTML = "No Trailer";
        }

        modal.classList.toggle("active");
    };
    const item = data ? data : [];
    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );
    return (
        <div
            className={`hero-slide__item ${className}`}
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="hero-slide__item__wrap container">
                <div className="hero-slide__item__info">
                    <h2 className="title">{item.title}</h2>
                    <p className="overview">{item.overview}</p>
                    <div className="btns">
                        <Button onClick={() => navigate("/movie/" + item.id)}>
                            Watch Now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    );
}

function TrailerModal({ data }) {
    const item = data ? data : [];
    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute("src", "");
    return (
        <Modal id={`modal__${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe
                    ref={iframeRef}
                    width="100%"
                    height="400px"
                    title="Traler"
                    frameborder="0"
                ></iframe>
            </ModalContent>
        </Modal>
    );
}
export default HeroSlide;
