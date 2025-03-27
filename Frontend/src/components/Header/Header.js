import './Header.css';
import { routes } from '../../utils/api/routes';
import { menuNavigation } from '../../utils/functions/menuNavigation.js';
import { menuToggle } from '../../utils/functions/menuToggle.js';
import { createMenuToggle } from '../../utils/functions/createMenuToggle.js';

export const Header = () => {
  const header = document.createElement('header');
  header.id = 'header';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  logoDiv.innerHTML =
    '<span class="tech">Tech</span> <span class="events">Events</span>';
  header.append(logoDiv);

  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  for (const route of routes) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.addEventListener('click', (e) =>
      menuNavigation(e, route, menuToggleButton, nav)
    );
    a.textContent = route.text;
    a.href = route.path;
    li.append(a);
    ul.append(li);
  }

  nav.append(ul);
  header.append(nav);

  const menuToggleButton = createMenuToggle();
  header.append(menuToggleButton);

  menuToggleButton.addEventListener('click', () =>
    menuToggle(menuToggleButton, nav)
  );

  const app = document.getElementById('app');
  app.append(header);
};
