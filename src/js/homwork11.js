import {Notify} from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {findImages} from './api';

const galleryEl = document.querySelector ('.gallery');
const fromEl = document.querySelector ('#search-form');
const buttonEl = document.querySelector ('.load-more');
const inputEl = document.querySelector ('input');
let nameImages = '';
let page = 0;
let perPage = 40;
fromEl.addEventListener ('submit', create);
buttonEl.addEventListener ('click', loadMore);

function create (e) {
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
  page += 1;
  findImages (nameImages, perPage, page)
    .then (res => {
      if (!res.data.hits.length > 0) {
        Notify.failure (
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        return createCards (res), buttonEl.classList.add (
          'block'
        ), (buttonEl.disabled = false);
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
  page += 1;
  findImages (nameImages, perPage, page)
    .then (res => {
      if (!res.data.hits.length > 0) {
        Notify.failure (
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        return createCards (res), hidingBtnLoadMore (res.data.totalHits);
      }
    })
    .catch (error => {
      Notify.failure (
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
function createCards (arr) {
  const object = arr.data.hits;
  const card = object
    .map (
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <div class="photo-card">
   <a class="gallery-link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width = "300" height="250"/>
    </a>
    <div class="info">
    <p class="info-item">
    <b>Likes</b>
    ${likes}
    </p>
    <p class="info-item">
    <b>Views</b>
    ${views}
    </p>
    <p class="info-item">
    <b>Comments</b>
    ${comments}
    </p>
    <p class="info-item">
    <b>Downloads</b>
    ${downloads}
    </p>
    </div>
    </div> `;
      }
    )
    .join ('');
  return galleryEl.insertAdjacentHTML (
    'beforeend',
    card
  ), new SimpleLightbox ('.gallery a', {
    captionsData: 'alt',
    captionsDelay: 250,
    disableScroll: false,
  }).refresh ();
}

function hidingBtnLoadMore (total) {
  let comparison = page * perPage < total;
  if (!comparison) {
    (buttonEl.disabled = true), Notify.failure (
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    return;
  }
}
