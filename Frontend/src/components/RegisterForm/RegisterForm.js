import { secondaryButton } from '../Buttons/Buttons';
import { FieldForm } from '../FieldForm/FieldForm';
import './RegisterForm.css';

export const RegisterForm = (form) => {
  form.className = 'register-form';

  form.innerHTML = `
    ${FieldForm({ labelText: 'Nombre de usuario' })}
    ${FieldForm({ labelText: 'Email', type: 'email' })}
    ${FieldForm({ labelText: 'Contraseña', type: 'password' })}
`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'avatar-input';
  avatarDiv.innerHTML = `${FieldForm({ labelText: 'Avatar', type: 'file' })}`;
  form.append(avatarDiv);

  form.append(secondaryButton({ text: 'Confirmar datos' }));
};
