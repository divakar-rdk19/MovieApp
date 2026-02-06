export const TMDB_CONFIG ={
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async({query}: {query:string}) => {
    const endpoint = query? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}/movie/popular?language=en-US&page=1`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    });

    if(!response.ok){
        throw new Error(`Failed to fetch Movies: ${response.statusText} (Status: ${response.status})`);
    }
    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async(movieId: string) : Promise<MovieDetails> => {
    try
    {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method: 'GET',
            headers: TMDB_CONFIG.headers
        });
        if(!response.ok){
            throw new Error(`Failed to fetch Movie Details: ${response.statusText} (Status: ${response.status})`)
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
// const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTE4YWY3YzNlYTI3YzljMGFhYjk0Njc2OWEyNzUxNiIsIm5iZiI6MTc2ODEzNjMzMy42NjcsInN1YiI6IjY5NjM5ZThkZWIwMzUyN2I1NzFkOGVmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H5sptEZIti_bWP13pm7wisQB9MKckX2aq6wyDnHmgs0'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));