import React from 'react';
import clsx from 'clsx';
import { ThumbsUp, ThumbsDown, Copy, Share } from '@phosphor-icons/react';
import { IconButton } from '../ui/IconButton';

export interface ChatMessageProps {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  content,
  onThumbsUp,
  onThumbsDown,
  onCopy,
  onShare,
}) => {
  const isUser = type === 'user';

  return (
    <div
      className={clsx(
        'flex',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={clsx(
          'max-w-3xl',
          isUser ? 'order-2' : 'order-1'
        )}
      >
        <div
          className={clsx(
            'flex items-start space-x-3',
            isUser && 'flex-row-reverse space-x-reverse'
          )}
        >
          {/* Avatar */}
          <div
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center',
              isUser ? 'bg-blue-500' : 'bg-gray-500'
            )}
          >
            <span className="text-white text-sm font-medium">
              {isUser ? 'U' : 'AI'}
            </span>
          </div>
          
          {/* Message Content */}
          <div
            className={clsx(
              'flex-1',
              isUser && 'text-right'
            )}
          >
            {/* Message Bubble */}
            <div
              className={clsx(
                'p-4 rounded-lg',
                isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              )}
            >
              <p
                className={clsx(
                  isUser
                    ? 'text-white'
                    : 'text-gray-900 dark:text-white'
                )}
              >
                {content}
              </p>
            </div>
            
            {/* Action Buttons (only for AI messages) */}
            {!isUser && (
              <div className="flex items-center space-x-2 mt-2">
                <IconButton
                  icon={<ThumbsUp size={16} />}
                  variant="ghost"
                  size="xs"
                  onClick={onThumbsUp}
                  tooltip="Thumbs up"
                />
                <IconButton
                  icon={<ThumbsDown size={16} />}
                  variant="ghost"
                  size="xs"
                  onClick={onThumbsDown}
                  tooltip="Thumbs down"
                />
                <IconButton
                  icon={<Copy size={16} />}
                  variant="ghost"
                  size="xs"
                  onClick={onCopy}
                  tooltip="Copy message"
                />
                <IconButton
                  icon={<Share size={16} />}
                  variant="ghost"
                  size="xs"
                  onClick={onShare}
                  tooltip="Share message"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
