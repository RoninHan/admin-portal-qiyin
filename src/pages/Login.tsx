import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { authStore } from '../stores/authStore';

export const Login = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    authStore.login(username, password);
    if (authStore.isAuthenticated) {
      navigate('/dashboard');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        className="min-h-screen flex items-center justify-center"
      >
        <Card className="p-8 w-full">
          <Typography component="h1" variant="h5" className="text-center mb-6">
            Admin Login
          </Typography>
          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              Sign In
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
});