import React, { useState } from 'react';
import clsx from 'clsx';
import { PaperPlaneRight, Microphone, Image, Camera } from '@phosphor-icons/react';
import { IconButton } from '../ui/IconButton';

export interface ChatInputProps {
  onSubmit: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  onMicrophoneClick?: () => void;
  onImageClick?: () => void;
  onCameraClick?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  placeholder = "Ask me anything...",
  disabled = false,
  loading = false,
  onMicrophoneClick,
  onImageClick,
  onCameraClick,
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled || loading) return;

    onSubmit(message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              rows={1}
              style={{ minHeight: '56px', maxHeight: '200px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 200) + 'px';
              }}
              disabled={disabled || loading}
            />
            
            {/* Action Buttons */}
            <div className="absolute right-3 bottom-3 flex items-center space-x-1">
              <IconButton
                icon={<Microphone size={16} />}
                variant="ghost"
                size="xs"
                onClick={onMicrophoneClick}
                tooltip="Voice input"
              />
              <IconButton
                icon={<Image size={16} />}
                variant="ghost"
                size="xs"
                onClick={onImageClick}
                tooltip="Upload image"
              />
              <IconButton
                icon={<Camera size={16} />}
                variant="ghost"
                size="xs"
                onClick={onCameraClick}
                tooltip="Take photo"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <IconButton
            icon={<PaperPlaneRight size={20} />}
            variant="primary"
            size="md"
            type="submit"
            disabled={!message.trim() || disabled || loading}
            loading={loading}
            tooltip="Send message"
            className="p-3"
          />
        </div>
      </form>
      
      {/* Helper Text */}
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Perplexity AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};
