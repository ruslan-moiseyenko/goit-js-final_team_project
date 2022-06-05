import axios from 'axios';

const slider = document.querySelector('.slider');
const sliders = document.querySelector('.carouselbox');
const left = document.querySelector('.switchleft');
const right = document.querySelector('.switchright');
let scrollPerClick;
let imagePadding = 20;

if (window.innerWidth >= 768) {
  loadSlider();
}

let scrollAmount = 0;

function loadSlider() {
  showMovieData()

  right.addEventListener('click', function sliderScrollRight() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmount += scrollPerClick),
    behavior: 'smooth',
  });
});

left.addEventListener('click', function sliderScrollLeft() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmount -= scrollPerClick),
    behavior: 'smooth',
  });

  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
});
  
}

async function showMovieData() {
  const api_key = '306e564986f0782b8ec4bf227b0f3c28';

  let result = await axios.get(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=' + api_key
  );

  result = result.data.results;

  result.map(function (cur, index) {
    sliders.insertAdjacentHTML(
      'beforeend',
      `<img class="img-${index} slider-img"
      src="https://image.tmdb.org/t/p/w185/${cur.poster_path}"
      alt="${cur.title}" 
      data-id="${cur.id}" />`,
    );
  });

  scrollPerClick = 400;
}

export function showSlider() {
  slider.classList.remove('hidden');
}

export function hideSlider() {
  slider.classList.add('hidden');
}
