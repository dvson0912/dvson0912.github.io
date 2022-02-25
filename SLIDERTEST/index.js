const movies = [
  "https://www.scrolldroll.com/wp-content/uploads/2020/01/Interstellar-2014-Must-Watch-Hollywood-Movies.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEao8_M6wXUbrAw1vEgvEgsYUp_91UX8L651B471cg-cx4Xb1R_jq49vQmbCB5DUJ4xas&usqp=CAU",
  "https://moviehighlight.files.wordpress.com/2018/12/avengers-2019.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_HlR9-nfk6I9LyRWnz20NWpCt-aqpvaZRZ6M7WuiXFw6dIljVdPgQGQ96ulmIJGCfXpA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IuYk79vBWNO1Ix2Lo5BRkwDU1oi0J8vh2S6epmUxUDBjBQtLjL4fTA19TRHcndrCb9M&usqp=CAU",
  "https://i.pinimg.com/1200x/c8/de/9b/c8de9b6465b934ae66df201f724931b6.jpg",
  "https://www.scrolldroll.com/wp-content/uploads/2020/01/Interstellar-2014-Must-Watch-Hollywood-Movies.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEao8_M6wXUbrAw1vEgvEgsYUp_91UX8L651B471cg-cx4Xb1R_jq49vQmbCB5DUJ4xas&usqp=CAU",
  "https://moviehighlight.files.wordpress.com/2018/12/avengers-2019.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_HlR9-nfk6I9LyRWnz20NWpCt-aqpvaZRZ6M7WuiXFw6dIljVdPgQGQ96ulmIJGCfXpA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IuYk79vBWNO1Ix2Lo5BRkwDU1oi0J8vh2S6epmUxUDBjBQtLjL4fTA19TRHcndrCb9M&usqp=CAU",
  "https://i.pinimg.com/1200x/c8/de/9b/c8de9b6465b934ae66df201f724931b6.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRga1IRkQSfa38ZvbKlNYsaBAWMWUaqZju__Vor6XR14TKa9mu1PaEA80C7qRBBYsC9D_8&usqp=CAU",
];

const renderSlider = () => {
  let results = movies.map((movie) => {
    return `<div class="slider__item">
                <img src='${movie}' draggable="false"/>
            </div>`;
  });
  return results;
};

const sliderHTML = renderSlider();
const slider = document.querySelector(".slider");
const content = document.querySelector(".content");
const left = document.querySelector(".btn__left");
const right = document.querySelector(".btn__right");
let isDrag = false;
let dragDown = 0;

slider.addEventListener("dragstart", (e) => {
  isDrag = true;
  dragDown = e.screenX;
});

slider.addEventListener("dragenter", (e) => {
  if (isDrag) {
    if (dragDown > e.screenX) {
      slider.scrollLeft += 300;
    }
    if (dragDown < e.screenX) {
      slider.scrollLeft -= 300;
    }
  }
});

slider.addEventListener("dragend", (e) => {
  isDrag = false;
});

right.addEventListener("click", () => {
  slider.scrollLeft += 300;
});
left.addEventListener("click", () => {
  slider.scrollLeft -= 300;
});

slider.innerHTML = sliderHTML.join("");
