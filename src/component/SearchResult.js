export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if(this.data == "nothing"){
      this.$searchResult.innerHTML = '찾는 고양이가 없네요 ㅠㅠ'
    }else{

      this.$searchResult.innerHTML = this.data
      .map(
        cat => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} title=${cat.name} loading="lazy" />
          </div>
        `
      )
      .join("");
    }
    
      
    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index].id);
      });
    });
  }
}
