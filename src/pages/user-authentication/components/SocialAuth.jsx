import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuth = ({ onSocialAuth, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  const handleSocialLogin = (provider) => {
    onSocialAuth(provider);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            onClick={() => handleSocialLogin(provider?.id)}
            disabled={isLoading}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-smooth hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor}`}
          >
            <Icon name={provider?.icon} size={18} />
            <span className="text-sm font-medium">{provider?.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;