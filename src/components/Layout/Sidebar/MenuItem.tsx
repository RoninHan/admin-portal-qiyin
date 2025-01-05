import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';

interface MenuItemProps {
  path: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ path, icon, label, isOpen }) => {
  const item = (
    <ListItem
      component={NavLink}
      to={path}
      className={({ isActive }) => 
        `hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`
      }
    >
      <ListItemIcon>{icon}</ListItemIcon>
      {isOpen && <ListItemText primary={label} />}
    </ListItem>
  );

  return isOpen ? item : (
    <Tooltip title={label} placement="right">
      {item}
    </Tooltip>
  );
};