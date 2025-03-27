import './CreateEvent.css';

export const CreateEvent = () => {
  const content = document.querySelector('#content');
  const div = document.createElement('div');
  div.id = 'create-event';

  content.innerHTML = '';

  content.append(div);
};
