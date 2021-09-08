import refs from './services/refs';
import * as basicLightbox from 'basiclightbox';

refs.galleryList.addEventListener('click', onImgClick);
function onImgClick(e) {
    const tag = e.target.tagName;
    if (tag !== 'IMG') {
        return;
    }
    const src = e.target.getAttribute('src');
    const alt = e.target.getAttribute('alt');
    basicLightbox.create(`
		<img width="1400" height="900" src=${src}" alt=${alt}>
	`,).show()

}
