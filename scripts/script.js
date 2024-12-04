import {giftsData} from '../data/gifts-data.js';
import {getGift, calculateTimeDifference, navTabsTypes} from './utils.js';
import {openModal, closeModal} from './modal.js';

const isHomePage = window.location.href.includes('gifts') ? false : true;
const body = document.querySelector('body');
const giftsGallery = body.querySelector('.gifts-gallery');

const sliderContainer = body.querySelector('.slider-container');
const sliderLeftBtn = body.querySelector('#slider-button-left');
const sliderRightBtn = body.querySelector('#slider-button-right');

const days = body.querySelector('.cta-timer-days');
const hours = body.querySelector('.cta-timer-hours');
const minutes = body.querySelector('.cta-timer-minutes');
const seconds = body.querySelector('.cta-timer-seconds');

const currYear = new Date().getFullYear();
const newYearDate = new Date(currYear + 1, 0, 1);

const burgerMenuIcon = body.querySelector('#icon');
const wideMenu = body.querySelector('.wide-menu');

const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');

const scrollUpBtn = document.querySelector('.scrollToTop');

const navTabs = body.querySelectorAll('.nav-tab');

let curOffset = 0;
let clickCount = 0;

let cards;

// BURGER MENU
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
const resetSliderPosition = () => {
  sliderContainer.style.transform = `translateX(0px)`;
  sliderLeftBtn.disabled = true;
  sliderRightBtn.disabled = false;
  clickCount = 0;
  curOffset = 0;
}
const calcScroll = (numberOfClicks) => {
  return (sliderContainer.offsetWidth - window.innerWidth) / numberOfClicks;
};

if (isHomePage) {
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
  }
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
}

// TIMER
if(isHomePage) {
  setInterval(() => {
    const d = new Date();
    const diff = (d.getTime() - newYearDate.getTime()) / 1000;
    const data = calculateTimeDifference(diff);
    
    days.textContent = data.days * -1;
    hours.textContent = data.hours * -1;
    minutes.textContent = data.minutes * -1;
    seconds.textContent = data.seconds * -1;
  }, 1000)
};

// GIFTS
giftsData.sort(() => Math.random() - 0.5);

if (isHomePage) {
  cards = giftsData.slice(0, 4).map(gift => getGift(gift));
  } else {
    cards = giftsData.map(gift => getGift(gift));

    navTabs.forEach(tab => {
      tab.onclick = (e) => {
        let newChildren;
        
        if(navTabsTypes[e.target.textContent]) {
          newChildren = cards
          .filter(card => card.gift.category === navTabsTypes[e.target.textContent])
          .map(card => card.giftDiv);
        } else {
          newChildren = cards.map(card => card.giftDiv);
        }
        
        giftsGallery.replaceChildren(...newChildren);
        
        navTabs.forEach(tab => tab.classList.remove('nav-active-tab'));
        e.target.classList.add('nav-active-tab');
      }
    })
}

cards.forEach(card => {
  const domEl = card.giftDiv;
  const cardData = card.gift;
  
  domEl.addEventListener('click', () => {
    openModal(cardData);
  })
})

giftsGallery.replaceChildren(...cards.map(card => card.giftDiv));


// MODAL LISTENERS
modalClose.onclick = () => {
  closeModal();
}
overlay.onclick = () => {
  closeModal();
}

// SCROLL UP BUTTON
if(!isHomePage) {
  scrollUpBtn.onclick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }  
}


// WINDOW LISTENERS
window.addEventListener('resize', () => {
  if(window.innerWidth > 768 && icon.classList.contains('close-icon')) {
    icon.classList.toggle('close-icon');
    wideMenu.classList.remove('slide-from-right');
    wideMenu.classList.add('hidden-to-right');  
    body.style.overflow = 'auto';
  }
});

if(isHomePage) {
  window.addEventListener('resize', () => {
    resetSliderPosition();
  });
}

if(!isHomePage) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 299 && window.innerWidth < 767) {
      scrollUpBtn.classList.add('scrollToTopVisible');
    } else {
      scrollUpBtn.classList.remove('scrollToTopVisible');
    }
  });

  window.addEventListener('resize', () => {
    if(window.scrollY > 299 && window.innerWidth < 767) {
      scrollUpBtn.classList.add('scrollToTopVisible');
    } else {
      scrollUpBtn.classList.remove('scrollToTopVisible');
    }
  });
}
