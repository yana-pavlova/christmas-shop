import {loadGiftsData} from './utils.js';

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

if(sliderRightBtn) {sliderRightBtn.onclick = () => {
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
}};

if(sliderLeftBtn) {sliderLeftBtn.onclick = () => {
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
}}

// TIMER
const days = document.querySelector('.cta-timer-days');
const hours = document.querySelector('.cta-timer-hours');
const minutes = document.querySelector('.cta-timer-minutes');
const seconds = document.querySelector('.cta-timer-seconds');

const newYearDate = new Date('2025-01-01');

let d, diff, data;

const calculateTimeDifference = (seconds) => {
  seconds = Math.trunc(seconds);
  let minutes = Math.trunc(seconds / 60);
  seconds = seconds - (minutes * 60);
  let hours = Math.trunc(minutes / 60);
  minutes = minutes - (hours * 60);
  let days = Math.trunc(hours / 24);
  hours = hours - (days * 24);

  return {days, hours, minutes, seconds};
}

if(days && hours && minutes && seconds){setInterval(() => {
  d = new Date();
  diff = (d.getTime() - newYearDate.getTime()) / 1000;
  data = calculateTimeDifference(diff);
  
  days.textContent = data.days * -1;
  hours.textContent = data.hours * -1;
  minutes.textContent = data.minutes * -1;
  seconds.textContent = data.seconds * -1;
}, 1000)};

// RANDOM GIFTS CARDS
const giftsData = await loadGiftsData();

export const imagesTypes = {
  'forhealth': './images/gift-for-health.png',
  'forharmony': './images/gift-for-harmony.png',
  'forwork': './images/gift-for-work.png'
}

export const labelClasses = {
  'forhealth': 'health-text',
  'forharmony': 'harmony-text',
  'forwork': 'work-text'
}

const getRandomGift = () => {
  const randomInt = Math.floor(Math.random() * giftsData.length);
  
  return giftsData[randomInt];
}

const randomGiftCards = document.querySelectorAll('.gift-random');
randomGiftCards.forEach((card) => {
  const title = card.querySelector('h3');
  const label = card.querySelector('span');
  const pic = card.querySelector('img');

  const randomGift = getRandomGift();
  const category = randomGift.category.toLowerCase().replace(/\s/g, '');

  title.textContent = randomGift.name;
  label.textContent = randomGift.category;
  label.classList.add(labelClasses[category]);
  pic.src = imagesTypes[category];

  card.classList.toggle('hidden');
  card.classList.toggle('loaded');
});

// WINDOW LISTENERS
window.addEventListener('resize', () => {
  if(sliderContainer) resetSliderPosition();
});
