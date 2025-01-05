import React from 'react';
import { observer } from 'mobx-react-lite';
import { 
  AppBar, 
  Toolbar, 
  IconButton,
  useTheme,
  Box
} from '@mui/material';
import { Sun, Moon, Menu } from 'lucide-react';
import { themeStore } from '../../../stores/themeStore';
import { Logo } from '../Logo/Logo';
import { LanguageSwitch } from './LanguageSwitch';
import { ProfileMenu } from './ProfileMenu';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = observer<HeaderProps>(({ onToggleSidebar }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: themeStore.primaryColor 
      }}
    >
      <Toolbar className="flex justify-between">
        <Box className="flex items-center gap-4">
          <Logo />
          <IconButton 
            color="inherit"
            onClick={onToggleSidebar}
            className="ml-4"
            size="small"
          >
            <Menu size={24} />
          </IconButton>
        </Box>
        <Box className="flex items-center gap-2">
          <LanguageSwitch />
          <IconButton 
            color="inherit" 
            onClick={() => themeStore.toggleTheme()}
          >
            {themeStore.isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
});