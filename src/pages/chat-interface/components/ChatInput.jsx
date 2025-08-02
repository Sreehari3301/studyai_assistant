import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, onFileUpload, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() || selectedFile) {
      onSendMessage({
        content: message?.trim(),
        attachment: selectedFile ? {
          name: selectedFile?.name,
          type: selectedFile?.type?.startsWith('image/') ? 'image' : 'document',
          size: selectedFile?.size,
          file: selectedFile
        } : null
      });
      setMessage('');
      setSelectedFile(null);
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file?.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/gif'
      ];
      
      if (!allowedTypes?.includes(file?.type)) {
        alert('Please select a valid file type (PDF, DOC, DOCX, TXT, JPG, PNG, GIF)');
        return;
      }
      
      setSelectedFile(file);
      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    const textarea = e?.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* File Preview */}
      {selectedFile && (
        <div className="mb-3 p-3 bg-muted rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={selectedFile?.type?.startsWith('image/') ? 'Image' : 'FileText'} 
              size={16} 
              className="text-primary"
            />
            <div>
              <p className="text-sm font-medium text-foreground truncate max-w-48">
                {selectedFile?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile?.size / 1024 / 1024)?.toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            iconName="X"
            iconSize={14}
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* File Upload Button */}
        <div className="flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef?.current?.click()}
            disabled={isLoading}
            iconName="Paperclip"
            iconSize={18}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
        
        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12 bg-muted border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm placeholder:text-muted-foreground"
            rows={1}
          />
        </div>
        
        {/* Send Button */}
        <div className="flex-shrink-0">
          <Button
            type="submit"
            variant={message?.trim() || selectedFile ? "default" : "ghost"}
            size="icon"
            disabled={isLoading || (!message?.trim() && !selectedFile)}
            loading={isLoading}
            iconName="Send"
            iconSize={18}
            className={`transition-smooth ${
              message?.trim() || selectedFile 
                ? 'bg-primary text-white hover:bg-primary/90' :'text-muted-foreground'
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;