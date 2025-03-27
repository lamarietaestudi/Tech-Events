import './Content.css';

export const Content = () => {
  const content = document.createElement('content');
  content.id = 'content';

  const app = document.getElementById('app');
  app.append(content);
};
