import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleMenu}>
        <Languages size={20} />
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
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage('zh')}>中文</MenuItem>
      </Menu>
    </>
  );
};