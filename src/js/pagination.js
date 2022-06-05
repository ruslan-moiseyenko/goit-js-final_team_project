import Pagination from 'tui-pagination';
import renderPopFilms from './showMovieGallery';
import { renderNameFilms } from './fetch-by-name';
import { scrollToTop } from './scroll-to-top';

const options = {
  totalItems: 200,
  visiblePages: 5,
  itemsPerPage: 20,
  page: getPage(),
  usageStatistics: false,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const paginationOptions = {
  key: '',
}

const pagination = new Pagination('pagination', options);

export { pagination, paginationOptions }

// внесення номеру сторінки в local Storage

pagination.on('afterMove', onPaginationClick);

export function onPaginationClick(event) {
  const currentPage = event.page;
  const value = paginationOptions.key;
  switch (value) {
    case "popular":
      localStorage.setItem('pagination-page', JSON.stringify(currentPage));
      renderPopFilms();
      break;
    case "search":
      localStorage.setItem('pagination-page-search', JSON.stringify(currentPage));
      renderNameFilms();
      break;
  }
  scrollToTop();
}

export function showPagination() {
  document.querySelector('.pagination_container').classList.remove('hidden');
}

export function hidePagination() {
  document.querySelector('.pagination_container').classList.add('hidden');
}

// забираємо з local Storage номер сторінки
function getPage() {
  const paginationData = localStorage.getItem('pagination-page');
  if (paginationData) {
    const pageFromLS = JSON.parse(paginationData);
    return pageFromLS;
  } else {
    return 1;
  }
}

