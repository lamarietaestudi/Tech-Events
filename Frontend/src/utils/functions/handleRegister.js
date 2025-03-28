import { findOrCreateUser } from './findOrCreateUser';
import { API } from '../api/api';

export const handleRegister = async (event, form) => {
  event.preventDefault();
  const username = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  const avatar = form.querySelector('input[type="file"]').files[0];

  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('avatar', avatar);

  try {
    const result = await API({
      endpoint: 'users',
      method: 'POST',
      body: formData,
      isJSON: false
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
