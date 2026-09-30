import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Unauthorized() {
  const { profile } = useAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Unauthorized Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You do not have permission to access this page.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to={profile?.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
