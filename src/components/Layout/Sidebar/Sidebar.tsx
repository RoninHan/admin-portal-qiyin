import React from 'react';
import { 
  Drawer, 
  List, 
  useTheme
} from '@mui/material';
import { MenuItem } from './MenuItem';
import { menuItems } from './menuItems';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className="transition-all duration-300"
      sx={{
        width: open ? 240 : 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 80,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          backgroundColor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <div className="mt-16" />
      <List className="mt-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            path={item.path}
            icon={<item.icon size={24} />}
            label={item.label}
            isOpen={open}
          />
        ))}
      </List>
    </Drawer>
  );
};