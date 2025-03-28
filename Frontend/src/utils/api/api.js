const url = 'http://localhost:3000/api/v1/';

export const API = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true
}) => {
  const headers = {};

  if (isJSON) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  const res = await fetch(url + endpoint, {
    body: body,
    method,
    headers
  });

  const response = await res.json();
  return response;
};
