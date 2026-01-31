import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import LoginSelection from './pages/LoginSelection';
import PatientLogin from './pages/PatientLogin';
import DoctorLogin from './pages/DoctorLogin';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import DoctorRegister from './pages/DoctorRegister'; 
import DoctorDashboard from './pages/DoctorDashboard';
import AuditHistory from './pages/AuditHistory';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Vault...</div>;
  if (!user) return <Navigate to="/login" />;

  // Role based protection
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'doctor' ? '/doctor-dashboard' : '/dashboard'} />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Login Routes */}
          <Route path="/login" element={<LoginSelection />} />
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/login/doctor" element={<DoctorLogin />} />
          <Route path="/register/patient" element={<Register />} />
          <Route path="/register/doctor" element={<DoctorRegister />} />

          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } />

          <Route path="/doctor-dashboard" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />

          <Route path="/audit" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <AuditHistory />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
