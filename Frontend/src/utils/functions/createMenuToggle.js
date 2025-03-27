export const createMenuToggle = () => {
  const menuToggle = document.createElement('div');
  menuToggle.classList.add('menu-toggle');
  for (let i = 0; i < 3; i++) {
    const span = document.createElement('span');
    menuToggle.append(span);
  }
  return menuToggle;
};
