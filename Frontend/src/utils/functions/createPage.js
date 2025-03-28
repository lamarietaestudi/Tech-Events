export const createPage = (id) => {
  const content = document.querySelector('#content');
  const div = document.createElement('div');
  content.innerHTML = '';
  div.id = id;
  content.append(div);
  return div;
};
