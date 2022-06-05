const refs = {
  logo: document.querySelector('.logo'),
  navItems: document.querySelector('.nav__list'),
  header: document.querySelector('[data-action="header"]'),
  container: document.querySelector('[data-action="container"]'),
  buttons: document.querySelector('[data-action="library-buttons"]'),
  input: document.querySelector('[data-action="search-field"]'),
};

export function changeToLibraryHeaderMarkup() {
  //Подчеркивание елемента
  refs.navItems.lastElementChild.classList.add('nav__item--current');
  refs.navItems.firstElementChild.classList.remove('nav__item--current');
  //Задний фон
  refs.header.classList.remove('header-home');
  refs.header.classList.add('library-header');
  //Рендерим кнопки
  refs.buttons.classList.remove('visually-hidden');
  //Прячем поисковой инпут
  refs.input.classList.add('visually-hidden');
  //
}

export function changeToHomeHeaderMarkup() {
  refs.navItems.firstElementChild.classList.add('nav__item--current');
  refs.navItems.lastElementChild.classList.remove('nav__item--current');
  //Задний фон
  refs.header.classList.remove('library-header');
  refs.header.classList.add('header-home');
  //Прячем кнопки
  refs.buttons.classList.add('visually-hidden');
  //Рендерим поисковой инпут
  refs.input.classList.remove('visually-hidden');
  //Снимаем разметку нажатия с кнопки Queue в библиотеке при переходе на страничку home
}
