import './HomeEvents.css';

export const HomeEvents = () => {
  const content = document.querySelector('#content');
  const div = document.createElement('div');
  div.id = 'home-events';

  content.innerHTML = '';

  content.append(div);
};
