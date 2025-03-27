export const menuToggle = (menuToggleButton, nav) => {
  menuToggleButton.classList.toggle('active');
  nav.classList.toggle('active');
  if (nav.classList.contains('active')) {
    nav.querySelector('ul').classList.add('show');
  } else {
    nav.querySelector('ul').classList.remove('show');
  }
};
