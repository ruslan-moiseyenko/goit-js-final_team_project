const checkbox = document.getElementById('checkbox');

const body = document.querySelector('body');
const footer = document.querySelector('footer');
const footerText = document.querySelector('.footer_text');
const filmInfo = document.querySelector('.film-info__overlay');
const switcher = document.querySelector('.switcher');

checkbox.addEventListener('change', onDarkTheme);

function onDarkTheme() {
  body.classList.toggle('dark');
  footer.classList.toggle('dark');
  footerText.classList.toggle('dark');
  filmInfo.classList.toggle('dark-modal');

  if (localStorage.getItem('theme') === 'light') {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

export function showSwitcher() {
  switcher.classList.remove('visually-hidden');
}

export function hideSwitcher() {
  switcher.classList.add('visually-hidden');
}

export function checkTheme() {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === null) {
    localStorage.setItem('theme', 'light');
    return;
  } 

  if (currentTheme === 'light') {
    return;
  } else {
    localStorage.setItem('theme', 'light');
    onDarkTheme();
    checkbox.checked = true;
  }
}