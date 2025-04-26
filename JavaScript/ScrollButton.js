function scrollButton() {
    const destino = document.getElementById('header');
    destino.scrollIntoView({
      behavior: 'smooth'
    });
  }

const toggle = document.querySelector('.menu-toggle');
const ul = document.querySelector('.h-ulnav');
toggle.addEventListener('click', () => {
  ul.classList.toggle('open');

  toggle.classList.toggle('active');
});