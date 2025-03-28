import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export const formToggle = (
  showLogin,
  form,
  title,
  message,
  createAccountButton
) => {
  showLogin = !showLogin;
  showLogin ? LoginForm(form) : RegisterForm(form);
  title.textContent = showLogin
    ? 'Rellena los campos para acceder a tu cuenta'
    : 'Rellena los campos para crear tu cuenta';
  message.textContent = showLogin
    ? 'Si aún no tienes una cuenta, puedes crearla aquí.'
    : '¿Ya tienes una cuenta? Accede desde aquí.';
  createAccountButton.textContent = showLogin
    ? 'Crear cuenta'
    : 'Acceder a mi cuenta';

  if (showLogin) {
    form.className = 'login-form';
  } else {
    form.className = 'register-form';
  }
  return showLogin;
};
