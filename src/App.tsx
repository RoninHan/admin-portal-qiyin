import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { MainLayout } from './components/Layout/MainLayout';
import { Login } from './pages/Login';
import { authStore } from './stores/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const App = observer(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <div className="p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Welcome to your dashboard!</p>
              </div>
            }
          />
          <Route
            path="users"
            element={
              <div className="p-4">
                <h1 className="text-2xl font-bold">Users</h1>
                <p>User management page</p>
              </div>
            }
          />
          <Route
            path="settings"
            element={
              <div className="p-4">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p>Application settings</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default App;