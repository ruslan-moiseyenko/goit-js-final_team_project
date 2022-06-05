import getData from './getData';
import notiflix from './notiflix';
import { addToLocalStore } from './add-to-watched';
import configuration from './configuration';
import { filmCheckLS } from './add-to-watched';
import { textBtnQueue } from './add-to-watched';
import { textBtnWatched } from './add-to-watched';
const refs = {
  movieContainer: document.querySelector('.movies'),
  modal: document.querySelector('.film-info__overlay'),
  slider: document.querySelector('.carouselbox'),
};

const options = {
  root: null,
  filmId: '',
  key: 'api_key=306e564986f0782b8ec4bf227b0f3c28',
  youtube_key: 'AIzaSyBlWsjf1cMY-jgDvmtH3uyJeieKZjaJ8ck',
  filmInfo: {},
  img_base_url: 'none',
  poster_size: '',
  baseUrl: 'https://api.themoviedb.org/3/movie/',
  filmInfoUrl: '',
  filmTrailerUrl: '',
  configUrl: 'https://api.themoviedb.org/3/configuration?',
};

refs.movieContainer.addEventListener('click', onMovieCardClick);
refs.slider.addEventListener('click', onSliderImageClick)

function onMovieCardClick(e) {
  const movieCard = hasSomeParentTheClass(e.target, 'movie');
  if (!movieCard) {
    return;
  }

  options.root = refs.modal;
  options.filmId = movieCard.dataset.id;
  options.filmInfoUrl = `${options.baseUrl}${options.filmId}?`;
  getFilmInfo();
}

function onSliderImageClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  options.root = refs.modal;
  options.filmId = e.target.dataset.id;
  options.filmInfoUrl = `${options.baseUrl}${options.filmId}?`;
  getFilmInfo();
}

function hasSomeParentTheClass(element, classname) {
  if (element.classList?.contains(classname)) return element;
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

async function getFilmInfo() {
  notiflix.onLoadingleAdd();

  options.img_base_url = configuration.base_url;

  try {
    const { data } = await getData(options.filmInfoUrl + options.key);
    options.filmInfo = data;

    createModal(options);
  } catch (error) {
    notiflix.onError();
    console.error('error is: ', error);
  }

  notiflix.onLoadingRemove();
}

function onCloseButtonClick() {
  window.removeEventListener('keydown', onKeyboardCloseModal);
  options.root.classList.remove('is-open');
  document.body.classList.remove('is-open');
  options.root.innerHTML = '';
}

function onKeyboardCloseModal(e) {
  if (e.code === 'Escape') {
    onCloseButtonClick();
  }
}

function createModal({ filmInfo, img_base_url }) {
  const genres = filmInfo.genres.map(genre => genre.name).join(', ');
  filmCheckLS(filmInfo);

  let src = '';
  if (filmInfo.poster_path) {
    src = `src="${img_base_url}w500${filmInfo.poster_path}"
            srcset="
              ${img_base_url}w500${filmInfo.poster_path}           1x,
              ${img_base_url}w780${filmInfo.poster_path}           2x
            "
            class="film-info__image img"
            alt="${filmInfo.original_title}"`
  } else {
    src = '';
  }

  const modal = `
    <div class="film-info__container">
        <div class="film-info__poster">
          <img
            loading="lazy"
            ${src}
          />
        </div>
        <div class="film-info__text">
          <h2 class="film-info__title">${filmInfo.title}</h2>
          <dl class="film-info__properties list">
            <dt>Vote / Votes</dt>
            <dd>
              <span class="accent">${filmInfo.vote_average}</span>
              <span class="separator">/</span>
              <span class="simple">${filmInfo.vote_count}</span>
            </dd>
            <dt>Popularity</dt>
            <dd>${filmInfo.popularity}</dd>
            <dt>Original Title</dt>
            <dd class="original-title">${filmInfo.original_title}</dd>
            <dt>Genre</dt>
            <dd>${genres}</dd>
          </dl>
          <h3 class="film-info__description-title">About</h3>
          <p class="film-info__description">${filmInfo.overview}</p>
          <div class="film-info__buttons">
            <button class="film-info__button film-info__button--watched film-info__button--accent" aria-label="add to watched">${textBtnWatched}</button>
            <button class="film-info__button film-info__button--queue film-info__button--simple" aria-label="add to queue">${textBtnQueue}</button>
            <button class="film-info__button film-info__button--simple film-info__button--trailer" aria-label="watch trailer">watch the trailer</button>
          </div>
        </div>
        <button type="button" class="modal__close-button"></button>
    </div>
    `;

  options.root.innerHTML = modal;

  onModalCreated();
  addToLocalStore(filmInfo);

  const videoModalOpenBtn = options.root.querySelector('.film-info__button--trailer');
  videoModalOpenBtn.addEventListener('click', onWatchTrailerClick);
}

function onModalCreated() {
  const closeButton = options.root.querySelector('.modal__close-button');
  const modalContainer = options.root;

  options.root.classList.add('is-open');
  document.body.classList.add('is-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  window.addEventListener('keydown', onKeyboardCloseModal);

  if (options.root.classList.contains('dark-modal')) {
    modalContainer.children[0].classList.add('dark');
  }
}

function onWatchTrailerClick() {
  onCloseButtonClick();
  options.filmTrailerUrl = `${options.baseUrl}${options.filmId}/videos?`;
  getTrailer();
}

async function getTrailer() {
  notiflix.onLoadingleAdd();

  try {
    const { data } = await getData(options.filmTrailerUrl + options.key);
    options.filmInfo = data;

    createVideoModal(options);
  } catch (error) {
    notiflix.onError();
    console.error('error is: ', error);
  }

  notiflix.onLoadingRemove();
}


function createVideoModal({ filmInfo }) {
  const modal = `
    <div class="video-modal__container">
        <button type="button" class="modal__close-button"></button>
        <div class='trailer-container'>
        <iframe
        class="player"
        src="https://www.youtube.com/embed/${filmInfo.results[length].key}"
        frameborder="0"
        allowfullscreen>
        </iframe>
        </div>
    </div>
    `;
  
  options.root.innerHTML = modal;
  
  onModalCreated();
}
