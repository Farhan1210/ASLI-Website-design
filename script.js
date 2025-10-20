"use strict";

const slides = document.querySelectorAll(".slidy");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");
const nav = document.querySelector(".navbar");
const partners = document.querySelector("#partners");

///////////////////
// Sticky Navigation Bar

// const navHeight = nav.getBoundingClientRect().height;

// const obsCallback = function (entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// };

// const partnerObserver = new IntersectionObserver(obsCallback, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });
// partnerObserver.observe(partners);
//////////////////
// slider

const slider = function () {
  let curSlide = 0;
  let maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) =>
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    );
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  function init() {
    goToSlide(0);
    createDots();
    activeDot(0);
  }
  init();

  //   Event Handlers
  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      curSlide = e.target.dataset.slide;
      goToSlide(curSlide);
      activeDot(curSlide);
    }
  });
};
slider();
