'use strict';

var buttonOpen = document.getElementById("expansion-open");
var educationList = document.getElementById("education-list");

var openList = function () {
  if (!buttonOpen.classList.contains("education__button--active")) {
    educationList.classList.remove("education__list--close");
    educationList.classList.add("education__list--open");
    buttonOpen.classList.add("education__button--active");
  } else {
    educationList.classList.add("education__list--close");
    educationList.classList.remove("education__list--open");
    buttonOpen.classList.remove("education__button--active");
  }
}

buttonOpen.addEventListener('click', openList);

var slides = document.querySelectorAll('.slider__wrapper');
var currentSlide = 0;
var isEnabled = true;

function changeSlide(number) {
  currentSlide = (number + slides.length) % slides.length;
}

function closeSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('slider__wrapper--active', direction);
  })
}

function showSlide(direction) {
  slides[currentSlide].classList.add('slider__wrapper--next', direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('slider__wrapper--next', direction);
    this.classList.add('slider__wrapper--active');
    isEnabled = true;
  })
}

function nextSlide(number) {
  closeSlide('to-left');
  changeSlide(number + 1);
  showSlide('from-right');
}

function previousSlide(number) {
  closeSlide('to-right');
  changeSlide(number - 1);
  showSlide('from-left');
}

var buttonLeft = document.querySelector('.slider__change--left');
var buttonRight = document.querySelector('.slider__change--right');

buttonLeft.addEventListener('click', function() {
  if (isEnabled) {
    previousSlide(currentSlide);
  }
});

buttonRight.addEventListener('click', function() {
  if (isEnabled) {
    nextSlide(currentSlide);
  }
});

let elem = document.getElementById('slider');

const swipeCheck = (elem) => {
    let surface = elem;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
	  let elapsedTime = 0;
    let dist = 0;

    let threshold = 150;
	  let restraint = 100;
	  let allowedTime = 300;

    surface.addEventListener('mousedown', function(e) {
      dist = 0;
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    });

    surface.addEventListener('mouseup', function(e) {
      distX = e.pageX - startX;
		  distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousSlide(currentSlide);
					}
				} else {
					if (isEnabled) {
						nextSlide(currentSlide);
					}
				}
			}
		}
		e.preve



      e.preventDefault();
    });


};

swipeCheck(elem);
