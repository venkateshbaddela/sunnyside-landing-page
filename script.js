"use script";

const btn = document.querySelector(".head-top__btn");
const menu = document.querySelector(".head-top__nav-box");
const section = document.querySelectorAll(".sec");
const testimonial = document.querySelector(".test");
const testimonialImg = document.querySelectorAll(".test-con__img");
const images = document.querySelectorAll(".sec-img");

let resizeTimer;

/* To hide navigation if screen with is more than 1050px */

if (window.matchMedia("(min-width: 1050px)")) menu.classList.add("hidden");

/* Event listener for opening and closing navigation */

btn.addEventListener("click", function () {
  if (menu.classList.contains("hidden")) menu.classList.remove("hidden");
  else menu.classList.add("hidden");
});

/* event listener for removing transition untill page is loaded */
window.addEventListener("load", (e) => {
  document.body.classList.remove("preload");
});

/* event listener for removing transition for every chnage in viewport size */
window.addEventListener("resize", (e) => {
  document.body.classList.add("preload");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("preload");
  }, 300);
});

////////////////////////////////////////////
/* Observer and function for transition of images in section 1, 2 & 3 */
///////////////////////////////////////////
const obsCallback = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entries.forEach((entry) => (entry.target.style.transform = "scale(1)"));

  observer.unobserve(entry.target);
};

const obsOptions = {
  root: null,
  threshold: [0, 1],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

[...images].forEach((img, i) => {
  observer.observe(img);
  img.style.transform = "scale(0.9";
});

/////////////////////////////////
/* Observer and function for transition of testimonial images */
////////////////////////////////

const imgCallback = function (entries, imgobserver) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  testimonialImg.forEach((img) => (img.style.filter = "blur(0)"));

  imgobserver.unobserve(entry.target);
};

const imgOptions = {
  root: null,
  threshold: 0.3,
};

const imgObserver = new IntersectionObserver(imgCallback, imgOptions);

imgObserver.observe(testimonial);
