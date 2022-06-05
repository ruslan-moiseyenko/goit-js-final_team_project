import renderFilmCard from './renderFilmCard';

export default function renderPopularFilmCards(options) {
  const { searchResults, genres } = options;
  const { results } = searchResults;

  results.forEach(movie => {
    const { genre_ids } = movie;
    let genresList = [];
    for (let genre_id in genre_ids) {
      for (let genre in genres) {
        if (genre_ids[genre_id] === genres[genre].id) {
          genresList.push(genres[genre].name);
        }
      }
    }

    const data_options = {
      ...options,
      movie,
      genresList,
    };

    renderFilmCard(data_options);
  });
}
