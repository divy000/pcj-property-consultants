
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

// Public website components
import { EnquiryModalProvider } from './context/EnquiryModalContext';
import { Layout } from './components/layout/Layout';

// Public website pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { LocationsPage } from './pages/LocationsPage';
import { ContactPage } from './pages/ContactPage';

// Admin components and pages
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { PropertiesManagement } from './admin/PropertiesManagement';
import { ProjectsManagement } from './admin/ProjectsManagement';
import { EnquiriesManagement } from './admin/EnquiriesManagement';
import { LocationsManagement } from './admin/LocationsManagement';

export const App: React.FC = () => {
  return (
    <Router>
      <EnquiryModalProvider>
        <Routes>

          {/* Admin Login */}
          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* Admin Dashboard and Management Pages */}
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="properties"
              element={<PropertiesManagement />}
            />

            <Route
              path="projects"
              element={<ProjectsManagement />}
            />

            <Route
              path="enquiries"
              element={<EnquiriesManagement />}
            />

            <Route
              path="locations"
              element={<LocationsManagement />}
            />
          </Route>

          {/* Public Website Pages */}
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/about"
              element={<AboutPage />}
            />

            <Route
              path="/properties"
              element={<PropertiesPage />}
            />

            <Route
              path="/services"
              element={<ServicesPage />}
            />

            <Route
              path="/projects"
              element={<ProjectsPage />}
            />

            <Route
              path="/locations"
              element={<LocationsPage />}
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />
          </Route>

          {/* Redirect Unknown URLs to Homepage */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </EnquiryModalProvider>
    </Router>
  );
};

export default App;
