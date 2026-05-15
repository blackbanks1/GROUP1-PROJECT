/**
 * @license
 * SPDX-License-Identifier-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import StudentDashboard from '@/pages/student/Dashboard';
import CareerHub from '@/pages/student/CareerHub';

import CompanyDashboard from '@/pages/company/Dashboard';
import LecturerDashboard from '@/pages/lecturer/Dashboard';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsers from '@/pages/admin/Users';
import FeedPage from '@/pages/shared/Feed';
import MessagingPage from '@/pages/shared/Messaging';
import ProfilePage from '@/pages/shared/Profile';
import NotificationsPage from '@/pages/shared/Notifications';
import SettingsPage from '@/pages/shared/Settings';
import HelpCenterPage from '@/pages/shared/HelpCenter';

export default function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/messages" element={<MessagingPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            
            {/* Student Specific Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/career" element={<CareerHub />} />
            
            {/* Other Roles Dashboards */}
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </TooltipProvider>
  );
}

