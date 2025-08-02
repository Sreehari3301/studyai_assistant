import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationStateContext = createContext();

export const useNavigationState = () => {
  const context = useContext(NavigationStateContext);
  if (!context) {
    throw new Error('useNavigationState must be used within NavigationStateManager');
  }
  return context;
};

const initialState = {
  activeTab: '/chat-interface',
  navigationHistory: [],
  crossScreenData: {
    aiGeneratedContent: null,
    selectedNotes: [],
    studySession: null,
    flashcardProgress: {}
  },
  loadingStates: {
    navigation: false,
    dataSync: false
  },
  notifications: {
    count: 0,
    items: []
  },
  userPreferences: {
    theme: 'light',
    notifications: true,
    autoSave: true
  }
};

const navigationReducer = (state, action) => {
  switch (action?.type) {
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action?.payload,
        navigationHistory: [...state?.navigationHistory?.slice(-9), action?.payload]
      };

    case 'SET_CROSS_SCREEN_DATA':
      return {
        ...state,
        crossScreenData: {
          ...state?.crossScreenData,
          ...action?.payload
        }
      };

    case 'SET_LOADING_STATE':
      return {
        ...state,
        loadingStates: {
          ...state?.loadingStates,
          [action?.payload?.type]: action?.payload?.loading
        }
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: {
          count: state?.notifications?.count + 1,
          items: [action?.payload, ...state?.notifications?.items?.slice(0, 9)]
        }
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: {
          count: 0,
          items: []
        }
      };

    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        userPreferences: {
          ...state?.userPreferences,
          ...action?.payload
        }
      };

    case 'SYNC_AI_CONTENT':
      return {
        ...state,
        crossScreenData: {
          ...state?.crossScreenData,
          aiGeneratedContent: action?.payload
        }
      };

    case 'UPDATE_STUDY_SESSION':
      return {
        ...state,
        crossScreenData: {
          ...state?.crossScreenData,
          studySession: action?.payload
        }
      };

    case 'UPDATE_FLASHCARD_PROGRESS':
      return {
        ...state,
        crossScreenData: {
          ...state?.crossScreenData,
          flashcardProgress: {
            ...state?.crossScreenData?.flashcardProgress,
            ...action?.payload
          }
        }
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
};

const NavigationStateManager = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: location.pathname });
  }, [location.pathname]);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences });
      } catch (error) {
        console.error('Failed to load user preferences:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(state?.userPreferences));
  }, [state?.userPreferences]);

  const setActiveTab = (tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const setCrossScreenData = (data) => {
    dispatch({ type: 'SET_CROSS_SCREEN_DATA', payload: data });
  };

  const setLoadingState = (type, loading) => {
    dispatch({ type: 'SET_LOADING_STATE', payload: { type, loading } });
  };

  const addNotification = (notification) => {
    const notificationWithId = {
      id: Date.now(),
      timestamp: new Date()?.toISOString(),
      ...notification
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: notificationWithId });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const updateUserPreferences = (preferences) => {
    dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences });
  };

  const syncAIContent = (content) => {
    dispatch({ type: 'SYNC_AI_CONTENT', payload: content });
    
    // Auto-save to localStorage for persistence
    if (state?.userPreferences?.autoSave) {
      try {
        const existingContent = JSON.parse(localStorage.getItem('aiContent') || '[]');
        const updatedContent = [content, ...existingContent?.slice(0, 49)]; // Keep last 50
        localStorage.setItem('aiContent', JSON.stringify(updatedContent));
      } catch (error) {
        console.error('Failed to save AI content:', error);
      }
    }
  };

  const updateStudySession = (session) => {
    dispatch({ type: 'UPDATE_STUDY_SESSION', payload: session });
  };

  const updateFlashcardProgress = (progress) => {
    dispatch({ type: 'UPDATE_FLASHCARD_PROGRESS', payload: progress });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const getNavigationBadgeCount = (tab) => {
    switch (tab) {
      case '/chat-interface':
        return state?.crossScreenData?.aiGeneratedContent ? 1 : 0;
      case '/study-notes-management':
        return state?.crossScreenData?.selectedNotes?.length;
      case '/study-dashboard':
        return state?.crossScreenData?.studySession ? 1 : 0;
      default:
        return 0;
    }
  };

  const value = {
    ...state,
    setActiveTab,
    setCrossScreenData,
    setLoadingState,
    addNotification,
    clearNotifications,
    updateUserPreferences,
    syncAIContent,
    updateStudySession,
    updateFlashcardProgress,
    resetState,
    getNavigationBadgeCount
  };

  return (
    <NavigationStateContext.Provider value={value}>
      {children}
    </NavigationStateContext.Provider>
  );
};

export default NavigationStateManager;