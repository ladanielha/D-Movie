import { useState, useEffect } from "react";

import HeroSlide from "../components/hero-slide/HeroSlide";

import tmdbApi, { movieType } from "../api/tmdbApi";

const Home = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 4));
        console.log(response);
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <>
      <HeroSlide />
    </>
  );
};

export default Home;
