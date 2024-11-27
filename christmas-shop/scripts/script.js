// BURGER MENU

const burgerMenuIcon = document.querySelector('#icon');
const wideMenu = document.querySelector('.wide-menu');
const body = document.querySelector('body');

burgerMenuIcon.onclick = () => {
  icon.classList.toggle('close-icon');
  if(icon.classList.contains('close-icon')) {
    wideMenu.classList.add('slide-from-right');
    wideMenu.classList.remove('hidden-to-right');
    body.style.overflow = 'hidden';
  } else {
    wideMenu.classList.remove('slide-from-right');
    wideMenu.classList.add('hidden-to-right');
    body.style.overflow = 'auto';
  }
};

wideMenu.onclick = (e) => {
  if(e.target.tagName === 'A') {
    icon.classList.toggle('close-icon');
    wideMenu.classList.remove('slide-from-right');
    wideMenu.classList.add('hidden-to-right');
    body.style.overflow = 'auto';
  }
};

// SLIDER
const sliderContainer = document.querySelector('.slider-container');
const sliderLeftBtn = document.querySelector('#slider-button-left');
const sliderRightBtn = document.querySelector('#slider-button-right');

const calcScroll = (numberOfClicks) => {
  return (sliderContainer.offsetWidth - window.innerWidth) / numberOfClicks;
};
const resetSliderPosition = () => {
  sliderContainer.style.transform = `translateX(0px)`;
  sliderLeftBtn.disabled = true;
  sliderRightBtn.disabled = false;
  clickCount = 0;
  curOffset = 0;
}

let curOffset = 0;
let clickCount = 0;

sliderRightBtn.onclick = () => {
  sliderLeftBtn.disabled = false;

  let scrollNumbers = window.innerWidth > 768 ? 3 : 6;

  const scroll = calcScroll(scrollNumbers);

  curOffset -= scroll;
  
  sliderContainer.style.transform = `translateX(${curOffset}px)`;
  clickCount++;

  if(clickCount >= scrollNumbers) {
    sliderRightBtn.disabled = true;
    return
  }
};

sliderLeftBtn.onclick = () => {
  sliderRightBtn.disabled = false;

  let scrollNumbers = window.innerWidth > 768 ? 3 : 6;

  const scroll = calcScroll(scrollNumbers);

  curOffset += scroll;
  
  sliderContainer.style.transform = `translateX(${curOffset}px)`;
  clickCount--;

  if(clickCount <= 0) {
    sliderLeftBtn.disabled = true;
    return
  }
}


window.addEventListener('resize', () => {
  if(window.innerWidth > 768 && icon.classList.contains('close-icon')) {
    icon.classList.toggle('close-icon');
    wideMenu.classList.remove('slide-from-right');
    wideMenu.classList.add('hidden-to-right');  
    body.style.overflow = 'auto';
  }

  resetSliderPosition();
});