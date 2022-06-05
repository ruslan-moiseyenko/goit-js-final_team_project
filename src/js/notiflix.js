import Notiflix from 'notiflix';
const notiflixParams = {
  position: 'center-top',
  timeout: 1500,
  showOnlyTheLastOne: true,
};

class Notification {
  constructor(notiflixParams) {
    this.options = notiflixParams;
  }

  onAddToWatched() {
    Notiflix.Notify.success('Added to Watched', this.options);
  }

  onDeleteWatched() {
    Notiflix.Notify.warning('Deleted from Watched', this.options);
  }

  onAddToQueue() {
    Notiflix.Notify.success('Added to Queue', this.options);
  }

  onDeleteQueue() {
    Notiflix.Notify.warning('Deleted from Queue', this.options);
  }

  onLoadingleAdd() {
    Notiflix.Loading.arrows('Please wait ...', this.options);
  }

  onLoadingRemove() {
    Notiflix.Loading.remove();
  }

  onNoAddedtoWatched() {
    Notiflix.Notify.warning('Oops, you did not add anything to "WATCHED"', this.options);
  }

  onNoAddedtoQueue() {
    Notiflix.Notify.warning('Oops, you did not add anything to "QUEUE"', this.options);
  }

  onNoFilmFound() {
    Notiflix.Notify.failure('Sorry, no movie found :(', this.options);
  }

  onError() {
    Notiflix.Notify.failure('Sorry, something went wrong :(', this.options);
  }
}

export default new Notification(notiflixParams);
