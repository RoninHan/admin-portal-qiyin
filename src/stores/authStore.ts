import { makeAutoObservable } from 'mobx';
import { post, setToken } from '../http';

class AuthStore {
  isAuthenticated = false;
  user: null | { username: string } = null;

  constructor() {
    makeAutoObservable(this);
  }

  login = async (email: string, password: string) => {
    // In a real app, you would make an API call here
    if (email && password) {
      let result: any = await post('/api/login', { email, password });
      if (result.status === 'success') {
        setToken(result.token);
        this.isAuthenticated = true;
        this.user = { username: result.username };
      }
    }
  };

  logout = () => {
    this.isAuthenticated = false;
    this.user = null;
  };
}

export const authStore = new AuthStore();