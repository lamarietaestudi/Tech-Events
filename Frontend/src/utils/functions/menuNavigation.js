export const menuNavigation = (e, route, menuToggleButton, nav) => {
  e.preventDefault();
  window.history.pushState('', '', route.path);
  route.page();
  menuToggleButton.classList.remove('active');
  nav.classList.remove('active');
  nav.querySelector('ul').classList.remove('show');
};
