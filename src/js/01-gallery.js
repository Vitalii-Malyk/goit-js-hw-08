// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const imagesListArr = galleryItems
  .map((image, index) => {
    return `
<li class="gallery__item">
    <a class="gallery__link" href="${image.original}">
        <img
        class="gallery__image"
        src="${image.preview}"
        alt="${image.description}"
        />
    </a>
</li>`;
  })
  .join('');

const imageslistEl = document.querySelector('.gallery');

imageslistEl.insertAdjacentHTML('beforeend', imagesListArr);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'Alt',
  captionDelay: 250,
});
