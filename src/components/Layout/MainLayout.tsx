import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Header } from './Header';
import { Sidebar } from './Sidebar/Sidebar';
import { themeStore } from '../../stores/themeStore';

export const MainLayout = observer(() => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = createTheme({
    palette: {
      mode: themeStore.isDarkMode ? 'dark' : 'light',
      primary: {
        main: themeStore.primaryColor,
      },
    },
  });

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="flex h-screen">
        <Header onToggleSidebar={handleToggleSidebar} />
        <Sidebar
          open={sidebarOpen}
          onToggle={handleToggleSidebar}
        />
        <Box
          component="main"
          className={`flex-grow p-6 mt-16 transition-all duration-300 `}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
});