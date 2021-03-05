import {
  setLocalStorage,
  storageKey,
  getLocalStore,
  getLocalStorage,
} from '../storage/localStorage.js';

const TEMPLATE = '<input type="text">';

export default class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    this.$section = document.createElement('section');
    this.$section.className = 'SearchSection';
    $target.appendChild(this.$section);
    this.render();
    this.loadHistory();
  }

  loadHistory = (e) => {
    const SearchHistoryArea = document.querySelector('.SearchHistory');
    ('');
    SearchHistoryArea.innerHTML = '';

    const searchHistory = getLocalStorage(storageKey.SEARCH_HISTORY);

    if (searchHistory) {
      let cnt = 0;
      let historyHtml = '';
      historyHtml += `<ul class="keywordList">`;
      for (let i = searchHistory.length - 1; i >= 0; i--) {
        if (cnt > 4) break;

        historyHtml += `<li class="keyword">${searchHistory[i]}</li>`;
        cnt++;
      }
      SearchHistoryArea.innerHTML += historyHtml;
    }
  };

  searchKeyword = (e) => {
    if (e.target.className !== 'keyword') return;
    this.onSearch(e.target.innerText);
  };

  search = (e) => {
    if (e.keyCode !== 13) return;

    if (e.target.value.trim() === '') {
      alert('검색어를 입력하세요');
      return;
    }
    const store = getLocalStore();
    store.push(e.target.value);
    setLocalStorage(storageKey.SEARCH_HISTORY, store);
    this.onSearch(e.target.value);
    this.loadHistory();
  };

  getRandomCat = (e) => {
    this.onRandom();
  };

  render() {
    const searchInput = document.createElement('input');

    searchInput.placeholder = '🐱‍🚀 고양이를 검색해보세요';
    searchInput.className = 'SearchInput';

    const searchHistory = document.createElement('div');
    searchHistory.className = 'SearchHistory';

    const searchInputDiv = document.createElement('div');
    searchInputDiv.className = 'searchInputDiv';

    const randomButton = document.createElement('input');
    randomButton.type = 'button';
    randomButton.value = '🐱‍🐉';
    randomButton.className = 'randomBotton';

    searchInputDiv.appendChild(searchInput);
    searchInputDiv.appendChild(randomButton);

    this.$section.appendChild(searchInputDiv);
    this.$section.appendChild(searchHistory);
    searchInput.focus();

    searchInput.addEventListener('keyup', this.search);
    searchInput.addEventListener('click', (e) => {
      e.target.value = '';
    });
    searchHistory.addEventListener('click', this.searchKeyword);
    searchInput.addEventListener('click', this.loadHistory);
    randomButton.addEventListener('click', this.getRandomCat);
    searchInput.focus();
  }
}
