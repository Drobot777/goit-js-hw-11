import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {createCards} from './api';
import {findImages} from './api';
import {page, perPage} from './api';
import {hidingBtnLoadMore} from './api';
export {nameImages};
export {galleryEl};
export {buttonEl};

const galleryEl = document.querySelector ('.gallery');
const fromEl = document.querySelector ('#search-form');
const buttonEl = document.querySelector ('.load-more');
const inputEl = document.querySelector ('input');
let nameImages = '';
let totalImages = 0;

fromEl.addEventListener ('submit', create);
buttonEl.addEventListener ('click', loadMore);

function create (e) {
  perPage = 0;
  totalImages = 0;
  nameImages = '';
  page = 0;
  galleryEl.innerHTML = '';
  buttonEl.classList.remove ('block');
  e.preventDefault ();
  if ((e.action = inputEl.value === '')) {
    return Notify.failure (
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  nameImages = e.action = inputEl.value;
  findImages ()
    .then (res => {
      if (!res.data.hits.length > 0) {
        Notify.failure (
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        return createCards (res), buttonEl.classList.add (
          'block'
        ), (totalImages = res.data.totalHits);
      }
    })
    .catch (error => {
      Notify.failure (
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function loadMore (e) {
  e.preventDefault ();
  findImages ()
    .then (res => {
      if (!res.data.hits.length > 0) {
        Notify.failure (
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        return createCards (res), hidingBtnLoadMore (totalImages);
      }
    })
    .catch (error => {
      Notify.failure (
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
