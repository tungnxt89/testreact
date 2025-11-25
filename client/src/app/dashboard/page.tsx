'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome, {user?.name || user?.email}!
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg text-gray-900">{user?.email}</p>
                </div>
                {user?.name && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-lg text-gray-900">{user?.name}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="text-lg text-gray-900">{user?.id}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
