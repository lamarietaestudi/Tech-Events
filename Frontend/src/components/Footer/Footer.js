import './Footer.css';
import { footerData } from '../../data/footerData';
import { openModal } from '../../utils/functions/modalFunctions';

export const Footer = () => {
  const footer = document.createElement('footer');
  footer.id = 'footer';

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const aboutUsSection = document.createElement('div');
  aboutUsSection.classList.add('about-us-section');
  const aboutUsTitle = document.createElement('h3');
  aboutUsTitle.textContent = 'Sobre nosotros';
  aboutUsSection.append(aboutUsTitle);
  const aboutUsText = document.createElement('p');
  aboutUsText.textContent = footerData[1].links[0].text;
  aboutUsSection.append(aboutUsText);

  const contactAndLegalSection = document.createElement('div');
  contactAndLegalSection.classList.add('contact-legal-section');

  const contactSection = document.createElement('div');
  contactSection.classList.add('contact-section');
  const contactTitle = document.createElement('h3');
  contactTitle.textContent = 'Contacto';
  contactSection.append(contactTitle);
  const contactList = document.createElement('ul');
  footerData[0].links.forEach((link) => {
    const listItem = document.createElement('li');
    let linkElement;
    if (link.href) {
      if (link.href.startsWith('mailto')) {
        linkElement = document.createElement('a'); // Email como enlace <a>
        linkElement.href = link.href;
      } else {
        linkElement = document.createElement('button'); // Otros enlaces como botones
        linkElement.addEventListener('click', () => {
          window.location.href = link.href;
        });
      }
    } else {
      linkElement = document.createElement('span'); // Teléfono como texto plano <span>
    }
    linkElement.textContent = link.text;
    listItem.append(linkElement);
    contactList.append(listItem);
  });
  contactSection.append(contactList);

  const legalSection = document.createElement('div');
  legalSection.classList.add('legal-section');
  const legalTitle = document.createElement('h3');
  legalTitle.textContent = 'Información legal';
  legalSection.append(legalTitle);
  const legalList = document.createElement('ul');
  footerData[2].links.forEach((link) => {
    const listItem = document.createElement('li');
    const linkButton = document.createElement('button');
    linkButton.textContent = link.text;
    linkButton.addEventListener('click', () => {
      openModal(link.text, link.content);
    });
    listItem.append(linkButton);
    legalList.append(listItem);
  });
  legalSection.append(legalList);

  contactAndLegalSection.append(contactSection);
  contactAndLegalSection.append(legalSection);

  footerContainer.append(aboutUsSection);
  footerContainer.append(contactAndLegalSection);

  footer.append(footerContainer);

  const copyright = document.createElement('div');
  copyright.classList.add('footer-copyright');
  copyright.innerHTML = `&copy; ${new Date().getFullYear()} Tech Events`;
  footer.append(copyright);

  const app = document.getElementById('app');
  app.append(footer);
};
