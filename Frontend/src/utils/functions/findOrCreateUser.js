import { API } from '../api/api';

export const findOrCreateUser = async (userData) => {
  try {
    const data = await API({
      endpoint: 'users',
      method: 'POST',
      body: userData
    });
    return data;
  } catch (error) {
    throw error;
  }
};
