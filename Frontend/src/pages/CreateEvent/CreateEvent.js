import { createPage } from '../../utils/functions/createPage';
import './CreateEvent.css';

export const CreateEvent = () => {
  const div = createPage('create-event');
  div.innerHTML = `<h1>Crear eventos</h1>`;
};
