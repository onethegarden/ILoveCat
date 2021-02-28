import SearchInput from "./component/SearchInput.js";
import Loading from "./component/Loading.js";
import SearchResult from "./component/SearchResult.js";
import ImageInfo from "./component/ImageInfo.js";
import { setLocalStorage, setLocalStore, getLocalStorage, storageKey } from "./storage/localStorage.js";
//import validator from './utils/validator.js';
import { api } from "./api/api.js";

console.log("app is running!");

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.loading.setState({ isLoading: true });

        const response = await api.fetchCats(keyword);
        if (!response.message) {
          if(response.data.length == 0){
            this.setState("nothing");
          }else{
            setLocalStorage(storageKey.LAST_SEARCH, response.data)
            this.setState(response.data);
          }
        }
        this.loading.setState({ isLoading: false });
      },
      onRandom: async () => {
        this.loading.setState({ isLoading: true });

        const response = await api.randomCat();
        if (!response.message) {
          if(response.data.length == 0){
            this.setState("nothing");
          }else{
            //setLocalStorage(storageKey.LAST_SEARCH, response.data)
            this.setState(response.data);
          }
        }
        this.loading.setState({ isLoading: false });
        
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (id) => {
        this.loading.setState({ isLoading: true });
        const response = await api.fetchCatDetail(id);
        this.loading.setState({ isLoading: false });

        if (!response.message) {
          this.imageInfo.setState({
            image: response.data,
            visible: true,
          });
        }
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.loading = new Loading({
      $target,
      data: {
        isLoading: true,
      },
    });
    
    const initSearch = getLocalStorage(storageKey.SEARCH_HISTORY);
    const lastSearch = getLocalStorage(storageKey.LAST_SEARCH);
    if(initSearch){
      setLocalStore(storageKey.SEARCH_HISTORY, initSearch);
    }
    if(lastSearch){
      setLocalStore(storageKey.LAST_SEARCH, lastSearch);
      this.setState(getLocalStorage(storageKey.LAST_SEARCH));
    }
  } 

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
