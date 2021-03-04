export default class CatSection {
  constructor({ $target, onLoad }) {
    this.$target = $target;
    this.onLoad = onLoad;
    this.$data = '';
    this.$slideSection = document.createElement('div');
    this.$slideSection.className = 'slideSection';
    this.$target.appendChild(this.$slideSection);

    this.$currSlide = 0; //슬라이드 현재 위치
    this.onLoad();
  }

  setState(nextData) {
    this.$data = nextData;
    this.render();
  }

  slide = (e) => {
    if (e.target.className !== 'dot') return;

    const wrapper = document.querySelector('.cards-wrapper');
    const displayArea = wrapper.parentElement.clientWidth;

    if (this.$currSlide === 0 && e.target.id === 'left') return;

    const navi = e.target.id == 'right' ? -1 : +1;

    this.$currSlide = this.$currSlide + navi;

    const pixels = displayArea * this.$currSlide;

    wrapper.style.transform = 'translateX(' + pixels + 'px)';
  };

  render() {
    //this.$randomSection.appendChild();
    const html = `
    <div class="display-area">
      <div class="cards-wrapper">
        ${
          this.$data &&
          this.$data
            .map((cat) => {
              return `<div class="card"><img src="${cat.url}" alt="고양이"></div>`;
            })
            .join('')
        }
      </div> 
    </div>
    <div class="dots-wrapper">
      <button class="dot" id="left"> < </button>
      <button class="dot" id="right"> > </button>
    </div>
    `;
    this.$slideSection.innerHTML += html;

    const wrapper = document.querySelector('.slideSection');
    wrapper.addEventListener('click', this.slide);
  }
}
