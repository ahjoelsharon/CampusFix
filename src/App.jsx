import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Unauthorized from './pages/public/Unauthorized';
import NotFound from './pages/public/NotFound';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentComplaints from './pages/student/Complaints';
import NewComplaint from './pages/student/NewComplaint';
import StudentComplaintDetails from './pages/student/ComplaintDetails';
import StudentProfile from './pages/student/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminComplaints from './pages/admin/Complaints';
import AdminComplaintDetails from './pages/admin/ComplaintDetails';
import AdminProfile from './pages/admin/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Student Routes */}
          <Route element={<DashboardLayout allowedRoles={['STUDENT']} />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/complaints" element={<StudentComplaints />} />
            <Route path="/student/complaints/new" element={<NewComplaint />} />
            <Route path="/student/complaints/:id" element={<StudentComplaintDetails />} />
            <Route path="/student/profile" element={<StudentProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<DashboardLayout allowedRoles={['ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
            <Route path="/admin/complaints/:id" element={<AdminComplaintDetails />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
