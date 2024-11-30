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

// WINDOW LISTENERS
window.addEventListener('resize', () => {
  if(window.innerWidth > 768 && icon.classList.contains('close-icon')) {
    icon.classList.toggle('close-icon');
    wideMenu.classList.remove('slide-from-right');
    wideMenu.classList.add('hidden-to-right');  
    body.style.overflow = 'auto';
  }
});

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');

modalClose.onclick = () => {
  modal.classList.add('vanished');
  overlay.classList.add('hidden');
  body.style.overflow = modal.classList.contains('hidden') ? 'auto' : 'hidden';
};