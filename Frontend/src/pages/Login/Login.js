import { neutralButton } from '../../components/Buttons/Buttons';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { createPage } from '../../utils/functions/createPage';
import { formToggle } from '../../utils/functions/formToggle';
import { handleLogin } from '../../utils/functions/handleLogin';
import { handleRegister } from '../../utils/functions/handleRegister';
import './Login.css';

let showLogin = true;
export const Login = () => {
  const div = createPage('login');
  const form = document.createElement('form');
  const title = document.createElement('h2');
  const message = document.createElement('p');
  const createAccountButton = neutralButton({
    text: 'Crear cuenta',
    fnc: toggleForm
  });

  title.textContent = 'Rellena los campos para acceder a tu cuenta';
  message.textContent = 'Si aún no tienes una cuenta puedes crearla aquí.';

  div.append(title);
  div.append(form);
  div.append(message);
  div.append(createAccountButton);

  form.addEventListener('submit', (event) => {
    showLogin ? handleLogin(event, form) : handleRegister(event, form);
  });

  LoginForm(form);

  function toggleForm() {
    showLogin = formToggle(
      showLogin,
      form,
      title,
      message,
      createAccountButton
    );
  }
};
