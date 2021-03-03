export const storageKey = {
  SEARCH_HISTORY: 'SEARCH_HISTORY',
  LAST_SEARCH: 'LAST_SEARCH',
};

const localStore = {
  searchHistory: [],
  lastSearch: [], //마지막 검색결과 로드를 위한
};

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStore = (type, data) => {
  switch (type) {
    case 'SEARCH_HISTORY':
      localStore.searchHistory.push(...data);
    case 'LAST_SEARCH':
      localStore.lastSearch.push(...data);
  }
};

export const getLocalStore = () => {
  return localStore.searchHistory;
};
