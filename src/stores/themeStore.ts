import { makeAutoObservable } from 'mobx';

class ThemeStore {
  isDarkMode = false;
  primaryColor = '#1976d2';

  constructor() {
    makeAutoObservable(this);
  }

  toggleTheme = () => {
    this.isDarkMode = !this.isDarkMode;
  };

  setPrimaryColor = (color: string) => {
    this.primaryColor = color;
  };
}

export const themeStore = new ThemeStore();