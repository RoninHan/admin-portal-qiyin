import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton
} from '@mui/material';

const menuItems = [
  { path: '/dashboard', icon: <Home size={24} />, label: 'Dashboard' },
  { path: '/users', icon: <Users size={24} />, label: 'Users' },
  { path: '/settings', icon: <Settings size={24} />, label: 'Settings' },
];

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  return (
    <Drawer
      variant="permanent"
      className={`transition-all duration-300 ${
        open ? 'w-64' : 'w-20'
      }`}
      sx={{
        width: open ? 240 : 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 80,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
        },
      }}
    >
      <div className="flex justify-end p-2">
        <IconButton onClick={onToggle}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            component={NavLink}
            to={item.path}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};