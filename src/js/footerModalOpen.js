const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  bodyScroll: document.querySelector('body'),
  overlay: document.querySelector('.overlay'),
  list: document.querySelector('.team'),
};

refs.openModalBtn.addEventListener('click', openModal);

const array = [...refs.list.children];

function openModal() {
  refs.modal.classList.remove('footer__backdrop--hidden');
  refs.bodyScroll.classList.add('is-open');
  document.addEventListener('keydown', eventKeydown);

  setTimeout(hideOverlay, 1000);
  setTimeout(toggleBackground, 3000);
  refs.closeModalBtn.addEventListener('click', closeModal);
  array.reduce((acc, item) => {
    acc += 250;
    setTimeout(() => (item.style.opacity = '1'), acc + 250);
    setTimeout(() => item.classList.remove('big'), (acc += 250));
    return acc;
  }, 1000);
}

function closeModal() {
  refs.modal.classList.add('footer__backdrop--hidden');
  refs.bodyScroll.classList.remove('is-open');
  refs.modal.classList.remove('modal-bg');

  setTimeout(showOverlay, 1000);
  setTimeout(() => {
    array.map(item => {
      item.classList.add('big');
      item.style.opacity = '0';
    });
  }, 1000);

  refs.closeModalBtn.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', eventKeydown);
}

function eventKeydown(event) {
  console.log(event.code);
  if (event.code === 'Escape') {
    closeModal();
  }
  return;
}

function hideOverlay() {
  refs.overlay.style.opacity = '0';
}

function showOverlay() {
  refs.overlay.style.opacity = '1';
}

function toggleBackground() {
  refs.modal.classList.add('modal-bg');
}
