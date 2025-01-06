import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { MainLayout } from './components/Layout/MainLayout';
import { Login } from './pages/Login';
import { authStore } from './stores/authStore';
import UserPage from './pages/user/page';
import SongTypePage from './pages/songType/page';
import SettingPage from './pages/setting/page';
import SongPage from './pages/song/page';

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
            element={<UserPage />}
          />

          <Route
            path="songType"
            element={<SongTypePage />}
          />
          <Route
            path="song"
            element={<SongPage />}
          />
          <Route
            path="settings"
            element={<SettingPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default App;