import React from 'react';
import { Facebook } from 'lucide-react';
import { useFacebookAuth } from '../hooks/useFacebookAuth';

export default function FacebookConnect() {
  const { isLoading, accessToken, login, logout } = useFacebookAuth();

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Facebook Ads Connection</h2>
          <p className="mt-1 text-sm text-gray-500">
            {accessToken 
              ? 'Connected to Facebook Ads'
              : 'Connect your Facebook Ads account to view your campaign data'}
          </p>
        </div>
        <button
          onClick={accessToken ? logout : login}
          disabled={isLoading}
          className={`inline-flex items-center gap-x-2 rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm ${
            accessToken
              ? 'bg-red-600 text-white hover:bg-red-500'
              : 'bg-[#1877F2] text-white hover:bg-[#0C63D4]'
          }`}
        >
          <Facebook className="h-5 w-5" />
          {isLoading 
            ? 'Loading...'
            : accessToken 
              ? 'Disconnect'
              : 'Connect Facebook Ads'
          }
        </button>
      </div>
    </div>
  );
}