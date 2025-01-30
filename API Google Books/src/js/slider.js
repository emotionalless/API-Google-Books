let nowSlide = 1;

function slide1() {
  const svgElement1 = document.getElementById('main__slider__dots__1');
  const circle1 = svgElement1.querySelector('circle');
  circle1.setAttribute('fill', '#EFEEF6');

  const svgElement2 = document.getElementById('main__slider__dots__2');
  const circle2 = svgElement2.querySelector('circle');
  circle2.setAttribute('fill', '#9E98DC');

  const svgElement3 = document.getElementById('main__slider__dots__3');
  const circle3 = svgElement3.querySelector('circle');
  circle3.setAttribute('fill', '#EFEEF6');

  const imgElement = document.getElementById('main__slider__img');
  imgElement.src = 'img/slider-banner-2.svg';

  nowSlide = 1;
}

function slide2 () {
  const svgElement1 = document.getElementById('main__slider__dots__2');
  const circle1 = svgElement1.querySelector('circle');
  circle1.setAttribute('fill', '#EFEEF6');

  const svgElement2 = document.getElementById('main__slider__dots__3');
  const circle2 = svgElement2.querySelector('circle');
  circle2.setAttribute('fill', '#9E98DC');

  const svgElement3 = document.getElementById('main__slider__dots__1');
  const circle3 = svgElement3.querySelector('circle');
  circle3.setAttribute('fill', '#EFEEF6');

  const imgElement = document.getElementById('main__slider__img');
  imgElement.src = 'img/slider-banner-3.svg';

  nowSlide = 2;
}

function slide3() {
  const svgElement1 = document.getElementById('main__slider__dots__2');
  const circle1 = svgElement1.querySelector('circle');
  circle1.setAttribute('fill', '#EFEEF6');

  const svgElement2 = document.getElementById('main__slider__dots__3');
  const circle2 = svgElement2.querySelector('circle');
  circle2.setAttribute('fill', '#EFEEF6');

  const svgElement3 = document.getElementById('main__slider__dots__1');
  const circle3 = svgElement3.querySelector('circle');
  circle3.setAttribute('fill', '#9E98DC');

  const imgElement = document.getElementById('main__slider__img');
  imgElement.src = 'img/slider-banner-1.svg';

  nowSlide = 3;
}

document.getElementById('main__slider__dots__2').addEventListener('click', slide1);
document.getElementById('main__slider__dots__3').addEventListener('click', slide2);
document.getElementById('main__slider__dots__1').addEventListener('click', slide3);


// Перелистывание слайдера каждые 5 секунд автоматически

function sliderAuto() {
switch(nowSlide) {
  case 1 : slide2(); break;
  case 2 : slide3(); break;
  case 3 : slide1(); break;
}
};

setInterval(sliderAuto, 5000);

