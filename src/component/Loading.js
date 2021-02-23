export default class Loading {  
    constructor({ $target, data }) {
    
      this.$loadingArea = document.createElement("div");
      this.$loadingArea.className = "loading";
  
      $target.appendChild(this.$loadingArea);
      this.data = data;
  
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      console.log(this.data)
      const loading = document.querySelector(".loading");
      if (this.data.isLoading) {
        loading.innerHTML = `
          <h3>로딩중...</h3>
          `;
  
      }else{
        loading.innerHTML = '';
      } 
    }
  }
  