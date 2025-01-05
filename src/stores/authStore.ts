import { makeAutoObservable } from 'mobx';

class AuthStore {
  isAuthenticated = false;
  user: null | { username: string } = null;

  constructor() {
    makeAutoObservable(this);
  }

  login = (username: string, password: string) => {
    // In a real app, you would make an API call here
    if (username && password) {
      this.isAuthenticated = true;
      this.user = { username };
    }
  };

  logout = () => {
    this.isAuthenticated = false;
    this.user = null;
  };
}

export const authStore = new AuthStore();