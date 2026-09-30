import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export default function Landing() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">CampusFix</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Log in
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Report. Track. Resolve.</span>
            <span className="block text-blue-600">Campus issues made easy.</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            CampusFix makes it easier for students to report campus problems and track them until they are resolved.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
              Report a Problem
            </Link>
            <Link to="/login" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
              Track Complaint
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to solve campus problems
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white mx-auto">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">1. Report</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Student reports a campus issue with location and category.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white mx-auto">
                    <Clock className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">2. Track</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Student receives a complaint ID and tracks progress in real-time.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white mx-auto">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">3. Resolve</h3>
                  <p className="mt-2 text-base text-gray-500">
                    College administrators update and resolve the issue efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} CampusFix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
