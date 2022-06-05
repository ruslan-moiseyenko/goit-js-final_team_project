import renderFilmCard from './renderFilmCard';
import notiflix from './notiflix';
import nothingAddedmarkup from './nothing-addedMarkup';

const refs = {
  watchedBtn: document.querySelector('.library-button--watched'),
  queueBtn: document.querySelector('.library-button--queue'),
  container: document.querySelector('.movies'),
  slider: document.querySelector('.slider'),
};

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);

const options = {
  root: refs.container,
  poster_size: 'w342',
  base_url: 'https://image.tmdb.org/t/p/',
  genresList: '',
  movie: '',
};

document.addEventListener('click', dynamicLibraryMarkup);

export function onWatchedBtnClick() {
  clearContainer();
  watchedBtnToggle();

  const watchedFilms = JSON.parse(localStorage.getItem('Watched'));

  if (watchedFilms === null || watchedFilms.length === 0) {
    appendNothingAddedmarkup();
  } else if (watchedFilms !== null) {
    watchedFilms.forEach(film => {
      options.genresList = film.genres.map(genre => genre.name);
      options.movie = film;

      renderFilmCard(options);
    });
  }
}

function onQueueBtnClick() {
  clearContainer();
  queueBtnToggle();

  const queueFilms = JSON.parse(localStorage.getItem('Queue'));
  if (queueFilms === null || queueFilms.length === 0) {
    return appendNothingAddedmarkup();
  } else {
    queueFilms.forEach(film => {
      options.genresList = film.genres.map(genre => genre.name);
      options.movie = film;

      renderFilmCard(options);
    });
  }
}

function dynamicLibraryMarkup(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  //Проверяем если открыта вкладка Watched, динамически меняем разметку в этой вкладке при удалении фильма
  if (
    (refs.watchedBtn.classList.contains('active-library-button') &&
      e.target.innerText === 'ADD TO WATCHED') ||
    (refs.watchedBtn.classList.contains('active-library-button') &&
      e.target.innerText === 'DELETE FROM WATCHED')
  ) {
    onWatchedBtnClick();
  }
  //Проверяем если открыта вкладка Queue, динамически меняем разметку в этой вкладке при удалении фильма
  if (
    (refs.queueBtn.classList.contains('active-library-button') &&
      e.target.innerText === 'ADD TO QUEUE') ||
    (refs.queueBtn.classList.contains('active-library-button') &&
      e.target.innerText === 'DELETE FROM QUEUE')
  ) {
    onQueueBtnClick();
  }
}

function queueBtnToggle() {
  refs.watchedBtn.classList.remove('active-library-button');
  refs.queueBtn.classList.add('active-library-button');
}

function watchedBtnToggle() {
  refs.watchedBtn.classList.add('active-library-button');
  refs.queueBtn.classList.remove('active-library-button');
}

export function queueBtnToggleOff() {
  refs.queueBtn.classList.remove('active-library-button');
}

export function watchedBtnToggleOff() {
  refs.watchedBtn.classList.remove('active-library-button');
}

function appendNothingAddedmarkup() {
  refs.container.innerHTML = nothingAddedmarkup();
}

function clearContainer() {
  options.root.innerHTML = '';
}
