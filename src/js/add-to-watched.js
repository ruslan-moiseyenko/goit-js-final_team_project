import createModal from './filmInfoModalCreate';
let dataWatched = [];
export let textBtnWatched;
export let textBtnQueue;
export const KEY_WATCHED = 'Watched';
export const KEY_QUEUE = 'Queue';
const textBtnModal = {
  textAddWatch: 'add to watched',
  textAddQueue: 'add to queue',
  textDelWatch: 'delete from watched',
  textDelQueue: 'delete from queue',
};

export function addToLocalStore(data) {
  const watchedAdd = document.querySelector('.film-info__button--watched');
  watchedAdd.addEventListener('click', () =>
    onClickBtnModal(KEY_WATCHED, textBtnModal.textAddWatch, textBtnModal.textDelWatch, watchedAdd),
  );
  const queueAdd = document.querySelector('.film-info__button--queue');
  queueAdd.addEventListener('click', () =>
    onClickBtnModal(KEY_QUEUE, textBtnModal.textAddQueue, textBtnModal.textDelQueue, queueAdd),
  );
  function onClickBtnModal(KEY, textAdd, textDel, targetAdd) {
    if (localStorage[KEY] !== undefined) {
      dataWatched = JSON.parse(localStorage[KEY]);
    }

    //  перевірка чи є фільм в watched
    const localFilmId = dataWatched.flatMap(dataWatched => dataWatched.id);

    localFilmId.findIndex(e => e === data.id) === -1
      ? (targetAdd.innerText = textDel)
      : (targetAdd.innerText = textAdd);

    if (localFilmId.findIndex(e => e === data.id) === -1) {
      dataWatched.push(data);
      localStorage.setItem(KEY, JSON.stringify(dataWatched));
    } else {
      // delete from localstorage
      dataWatched.splice(
        localFilmId.findIndex(e => e === data.id),
        1,
      );
      localStorage.removeItem(KEY);
      localStorage.setItem(KEY, JSON.stringify(dataWatched));
    }
    dataWatched = [];
  }
}

export function filmCheckLS(data) {
  function readLocalId(KEY, textDel, textAdd) {
    if (localStorage[KEY] !== undefined) {
      dataWatched = JSON.parse(localStorage[KEY]);
      const localFilmId = dataWatched.flatMap(dataWatched => dataWatched.id);
      let result;
      localFilmId.findIndex(e => e === data.id) === -1 ? (result = textAdd) : (result = textDel);
      return result;
    } else {
      textAdd;
      return textAdd;
    }
  }
  textBtnWatched = readLocalId(KEY_WATCHED, textBtnModal.textDelWatch, textBtnModal.textAddWatch);
  textBtnQueue = readLocalId(KEY_QUEUE, textBtnModal.textDelQueue, textBtnModal.textAddQueue);
  return textBtnQueue, textBtnWatched;
}
