import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';

import './js/img-gallery'
// import refs from './js/services/refs'
import refs from './js/services/refs';
import makeGalleryCardMarkup from './templates/galleryCard.hbs';
import ImagesApiService from './js/services/apiService';





const api = new ImagesApiService();

refs.form.addEventListener('submit', onFormSumbit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSumbit(e) {
    e.preventDefault();
    clearGalleryList();
    refs.form.elements.btn.textContent = 'Searching...';
    refs.form.elements.btn.setAttribute('disabled', '');

    refs.loadMoreBtn.classList.add('is-hidden');

    api.query = e.currentTarget.elements.query.value;
    api.resetPage();

    if (api.query === '') {
        error({
            text: "Please enter your search term",
            delay: 3000,
        });
        refs.form.elements.btn.textContent = 'Search';
        refs.form.elements.btn.removeAttribute('disabled')
        return;
    };

    api.fetchImages().then(({ hits, total }) => {
        if (hits.length === 0 ) {
            error({
                text: "Please enter a valid search term",
                delay: 3000,
            });
            refs.form.elements.btn.textContent = 'Search';
            refs.form.elements.btn.removeAttribute('disabled')
            return;
        };
        renderImages(hits);
        refs.form.elements.btn.textContent = 'Search';
        refs.form.elements.btn.removeAttribute('disabled');
        refs.loadMoreBtn.classList.remove('is-hidden');
        onLastPage(total);
    });
    
};

function onLoadMore() {
    api.incrementPage();
    
    refs.loadMoreBtn.setAttribute('disabled', '');
    refs.spinner.classList.remove('is-hidden')
    refs.loadMoreText.textContent = 'Loading...';

    api.fetchImages().then(({ hits, total }) => {

        renderImages(hits);
        onLastPage(total);
        refs.loadMoreBtn.removeAttribute('disabled');
        refs.spinner.classList.add('is-hidden');
        refs.loadMoreText.textContent = 'Load more';
    });
};

function renderImages (images) {
    const markup = makeGalleryCardMarkup(images)
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
};

function clearGalleryList() {
    refs.galleryList.innerHTML = '';
};

function onLastPage(all) {
    const allPage = Math.ceil(all / api.per_page);
    // console.log(api.page);
    // console.log(allPage);
    if (api.page >= allPage) {
        notice({
            text: "These are all pictures according to your request",
            delay: 3000,
        });
        refs.loadMoreBtn.classList.add('is-hidden');
    };
}








