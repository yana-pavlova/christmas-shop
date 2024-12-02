import { imagesTypes, labelClasses} from './utils.js';

const pathPrefix = window.location.href.includes('gifts') ? '../' : '';

const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal-card-title');
const modalCategory = modal.querySelector('.small-text');
const modalDescription = modal.querySelector('.modal-card-text');
const modalLiveScore = modal.querySelector('.live-score');
const modalLoveScore = modal.querySelector('.love-score');
const modalCreateScore = modal.querySelector('.create-score');
const modalDreamScore = modal.querySelector('.dream-score');
const modalImg = modal.querySelector('.modal-img');
const liveReview = modal.querySelector('.live-review');
const loveReview = modal.querySelector('.love-review');
const createReview = modal.querySelector('.create-review');
const dreamReview = modal.querySelector('.dream-review');

const overlay = document.querySelector('.overlay');

export const openModal = (cardData) => {
  body.style.overflow = 'hidden';

  const {
    name,
    category,
    description,
    superpowers: { create, dream, live, love }
  } = cardData;

  const categoryKey = category.toLowerCase().replace(/\s/g, '');

  modalTitle.textContent = name;
  modalCategory.textContent = category;
  
  modalCategory.className = 'small-text uppercased ' + labelClasses[categoryKey];
  modalDescription.textContent = description;
  modalLiveScore.textContent = live;
  modalLoveScore.textContent = love;
  modalCreateScore.textContent = create;
  modalDreamScore.textContent = dream;
  modalImg.src = pathPrefix + imagesTypes[categoryKey];

  appendStars(liveReview, live[1]);
  appendStars(loveReview, love[1]);
  appendStars(createReview, create[1]);
  appendStars(dreamReview, dream[1]);

  modal.classList.remove('vanished');
  overlay.classList.remove('hidden');
  modal.classList.add('appeared');

  console.log('MODAL', imagesTypes[categoryKey]);
  
}

export const closeModal = () => {
  body.style.overflow = 'auto';
  modal.classList.add('vanished');
  modal.classList.remove('appeared');
  overlay.classList.add('hidden');

  liveReview.innerHTML = '';
  loveReview.innerHTML = '';
  createReview.innerHTML = '';
  dreamReview.innerHTML = '';
};

const getReviewNode = () => {
  const img = document.createElement('img'); 
  img.src = pathPrefix + 'images/review-star.svg'; 
  img.alt = 'Star icon'; 
  
  return img; 
}

const getShadowedStarNode = () => {
  const img = document.createElement('img'); 
  img.src = pathPrefix + 'images/review-star-shadowed.svg'; 
  img.alt = 'Shadowed star icon'; 

  return img; 
};

const appendStars = (container, starCount) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < starCount; i++) {
    fragment.appendChild(getReviewNode());
  }

  for (let i = starCount; i < 5; i++) {
    fragment.appendChild(getShadowedStarNode());
  }

  container.appendChild(fragment);
};