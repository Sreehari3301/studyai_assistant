import React, { useState } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const PersistentHeader = ({ user = null, onProfileClick = () => {} }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    onProfileClick();
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    // Handle logout logic
  };

  const handleSettings = () => {
    setIsProfileOpen(false);
    // Handle settings navigation
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">StudyAI</span>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <Image 
                  src={user?.avatar} 
                  alt={user?.name || 'User'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={16} color="white" />
              )}
            </div>
            <span className="hidden sm:block text-sm font-medium text-foreground">
              {user?.name || 'Student'}
            </span>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal py-2 z-[60]">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">
                  {user?.name || 'Student'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || 'student@example.com'}
                </p>
              </div>
              
              <button
                onClick={handleSettings}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="Settings" size={16} />
                <span>Settings</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PersistentHeader;