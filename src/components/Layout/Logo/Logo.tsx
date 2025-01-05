import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Box, Typography } from '@mui/material';

export const Logo: React.FC = () => {
  return (
    <Box className="flex items-center gap-2">
      <LayoutDashboard size={32} className="text-white" />
      <Typography
        variant="h6"
        component="div"
        className="text-white font-medium hidden md:block"
      >
        Admin Dashboard
      </Typography>
    </Box>
  );
};