// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Connected the library "SimpleLightbox"
import SimpleLightbox from "simplelightbox";

// Connected CSS styles of the library "SimpleLightbox"
import "simplelightbox/dist/simple-lightbox.min.css";

// Link on the <ul> element of HTML document
const galleryListEl = document.querySelector('.gallery');

// Generate markup
const MakeGalleryMarkup = items => {
    return items.map(({ preview, original, description }) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
            />
        </a>
    </li>`
    ).join('');
}

// Add markup in DOM
galleryListEl.innerHTML = MakeGalleryMarkup(galleryItems);

// Set library "SimpleLightbox"
new SimpleLightbox('.gallery__link', {
    sourceAttr: 'href',
    captionsData: 'alt',
    captionDelay: 250,
 });
