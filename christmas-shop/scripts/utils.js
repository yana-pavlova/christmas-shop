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

const giftHTML = (imgSrc, label, category, title) => {
  return `
    <a class="gift">
    <img src="../${imgSrc}">
    <article class="gift-text">
      <span class="small-text ${label} uppercased">
        ${category}
      </span>
      <h3>${title}</h3>
    </article>
    </a>
`};

export const getGift = (gift) => {
  const giftDiv = document.createElement('li');
  const imgSrc = imagesTypes[gift.category.toLowerCase().replace(/\s/g, '')];
  const label = labelClasses[gift.category.toLowerCase().replace(/\s/g, '')];

  giftDiv.innerHTML = giftHTML(imgSrc, label, gift.category, gift.name);

  return {giftDiv, gift};
}

export const calculateTimeDifference = (seconds) => {
  seconds = Math.trunc(seconds);
  let minutes = Math.trunc(seconds / 60);
  seconds = seconds - (minutes * 60);
  let hours = Math.trunc(minutes / 60);
  minutes = minutes - (hours * 60);
  let days = Math.trunc(hours / 24);
  hours = hours - (days * 24);

  return {days, hours, minutes, seconds};
}

export const navTabsTypes = {
  'for work': 'For Work',
  'for health': 'For Health',
  'for harmony': 'For Harmony',
  'All': 0
};