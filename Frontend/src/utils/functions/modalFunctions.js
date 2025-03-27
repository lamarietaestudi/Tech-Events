import { Modal } from '../../components/Modal/Modal';

let currentModal = null;

export const openModal = (title, content) => {
  if (currentModal) {
    return;
  }

  currentModal = Modal({ title, content });
  document.body.append(currentModal);

  const footerLinks = document.querySelectorAll('#footer button');
  footerLinks.forEach((link) => {
    link.disabled = true;
  });
};

export const closeModal = () => {
  if (currentModal) {
    currentModal.remove();
    currentModal = null;

    const footerLinks = document.querySelectorAll('#footer button');
    footerLinks.forEach((link) => {
      link.disabled = false;
    });
  }
};
