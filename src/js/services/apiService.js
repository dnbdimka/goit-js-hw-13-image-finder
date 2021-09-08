export default class ApiService {
    BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '23271163-2ca32ba12cffdc2e109d4f4b6';
    constructor() {
        this.searchQuery = '',
        this.page = 1;
        this.per_page = 12;
    }
    fetchImages() {  
        return fetch(`${this.BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${this.#API_KEY}`)
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
    incrementPage() {
        this.page +=1;
    }
    resetPage() {
        this.page = 1;
    }
}