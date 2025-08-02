import React, { useState } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();

  const handleLogin = async (formData) => {
    setError('');
    
    // Mock credentials for testing
    const validCredentials = {
      email: 'student@studyai.com',
      password: 'study123'
    };

    if (formData?.email !== validCredentials?.email || formData?.password !== validCredentials?.password) {
      setError('Invalid credentials. Use student@studyai.com / study123');
      return;
    }

    const result = await login(formData);
    if (!result?.success) {
      setError(result?.error || 'Login failed. Please try again.');
    }
  };

  const handleRegister = async (formData) => {
    setError('');
    const result = await register(formData);
    if (!result?.success) {
      setError(result?.error || 'Registration failed. Please try again.');
    }
  };

  const handleSocialAuth = async (provider) => {
    setError('');
    
    // Mock social authentication
    const mockSocialData = {
      email: `user@${provider}.com`,
      password: 'social123'
    };

    const result = await login(mockSocialData);
    if (!result?.success) {
      setError(`${provider} authentication failed. Please try again.`);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-card p-8">
          <AuthHeader />
          
          <AuthTabs 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />

          {activeTab === 'login' ? (
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegister}
              isLoading={isLoading}
              error={error}
            />
          )}

          <div className="mt-8">
            <SocialAuth
              onSocialAuth={handleSocialAuth}
              isLoading={isLoading}
            />
          </div>

          {activeTab === 'login' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => handleTabChange('register')}
                  className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => handleTabChange('login')}
                  className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  disabled={isLoading}
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;