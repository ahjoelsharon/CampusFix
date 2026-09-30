import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-9xl font-extrabold text-blue-600">
            404
          </h2>
          <h3 className="mt-4 text-2xl font-bold text-gray-900">
            Page Not Found
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
