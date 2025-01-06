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
    <NavLink to={path} className={({ isActive }) =>
      `hover:bg-[#7fbefc]  dark:hover:bg-gray-700 ${isActive ? 'bg-[#449ffa] dark:bg-gray-700' : ''
      }`
    }>
      {
        ({ isActive }) => (
          <ListItem
            component={NavLink}
            to={path}
            className={`hover:bg-[#7fbefc]  dark:hover:bg-gray-700 ${isActive ? 'bg-[#449ffa] dark:bg-gray-700' : ''
              }`}
          >
            <ListItemIcon >{icon}</ListItemIcon>
            {isOpen && <ListItemText primary={label} />}
          </ListItem>
        )
      }
    </NavLink>

  );

  return isOpen ? item : (
    <Tooltip title={label} placement="right">
      {item}
    </Tooltip>
  );
};