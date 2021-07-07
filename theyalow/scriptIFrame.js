'use strict';

const desktopButton = document.querySelector('.desktop-button');
const mobileButton = document.querySelector('.mobile-button');
const backButton = document.querySelector('.back-button');
const iframe = document.getElementById('iframe');
const container = document.querySelector('.container');
container.style.width = '100%';
iframe.style.width = '100%';
iframe.style.height = '1850px';

const changeVersion = () => {
    if (desktopButton.classList.contains('version--active')) {
        desktopButton.classList.remove('version--active');
        desktopButton.classList.remove('version--hidden');
        mobileButton.classList.add('version--active');
        mobileButton.classList.remove('version--hidden');
        iframe.style.height = '1850px';
        container.style.width = '100%';
        container.style.margin = '0 auto';
    } else {
        mobileButton.classList.remove('version--active');
        mobileButton.classList.add('version--hidden');
        desktopButton.classList.add('version--active');
        desktopButton.classList.remove('version--hidden');
        iframe.style.height = '1514px';
        container.style.width = '640px';
        container.style.margin = '0 auto';
    }
}

desktopButton.addEventListener('click', changeVersion);
mobileButton.addEventListener('click', changeVersion);

if (window.screen.width <= 1440) {
    backButton.style.padding = '10px';
    backButton.style.right = '18px';
    backButton.style.top = '70%';
    desktopButton.classList.remove('version--active');
    desktopButton.classList.add('version--hidden');
    mobileButton.classList.remove('version--active');
    mobileButton.classList.add('version--hidden');
    container.style.width === window.screen.width;
}
