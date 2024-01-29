import { IUser } from './types';

export function getUser(email: string) {
  const usersStorageString = localStorage.getItem('us_db');
  const users = usersStorageString ? JSON.parse(usersStorageString) : [];

  return users?.filter((user: { email: string }) => user.email === email);
}

export function getUserTokenLocalStorage() {
  const json = localStorage.getItem('ut');

  if (!json) {
    return null;
  }

  const userToken = JSON.parse(json);
  return userToken ?? null;
}

export function getUsersDBLocalStorage() {
  const json = localStorage.getItem('us_db');

  if (!json) {
    return null;
  }

  const users = JSON.parse(json);
  return users ?? null;
}

export function removeUserTokenLocalStorage() {
  localStorage.removeItem('ut');
}

export function setUserLocalStorage(user: IUser | null) {
  const usersStorageString = localStorage.getItem('us_db');
  const users = usersStorageString ? JSON.parse(usersStorageString) : [];

  if (users) {
    localStorage.setItem('us_db', JSON.stringify([...users, user]));
  } else {
    localStorage.setItem('us_db', JSON.stringify([user]));
  }
}
