export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onScroll }) {
    this.$searchResult = document.createElement('div');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onScroll = onScroll;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.scrollTest();
  }

  scrollTest() {
    const items = document.querySelectorAll('.item');
    const lastItem = items[items.length - 1];
    //console.log(lastItem);
    const io = new IntersectionObserver((entry) => {
      const target = entry[0].target;
      console.log(target);
      if (entry[0].isIntersecting) {
        /*새로 할 일
        unobserve와 observe를 사용 안하는 이유는 state를 등록시킬 때마다 이 함수가 실행되기 때문에
        마지막 값이 재등록 됨
        */
        this.onScroll();
      }
    });
    io.observe(lastItem);
  }

  render() {
    if (this.data == 'nothing') {
      this.$searchResult.innerHTML = '찾는 고양이가 없네요 ㅠㅠ';
    } else {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} title=${cat.name} loading="lazy" />
          </div>
        `,
        )
        .join('');
    }

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index].id);
      });
    });
  }
}
