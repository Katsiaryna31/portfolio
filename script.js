'use strict';

var buttonOpen = document.getElementById("expansion-open");
var educationList = document.getElementById("education__list");
var educationPanel = document.querySelector('.education__panel');

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

educationPanel.addEventListener('click', openList);
educationList.addEventListener('click', openList);

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

let slider = document.querySelector('.slider__container');

const swipeCheck = (slider) => {
    let surface = slider;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
	  let elapsedTime = 0;

    let allowedLength = 150;
	  let allowedHeight = 100;
	  let allowedTime = 500;

    surface.addEventListener('touchstart', function(evt) {
        this.isSwipe = false;
    		if (evt.target.classList.contains('slider__change')) {
    			if (evt.target.classList.contains('.slider__change--left')) {
    				if (isEnabled) {
    					previousSlide(currentSlide);
    				}
    			} else {
    				if (isEnabled) {
    					nextSlide(currentSlide);
    				}
    			}
    		}
    			let touchobj = evt.changedTouches[0];
    			startX = touchobj.pageX;
    			startY = touchobj.pageY;
    			startTime = new Date().getTime();
    			evt.preventDefault();
    	}, false);

    	surface.addEventListener('touchmove', function(evt){
          this.isSwipe = true;
    			evt.preventDefault();
    	}, false);

    	surface.addEventListener('touchend', function(evt){
          let touchobj = evt.changedTouches[0];
    			distX = touchobj.pageX - startX;
    			distY = touchobj.pageY - startY;
    			elapsedTime = new Date().getTime() - startTime;
    			if (elapsedTime <= allowedTime){
    					if (Math.abs(distX) >= allowedLength && Math.abs(distY) <= allowedHeight){
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
    			evt.preventDefault();
      }, false);

};

swipeCheck(slider);

let isSwiping = false;

var images = document.querySelectorAll(".slider__image");
images.forEach((img)=> {
  img.addEventListener('touchstart', () => {
    img.isSwiping = false;
  });
  
  img.addEventListener('touchmove', () => {
    img.isSwiping = true;
  });
  
  img.addEventListener('touchend', e => {
    e.preventDefault();
  
    if (!img.isSwiping) {
      if (img === images[0]) {
        location.href = "theyalow/iframe.html";
      } else {
        location.href = "repair-design-project/iframe.html";
      }  
    }
  
    img.isSwiping = false;
  });
})


var buttonDescOpen = document.querySelectorAll(".slider__button--open");
var buttonDescHide = document.querySelectorAll(".slider__button--hide");
var descriptionList = document.querySelectorAll(".slider__block-list");

var openDescription = function () {
    descriptionList.forEach((list)=> {
      list.classList.add("slider__block-list--active");
    })
    buttonDescOpen.forEach((button)=> {
      button.classList.add("slider__button--close");
      button.classList.remove("slider__button--active");
    });
    buttonDescHide.forEach((button)=> {
      button.classList.add("slider__button--active");
      button.classList.remove("slider__button--close");
    });
}

var hideDescription = function () {
  descriptionList.forEach((list)=> {
    list.classList.remove("slider__block-list--active");
  })
  buttonDescHide.forEach((button)=> {
    button.classList.add("slider__button--close");
    button.classList.remove("slider__button--active");
  });
  buttonDescOpen.forEach((button)=> {
    button.classList.add("slider__button--active");
    button.classList.remove("slider__button--close");
  });
}

buttonDescOpen.forEach((button) => {
  button.addEventListener('touchend', openDescription);
});
buttonDescHide.forEach((button) => {
  button.addEventListener('touchend', hideDescription);
});
