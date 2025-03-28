import './Buttons.css';

export const primaryButton = ({ text, fnc }) => {
  const button = document.createElement('button');
  button.classList.add('button', 'primary-button');
  button.textContent = text;
  button.addEventListener('click', fnc);
  return button;
};

export const secondaryButton = ({ text, fnc }) => {
  const button = document.createElement('button');
  button.classList.add('button', 'secondary-button');
  button.textContent = text;
  button.addEventListener('click', fnc);
  return button;
};

export const disabledButton = ({ text, fnc }) => {
  const button = document.createElement('button');
  button.classList.add('button', 'disabled-button');
  button.textContent = text;
  button.addEventListener('click', fnc);
  return button;
};

export const neutralButton = ({ text, fnc }) => {
  const button = document.createElement('button');
  button.classList.add('button', 'neutral-button');
  button.textContent = text;
  button.addEventListener('click', fnc);
  return button;
};
