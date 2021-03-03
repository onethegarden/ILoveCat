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
    this.$currMode =
      window.matchMedia('(prefers-color-scheme: dark)').matches == true
        ? 'dark'
        : 'light';

    $target.appendChild(this.$section);
    this.render();
    this.setDarkMode();
    this.loadHistory();
  }

  setDarkMode() {
    document.documentElement.setAttribute('color-theme', this.$currMode);

    const checkBox = document.querySelector('.darkCheckbox');
    checkBox.checked = this.$currMode == 'dark' ? true : '';
  }

  toggleDarkMode = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('color-theme', 'dark');
    } else {
      document.documentElement.setAttribute('color-theme', 'light');
    }
  };

  loadHistory = (e) => {
    const SearchHistoryArea = document.querySelector('.SearchHistory');
    const searchInput = document.querySelector('.SearchInput');
    searchInput.value = '';
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
    searchInput.focus();
  };

  searchKeyword = (e) => {
    if (e.target.className !== 'keyword') return;
    this.onSearch(e.target.innerText);
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

    searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        const store = getLocalStore();
        store.push(e.target.value);
        setLocalStorage(storageKey.SEARCH_HISTORY, store);
        this.onSearch(e.target.value);
        this.loadHistory();
      }
    });
    searchHistory.addEventListener('click', this.searchKeyword);
    searchInput.addEventListener('click', this.loadHistory);
    randomButton.addEventListener('click', this.getRandomCat);
  }
}
