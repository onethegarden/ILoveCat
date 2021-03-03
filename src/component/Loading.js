export default class Loading {
  constructor({ $target, data }) {
    this.$loadingArea = document.createElement('div');
    this.$loadingArea.className = 'loading';

    $target.appendChild(this.$loadingArea);
    this.data = data;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const loading = document.querySelector('.loading');
    if (this.data.isLoading) {
      loading.innerHTML = `
      <div class="loadingDiv">
        <img class="loadingImage" class="" src="https://media.giphy.com/media/Qrca6tBIdqXYXhnB4v/giphy.gif" />  
      </div>
      `;
    } else {
      loading.innerHTML = '';
    }
  }
}
