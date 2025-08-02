import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'chat',
      label: 'Chat',
      path: '/chat-interface',
      icon: 'MessageCircle',
      activeIcon: 'MessageCircle'
    },
    {
      id: 'cards',
      label: 'Cards',
      path: '/flashcards',
      icon: 'CreditCard',
      activeIcon: 'CreditCard'
    },
    {
      id: 'notes',
      label: 'Notes',
      path: '/study-notes-management',
      icon: 'FileText',
      activeIcon: 'FileText'
    },
    {
      id: 'study',
      label: 'Study',
      path: '/study-dashboard',
      icon: 'Clock',
      activeIcon: 'Clock'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg ${className}`}>
      <div className="safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 px-2 sm:px-4">
          {tabs?.map((tab) => {
            const isActive = isActiveTab(tab?.path);
            
            return (
              <button
                key={tab?.id}
                onClick={() => handleTabClick(tab?.path)}
                className={`flex flex-col items-center justify-center space-y-1 px-2 sm:px-3 py-2 rounded-lg transition-smooth min-w-0 flex-1 max-w-20 sm:max-w-24 ${
                  isActive 
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={isActive ? tab?.activeIcon : tab?.icon} 
                  size={20}
                  className={isActive ? 'text-primary' : 'text-current'}
                />
                <span className={`text-xs font-medium truncate ${
                  isActive ? 'text-primary' : 'text-current'
                }`}>
                  {tab?.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomTabNavigation;