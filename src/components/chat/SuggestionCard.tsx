import React from 'react';
import clsx from 'clsx';
import { Card } from '../ui/Card';

export interface SuggestionCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  onClick,
}) => {
  return (
    <Card
      variant="filled"
      padding="md"
      hover
      onClick={onClick}
      className={clsx('cursor-pointer transition-all duration-200', color)}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
          <Icon size={20} className="text-gray-700 dark:text-gray-300" />
        </div>
        <div className="flex-1">
          <h6 className="text-gray-900 dark:text-white font-semibold">
            {title}
          </h6>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};
