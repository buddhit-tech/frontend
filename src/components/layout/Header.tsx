import React from "react";
import {
  Plus,
  List as ListIcon,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";

export interface HeaderProps {
  title: string;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
  showNewChatButton?: boolean;
  onNewChat?: () => void;
  rightContent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenMobileSidebar,
  showNewChatButton = true,
  onNewChat,
  rightContent,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <IconButton
            icon={<ListIcon size={20} />}
            variant="ghost"
            size="sm"
            onClick={onOpenMobileSidebar}
            className="lg:hidden"
          />
          {/* Desktop sidebar toggle */}
          <IconButton
            icon={
              isSidebarCollapsed ? (
                <CaretRight size={20} />
              ) : (
                <CaretLeft size={20} />
              )
            }
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="hidden lg:flex"
          />
          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {/* Right content (e.g., New Chat button) */}
          {showNewChatButton && onNewChat && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={onNewChat}
            >
              New Chat
            </Button>
          )}

          {/* Custom right content */}
          {rightContent}
        </div>
      </div>
    </div>
  );
};
