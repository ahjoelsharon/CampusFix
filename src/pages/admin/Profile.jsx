import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { profile } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Profile</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              disabled
              value={profile?.full_name || ''}
              className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm py-2 px-3 text-gray-500 sm:text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              disabled
              value={profile?.email || ''}
              className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm py-2 px-3 text-gray-500 sm:text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <div className="mt-1 flex items-center">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {profile?.role}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Admin roles cannot be changed from the user interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
