import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthenticationGuard from "components/ui/AuthenticationGuard";
import NotFound from "pages/NotFound";
import StudyNotesManagement from './pages/study-notes-management';
import ChatInterface from './pages/chat-interface';
import UserAuthentication from './pages/user-authentication';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AuthenticationGuard>
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<ChatInterface />} />
            <Route path="/study-notes-management" element={<StudyNotesManagement />} />
            <Route path="/chat-interface" element={<ChatInterface />} />
            <Route path="/user-authentication" element={<UserAuthentication />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthenticationGuard>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;