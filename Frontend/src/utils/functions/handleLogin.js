import { findOrCreateUser } from './findOrCreateUser';

export const handleLogin = async (event, form) => {
  event.preventDefault();
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;

  try {
    const result = await findOrCreateUser({ email, password });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
