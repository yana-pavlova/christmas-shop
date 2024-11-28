import {loadGiftsData} from './utils.js';
import {imagesTypes, labelClasses} from './script-main.js';

// NAV TABS
const giftsData = await loadGiftsData();
giftsData.sort(() => Math.random() - 0.5);
const giftHTML = (imgSrc, label, category, title) => {
  return `
    <a class="gift" href="#">
    <img src="../${imgSrc}">
    <article class="gift-text">
      <span class="small-text ${label} uppercased">
        ${category}
      </span>
      <h3>${title}</h3>
    </article>
    </a>
`};
const navTabsTypes = {
  'for work': 'For Work',
  'for health': 'For Health',
  'for harmony': 'For Harmony',
  'All': 0
}

const navTabs = document.querySelectorAll('.nav-tab');
const giftsGallery = document.querySelector('.gifts-gallery');

giftsGallery.replaceChildren(...giftsData.map(gift => {
  const giftDiv = document.createElement('li');
  const imgSrc = imagesTypes[gift.category.toLowerCase().replace(/\s/g, '')];
  const label = labelClasses[gift.category.toLowerCase().replace(/\s/g, '')];

  giftDiv.innerHTML = giftHTML(imgSrc, label, gift.category, gift.name);

  return giftDiv;
}));

navTabs.forEach(tab => {
  tab.onclick = (e) => {
    let newChildren;
    
    if(navTabsTypes[e.target.textContent]) {
      newChildren = giftsData.filter(gift => gift.category === navTabsTypes[e.target.textContent]);
    } else {
      newChildren = giftsData;
    }

    const giftElements = newChildren.map(gift => {
      const giftDiv = document.createElement('li');
      const imgSrc = imagesTypes[gift.category.toLowerCase().replace(/\s/g, '')];
      const label = labelClasses[gift.category.toLowerCase().replace(/\s/g, '')];    
      
      giftDiv.innerHTML = giftHTML(imgSrc, label, gift.category, gift.name);
      return giftDiv;
    });
    
    giftsGallery.replaceChildren(...giftElements);
    
    navTabs.forEach(tab => {
      tab.classList.remove('nav-active-tab');
    });
    e.target.classList.add('nav-active-tab');
    
  }
})