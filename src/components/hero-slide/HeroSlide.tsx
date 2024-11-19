import React, { useState, useEffect, useRef } from "react";
import { Autoplay } from "swiper/modules";
import SwiperCore, { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router-dom";

import Button, { OutlineButton } from "../button/Button";
import Modal from "../modal/Modal";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./hero-slide.scss";

interface MovieItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
}

interface HeroSlideItemProps {
  item: MovieItem;
  className: string;
}

interface TrailerModalProps {
  item: MovieItem;
}

const HeroSlide: React.FC = () => {
  const [movieItems, setMovieItems] = useState<MovieItem[]>([]);
  const [previousIndex, setPreviousIndex] = useState<number>(0);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(1, 6));
        console.log(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, []);

  const handleSlideChange = (swiper: SwiperCore) => {
    const currentIndex = swiper.activeIndex;
    const isLeft = currentIndex < previousIndex;
    if (isLeft) {
      console.log("Slide changed to the left");
    }
    setPreviousIndex(currentIndex);
  };

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }: { isActive: boolean }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem: React.FC<HeroSlideItemProps> = ({ item, className }) => {
  const navigate = useNavigate();

  const background = apiConfig.originalImage(
    item.backdrop_path || item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector<HTMLDivElement>(`#modal_${item.id}`);

    if (!modal) return;

    try {
      const videos = await tmdbApi.getVideos(category.movie, item.id);

      if (videos.results.length > 0) {
        const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`;
        const iframe = modal.querySelector<HTMLIFrameElement>(
          ".modal__content > iframe"
        );
        if (iframe) iframe.setAttribute("src", videoSrc);
      } else {
        const content = modal.querySelector<HTMLDivElement>(".modal__content");
        if (content) content.innerHTML = "No trailer";
      }

      modal.classList.add("active");
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate(`/movie/${item.id}`)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
        </div>
      </div>
    </div>
  );
};

const TrailerModal: React.FC<TrailerModalProps> = ({ item }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const onClose = () => {
    if (iframeRef.current) {
      iframeRef.current.setAttribute("src", "");
    }

    const modal = document.querySelector<HTMLDivElement>(`#modal_${item.id}`);

    if (modal) {
      modal.classList.remove("active");
    }
  };

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <div className="modal__content">
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
        <button className="modal__close" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default HeroSlide;
