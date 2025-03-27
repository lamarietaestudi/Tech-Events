import './Modal.css';
import { closeModal } from '../../utils/functions/modalFunctions';

export const Modal = ({ title, content }) => {
  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const titleElement = document.createElement('h2');
  titleElement.textContent = title;

  const contentElement = document.createElement('p');
  contentElement.textContent = content;

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Cerrar';
  closeButton.addEventListener('click', closeModal);

  modalContent.append(titleElement);
  modalContent.append(contentElement);
  modalContent.append(closeButton);
  modal.append(modalContent);

  return modal;
};
