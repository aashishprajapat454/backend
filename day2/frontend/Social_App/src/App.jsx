import { useState } from 'react';
import axios from 'axios';

export default function UserForm() {
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 1. Added loading state

  const getUser = async (e) => {
    e.preventDefault();
    setError('');
    setUserData(null); // Clear previous data immediately on new search

    if (!input.trim()) {
      setError('Please enter a valid user ID.');
      return;
    }

    setLoading(true); // Start loading animation

    try {
      const response = await axios.get(`/api/user/${input}`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      // Give cleaner error feedback based on status
      if (error.response && error.response.status === 404) {
        setError(`User "${input}" could not be found.`);
      } else {
        setError('Failed to connect to the server. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 flex flex-col items-center">

      {/* Header & Search Bar Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">User Directory</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Search for a team member by entering their unique ID</p>

        <form onSubmit={getUser} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g., usr_101"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md">

        {/* 2. Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm animate-fade-in">
            <span className="text-base">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* 3. Skeleton Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 animate-pulse">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-10 bg-gray-100 rounded-xl"></div>
              <div className="h-10 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
        )}

        {/* 4. Beautiful Profile Layout */}
        {userData && !loading && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            {/* Top decorative accent bar */}
            <div className="h-2 bg-gradient-to-r bg-blue-600"></div>

            <div className="p-6">
              {/* Identity Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-xl shadow-inner">
                  {(userData.name || input).charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{userData.name || 'Anonymous User'}</h3>
                  <span className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-600 font-mono text-xs rounded-full mt-1 border">
                    {userData.id || input}
                  </span>
                </div>
              </div>

              {/* Data Grid with Clean Styling */}
              <div className="space-y-3">
                {Object.entries(userData).map(([key, value]) => {
                  // Skip displaying ID again since it is in the header badge
                  if (key === 'id') return null;

                  return (
                    <div key={key} className="bg-gray-50/70 hover:bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex justify-between items-center transition-colors">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{key}</span>
                      <span className="text-sm font-medium text-gray-700 max-w-[240px] truncate">
                        {typeof value === "object" ? JSON.stringify(value) : String(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 5. Clean Empty State */}
        {!userData && !loading && !error && (
          <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-2xl text-gray-400">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-sm">No profile data pulled yet. Search above to begin.</p>
          </div>
        )}
      </div>

    </div>
  );
}