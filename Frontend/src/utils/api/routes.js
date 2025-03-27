import { HomeEvents } from '../../pages/HomeEvents/HomeEvents';
import { CreateEvent } from '../../pages/CreateEvent/CreateEvent';
import { Login } from '../../pages/Login/Login';

export const routes = [
  {
    path: '/',
    text: 'Home',
    page: HomeEvents
  },
  {
    path: '/create-event',
    text: 'Añadir Evento',
    page: CreateEvent
  },
  {
    path: '/login',
    text: 'Login',
    page: Login
  }
];
