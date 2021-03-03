export const infiniteScroll = (nextFunction) => {
  const items = document.querySelectorAll('.item');
  const lastItem = items[items.length - 1];
  //console.log(lastItem);
  const io = new IntersectionObserver((entry) => {
    if (entry[0].isIntersecting) {
      /*새로 할 일
        unobserve와 observe를 사용 안하는 이유는 state를 등록시킬 때마다 이 함수가 실행되기 때문에
        마지막 값이 재등록 됨
        */
      nextFunction();
    }
  });
  io.observe(lastItem);
};
