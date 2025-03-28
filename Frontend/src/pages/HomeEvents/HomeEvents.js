import { createPage } from '../../utils/functions/createPage';
import './HomeEvents.css';

export const HomeEvents = () => {
  const div = createPage('home-events');
  div.innerHTML = `<h1>Esto es la home</h1>`;
};
