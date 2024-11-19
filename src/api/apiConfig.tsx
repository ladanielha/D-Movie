interface ApiConfig {
    baseUrl: string;
    apiKey: string;
    originalImage: (imgPath: string) => string;
    w500Image: (imgPath: string) => string;
}

const apiConfig: ApiConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'fc30a6ec48c0019965f759383f8dbba7',
    originalImage: (imgPath: string): string => {
        if (!imgPath) {
            throw new Error("Image path is required");
        }
        return `https://image.tmdb.org/t/p/original/${imgPath}`;
    },
    w500Image: (imgPath: string): string => {
        if (!imgPath) {
            throw new Error("Image path is required");
        }
        return `https://image.tmdb.org/t/p/w500/${imgPath}`;
    },
};

export default apiConfig;