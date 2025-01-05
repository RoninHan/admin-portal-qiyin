import React from 'react';
import { Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Settings, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { authStore } from '../../../stores/authStore';

export const ProfileMenu: React.FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authStore.logout();
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleMenu}
        size="small"
        className="ml-2"
      >
        <Avatar 
          sx={{ width: 32, height: 32 }}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings size={20} />
          </ListItemIcon>
          <ListItemText>{t('profile.settings')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut size={20} />
          </ListItemIcon>
          <ListItemText>{t('profile.logout')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};