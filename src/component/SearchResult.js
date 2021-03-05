import { infiniteScroll } from '../utils/infiScroll.js';

export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onScroll }) {
    this.$searchResult = document.createElement('div');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.$target = $target;
    this.data = initialData;
    this.onClick = onClick;
    this.onScroll = onScroll;

    this.render();
  }

  clickItem = (e) => {
    if (e.target.className !== 'item' && e.target.nodeName !== 'IMG') return;
    if (e.target.id) {
      this.onClick(e.target.id);
    }
  };

  setState(nextData) {
    this.data = nextData;
    this.render();
    infiniteScroll(this.onScroll);
  }

  render() {
    if (this.data == 'nothing') {
      this.$searchResult.className = '';
      this.$searchResult.innerHTML = `
        <div class="noResult">찾는 고양이가 없네요😿</div>`;
    } else {
      this.$searchResult.className = 'SearchResult';
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
          <div class="item" id=${cat.id}>
            <img src=${cat.url} id=${cat.id} alt=${cat.name} title=${cat.name} loading="lazy" />
            <p>${cat.name}</p>
          </div>
        `,
        )
        .join('');
    }

    this.$searchResult.addEventListener('click', this.clickItem);
    /*
    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index].id);
      });
    });
    */
  }
}
