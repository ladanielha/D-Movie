import axiosClient from "./axiosClient";

export type CategoryType = 'movie' | 'tv';
export const category: Record<CategoryType, string> = {
    movie: 'movie',
    tv: 'tv',
};

export type MovieType = 'upcoming' | 'popular' | 'top_rated';
export const movieType: Record<MovieType, string> = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
};

export type TvType = 'popular' | 'top_rated' | 'on_the_air';
export const tvType: Record<TvType, string> = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
};

interface Params {
    [key: string]: any; // Adjust the type for stricter typing if the params object structure is known.
}

const tmdbApi = {

    getMoviesList: (type: MovieType, params: Params) => {
        const url = `movie/${movieType[type]}`;
        return axiosClient.get(url, { params });
    },

    getTvList: (type: TvType, params: Params) => {
        const url = `tv/${tvType[type]}`;
        return axiosClient.get(url, { params });
    },

    getVideos: (cate: CategoryType, id: string | number) => {
        const url = `${category[cate]}/${id}/videos`;
        return axiosClient.get(url, { params: {} });
    },

    search: (cate: CategoryType, params: Params) => {
        const url = `search/${category[cate]}`;
        return axiosClient.get(url, { params });
    },

    detail: (cate: CategoryType, id: string | number, params: Params) => {
        const url = `${category[cate]}/${id}`;
        return axiosClient.get(url, { params });
    },

    credits: (cate: CategoryType, id: string | number) => {
        const url = `${category[cate]}/${id}/credits`;
        return axiosClient.get(url, { params: {} });
    },

    similar: (cate: CategoryType, id: string | number) => {
        const url = `${category[cate]}/${id}/similar`;
        return axiosClient.get(url, { params: {} });
    },
    
};

export default tmdbApi;
