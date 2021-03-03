export default class CatSection {
  constructor({ $target, onLoad }) {
    this.$target = $target;
    this.onLoad = onLoad;
    this.$data = '';
    this.$slideSection = document.createElement('div');
    this.$slideSection.className = 'slideSection';
    this.$target.appendChild(this.$slideSection);
    this.onLoad();
  }

  setState(nextData) {
    this.$data = nextData;
    console.log(this.$data);
    this.render();
  }
  slide() {}

  render() {
    //this.$randomSection.appendChild();
    const html = `
    <ul class="sliderContainer">
        <li class="slideImg">slideImage1</li>
        <li class="slideImg">slideImage2</li>
        <li class="slideImg">slideImage3</li>
    </ul>
    <div class="navigator">
      <div class="left"> < </div>
      <div class="right"> > </div>
    </div>
    `;
    this.$slideSection.innerHTML += html;
    console.log('cat section');
    this.slide();
  }
}
