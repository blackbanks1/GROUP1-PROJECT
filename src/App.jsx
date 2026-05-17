/**
 * @license
 * SPDX-License-Identifier-2.0
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Layouts
import DashboardLayout from '@/layouts/DashboardLayout';

// Core Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Student Pages
import StudentDashboard from '@/pages/student/Dashboard';
import CareerHub from '@/pages/student/CareerHub';
import LearningHub from '@/pages/student/LearningHub';
import Portfolio from '@/pages/student/Portfolio';
import Applications from '@/pages/student/Applications';
import InternshipTracker from '@/pages/student/InternshipTracker';
import Events from '@/pages/student/Events';
import Certificates from '@/pages/student/Certificates';
import Mentorship from '@/pages/student/Mentorship';
import Network from '@/pages/student/Network';
import Roadmap from '@/pages/student/Roadmap';
import Saved from '@/pages/student/Saved';

// Company Pages
import CompanyDashboard from '@/pages/company/Dashboard';

// Lecturer Pages
import LecturerDashboard from '@/pages/lecturer/Dashboard';
import LecturerStudents from '@/pages/lecturer/Students';
import LecturerReports from '@/pages/lecturer/Reports';

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsers from '@/pages/admin/Users';

// Shared Pages
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
            <Route path="/student/learning" element={<LearningHub />} />
            <Route path="/student/portfolio" element={<Portfolio />} />
            <Route path="/student/applications" element={<Applications />} />
            <Route path="/student/internship" element={<InternshipTracker />} />
            <Route path="/student/events" element={<Events />} />
            <Route path="/student/certificates" element={<Certificates />} />
            <Route path="/student/mentorship" element={<Mentorship />} />
            <Route path="/student/network" element={<Network />} />
            <Route path="/student/roadmap" element={<Roadmap />} />
            <Route path="/student/saved" element={<Saved />} />
            
            {/* Other Roles Dashboards */}
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
            <Route path="/lecturer/students" element={<LecturerStudents />} />
            <Route path="/lecturer/reports" element={<LecturerReports />} />
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
