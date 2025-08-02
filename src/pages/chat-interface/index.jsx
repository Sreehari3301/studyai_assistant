import React, { useState, useRef, useEffect } from 'react';
import PersistentHeader from '../../components/ui/PersistentHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import MessageBubble from './components/MessageBubble';
import AIResponseCard from './components/AIResponseCard';
import ChatInput from './components/ChatInput';
import LoadingIndicator from './components/LoadingIndicator';
import ChatHeader from './components/ChatHeader';
import WelcomeMessage from './components/WelcomeMessage';

const ChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock conversation data
  const mockConversations = [
    {
      id: 1,
      content: "Hi! I need help with my biology homework about photosynthesis. Can you explain the process?",
      isUser: true,
      timestamp: new Date(Date.now() - 3600000),
      attachment: null
    },
    {
      id: 2,
      content: `Photosynthesis is the process by which plants convert light energy into chemical energy. Here's a simple breakdown:\n\n1. **Light Reaction**: Occurs in the thylakoids\n2. **Calvin Cycle**: Takes place in the stroma\n3. **Products**: Glucose and oxygen\n\nThe overall equation is:\n6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂`,
      isUser: false,
      timestamp: new Date(Date.now() - 3580000),
      attachment: null,
      aiCards: [
        {
          type: 'notes',title: 'Photosynthesis Summary',description: 'Complete notes covering light reactions, Calvin cycle, and key equations',
          data: {
            summary: `Photosynthesis is a vital biological process where plants convert light energy into chemical energy. The process occurs in two main stages: light reactions in thylakoids and the Calvin cycle in stroma. Key products include glucose and oxygen.`
          }
        },
        {
          type: 'flashcards',title: 'Biology Flashcards',description: 'Practice cards for photosynthesis concepts and terminology',
          data: {
            cards: [
              { front: 'What is photosynthesis?', back: 'Process of converting light energy to chemical energy' },
              { front: 'Where do light reactions occur?', back: 'In the thylakoids' },
              { front: 'What are the products of photosynthesis?', back: 'Glucose and oxygen' }
            ]
          }
        }
      ]
    },
    {
      id: 3,
      content: "Can you help me create a study plan for my upcoming chemistry exam next week?",
      isUser: true,
      timestamp: new Date(Date.now() - 1800000),
      attachment: {
        name: "chemistry_syllabus.pdf",
        type: "document",
        size: 245760
      }
    },
    {
      id: 4,
      content: `Based on your chemistry syllabus, I've created a comprehensive 7-day study plan:\n\n**Days 1-2**: Atomic Structure & Periodic Table\n**Days 3-4**: Chemical Bonding & Molecular Geometry\n**Days 5-6**: Chemical Reactions & Stoichiometry\n**Day 7**: Review & Practice Tests\n\nEach day includes 2-3 hours of focused study with breaks every 45 minutes.`,
      isUser: false,
      timestamp: new Date(Date.now() - 1780000),
      attachment: null,
      aiCards: [
        {
          type: 'exam-strategy',
          title: 'Chemistry Exam Strategy',
          description: '7-day structured study plan with daily goals and practice sessions',
          data: {
            topics: ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Molecular Geometry', 'Chemical Reactions', 'Stoichiometry']
          }
        }
      ]
    }
  ];

  useEffect(() => {
    // Load mock conversations after component mounts
    const timer = setTimeout(() => {
      setMessages(mockConversations);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateAIResponse = async (userMessage) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock AI response based on user input
    const generateResponse = (content) => {
      const lowerContent = content?.toLowerCase();
      
      if (lowerContent?.includes('flashcard') || lowerContent?.includes('card')) {
        return {
          content: `I'll create flashcards for you! Based on your request, I've generated interactive study cards that will help you memorize key concepts effectively.\n\nEach card includes:\n• Clear questions on the front\n• Detailed answers on the back\n• Progress tracking\n• Spaced repetition scheduling`,
          aiCards: [
            {
              type: 'flashcards',
              title: 'Study Flashcards',
              description: 'Interactive cards generated from your study material',
              data: {
                cards: [
                  { front: 'Sample Question 1', back: 'Sample Answer 1' },
                  { front: 'Sample Question 2', back: 'Sample Answer 2' }
                ]
              }
            }
          ]
        };
      }
      
      if (lowerContent?.includes('note') || lowerContent?.includes('summary')) {
        return {
          content: `I've analyzed your content and created comprehensive study notes. The summary includes key points, important definitions, and structured information to help you understand the topic better.\n\nThe notes are organized with:\n• Main concepts highlighted\n• Supporting details\n• Key terminology\n• Practice questions`,
          aiCards: [
            {
              type: 'notes',
              title: 'Study Notes Summary',
              description: 'Organized notes with key concepts and definitions',
              data: {
                summary: 'Comprehensive study notes covering all major topics and concepts from your material.'
              }
            }
          ]
        };
      }
      
      if (lowerContent?.includes('exam') || lowerContent?.includes('study plan') || lowerContent?.includes('schedule')) {
        return {
          content: `I've created a personalized study strategy for your upcoming exam. This plan is designed to maximize your preparation time and ensure comprehensive coverage of all topics.\n\nYour study plan includes:\n• Daily study goals\n• Topic prioritization\n• Practice session scheduling\n• Review milestones`,
          aiCards: [
            {
              type: 'exam-strategy',
              title: 'Personalized Study Strategy',
              description: 'Custom exam preparation plan with daily goals and milestones',
              data: {
                topics: ['Topic 1', 'Topic 2', 'Topic 3', 'Review Sessions']
              }
            }
          ]
        };
      }
      
      // Default response
      return {
        content: `I understand you're looking for help with your studies. I can assist you with:\n\n• Creating detailed study notes and summaries\n• Generating interactive flashcards\n• Developing personalized exam strategies\n• Answering specific academic questions\n• Organizing your study materials\n\nWhat specific topic would you like to focus on today?`,
        aiCards: []
      };
    };

    const response = generateResponse(userMessage?.content);
    
    const aiMessage = {
      id: Date.now(),
      content: response?.content,
      isUser: false,
      timestamp: new Date(),
      attachment: null,
      aiCards: response?.aiCards
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleSendMessage = async (messageData) => {
    if (!messageData?.content?.trim() && !messageData?.attachment) return;

    const userMessage = {
      id: Date.now(),
      content: messageData?.content,
      isUser: true,
      timestamp: new Date(),
      attachment: messageData?.attachment
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    await simulateAIResponse(userMessage);
    setIsTyping(false);
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file?.name);
  };

  const handleAICardView = (data) => {
    console.log('Viewing AI card data:', data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Persistent Header */}
      <PersistentHeader user={user} />
      
      {/* Chat Header */}
      <div className="pt-16">
        <ChatHeader onlineStatus={true} />
      </div>
      
      {/* Chat Messages Container - Updated for better mobile/desktop responsiveness */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 pb-32 md:pb-28"
        style={{ 
          minHeight: 'calc(100vh - 240px)',
          maxHeight: 'calc(100vh - 240px)' 
        }}
      >
        {messages?.length === 0 ? (
          <WelcomeMessage userName={user?.name || 'Student'} />
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages?.map((message) => (
              <div key={message?.id}>
                <MessageBubble 
                  message={message} 
                  isUser={message?.isUser} 
                />
                
                {/* AI Response Cards */}
                {message?.aiCards && message?.aiCards?.length > 0 && (
                  <div className="ml-10 mb-4 space-y-3">
                    {message?.aiCards?.map((card, index) => (
                      <AIResponseCard
                        key={index}
                        type={card?.type}
                        title={card?.title}
                        description={card?.description}
                        data={card?.data}
                        onView={handleAICardView}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <LoadingIndicator message="StudyAI is analyzing your request..." />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Chat Input - Updated positioning for better visibility */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border z-30">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {/* Bottom Navigation - Updated z-index and styling for better visibility */}
      <BottomTabNavigation />
    </div>
  );
};

export default ChatInterface;