import { useState, useEffect } from 'react';
import { initFacebookSDK } from '../lib/facebook-auth';

export function useFacebookAuth() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    initFacebookSDK().then(() => setIsInitialized(true));
  }, []);

  const login = async () => {
    if (!isInitialized) return;

    setIsLoading(true);
    try {
      const response = await new Promise((resolve) => {
        FB.login(resolve, {
          scope: 'ads_management,ads_read',
          return_scopes: true
        });
      });

      if (response.authResponse) {
        setAccessToken(response.authResponse.accessToken);
        return response.authResponse.accessToken;
      }
    } catch (error) {
      console.error('Facebook login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!isInitialized) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => {
        FB.logout(resolve);
      });
      setAccessToken(null);
    } catch (error) {
      console.error('Facebook logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    accessToken,
    login,
    logout
  };
}