import React from "react";
import clsx from "clsx";
import {
  MagnifyingGlass,
  Moon,
  Sun,
  ChatCircle,
  Gear,
  User,
  House,
  BookOpen,
  Lightbulb,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { useTheme } from "../../contexts/ThemeContext";
import { IconButton } from "../ui/IconButton";

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

interface MenuItem {
  icon: React.ComponentType<any>;
  label: string;
  count?: number;
  active?: boolean;
}

interface RecentChat {
  title: string;
  timestamp: string;
}

const menuItems: MenuItem[] = [
  { icon: House, label: "Home", active: true },
  { icon: ChatCircle, label: "Chats", count: 12 },
  { icon: BookOpen, label: "Documents", count: 5 },
  { icon: Lightbulb, label: "Insights", count: 3 },
];

const recentChats: RecentChat[] = [
  {
    title: "How to implement authentication in React?",
    timestamp: "2 hours ago",
  },
  { title: "Best practices for TypeScript", timestamp: "1 day ago" },
  { title: "Material Tailwind components guide", timestamp: "3 days ago" },
  { title: "React Query optimization tips", timestamp: "1 week ago" },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  searchQuery,
  onSearchChange,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={clsx(
        "hidden lg:flex lg:flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:w-20" : "lg:w-80"
      )}
    >
      <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 relative">
        {/* Collapse indicator line */}
        {isCollapsed && (
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
        )}

        {/* Header */}
        <div
          className={clsx(
            "flex items-center border-b border-gray-200 dark:border-gray-700",
            isCollapsed ? "justify-center p-2" : "justify-between p-4"
          )}
        >
          {!isCollapsed && (
            <h5 className="font-bold text-gray-900 dark:text-white">
              Perplexity AI
            </h5>
          )}
          <div
            className={clsx(
              "flex items-center",
              isCollapsed ? "space-x-1" : "space-x-2"
            )}
          >
            <IconButton
              icon={theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            />
          </div>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="relative">
              <MagnifyingGlass
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className={clsx("flex-1", isCollapsed ? "px-2" : "px-4")}>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={clsx(
                  "flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer group",
                  isCollapsed ? "justify-center p-3" : "p-3"
                )}
              >
                <div className="relative">
                  <item.icon
                    size={20}
                    className={clsx(
                      "text-gray-600 dark:text-gray-300",
                      !isCollapsed && "mr-3"
                    )}
                  />
                  {isCollapsed && item.count && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.count > 9 ? "9+" : item.count}
                    </span>
                  )}
                  {/* Tooltip for collapsed sidebar */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-l-gray-900 dark:border-l-gray-700"></div>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <>
                    <span className="text-gray-900 dark:text-white flex-1">
                      {item.label}
                    </span>
                    {item.count && (
                      <span className="ml-auto px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Recent Chats */}
          {!isCollapsed && (
            <div className="mt-6">
              <h6 className="mb-3 text-gray-700 dark:text-gray-300 font-semibold">
                Recent Chats
              </h6>
              <div className="space-y-2">
                {recentChats.map((chat, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {chat.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {chat.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={clsx(
            "border-t border-gray-200 dark:border-gray-700",
            isCollapsed ? "p-2" : "p-4"
          )}
        >
          <div
            className={clsx(
              "flex items-center group",
              isCollapsed ? "justify-center" : "space-x-3"
            )}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              {/* Tooltip for collapsed sidebar */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  John Doe
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-l-gray-900 dark:border-l-gray-700"></div>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    john@example.com
                  </p>
                </div>
                <IconButton
                  icon={<Gear size={16} />}
                  variant="ghost"
                  size="sm"
                  tooltip="Settings"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
