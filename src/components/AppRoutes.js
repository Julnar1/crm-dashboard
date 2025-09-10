import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ForgotPasswordConfirmation from '../pages/ForgotPasswordConfirmation';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import CompanyList from '../pages/CompanyList';
import CompanyView from '../pages/CompanyView';
import NotFound from '../pages/NotFound';
import LeadsPage from '../pages/leads/LeadsPage';
import LeadView from '../pages/leads/LeadView';

// Placeholder components for deleted pages
const DealsPage = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body text-center py-5">
            <div className="mb-4">
              <i className="bi bi-graph-up" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
            </div>
            <h4 className="text-muted">Deals Module Coming Soon</h4>
            <p className="text-muted mb-0">Converted leads and new deals will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TicketsPage = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body text-center py-5">
            <div className="mb-4">
              <i className="bi bi-ticket-perforated" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
            </div>
            <h4 className="text-muted">Tickets Module Coming Soon</h4>
            <p className="text-muted mb-0">Manage customer support tickets and issues here.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  // Public Route component (redirects to dashboard if already authenticated)
  const PublicRoute = ({ children }) => {
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/forgot-password" element={
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      } />
      <Route path="/forgot-password-confirmation" element={
        <PublicRoute>
          <ForgotPasswordConfirmation />
        </PublicRoute>
      } />
      <Route path="/reset-password/:token" element={
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="leads/:id" element={<LeadView />} />
        <Route path="companies" element={<CompanyList />} />
        <Route path="companies/:id" element={<CompanyView />} />
        <Route path="deals" element={<DealsPage />} />
        <Route path="tickets" element={<TicketsPage />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
