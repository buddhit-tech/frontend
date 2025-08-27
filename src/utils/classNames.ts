import clsx from "clsx";

// Common button variants
export const buttonVariants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
  outline:
    "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
  ghost:
    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
};

// Common input styles
export const inputStyles =
  "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

// Common card styles
export const cardStyles =
  "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg";

// Common transition styles
export const transitionStyles = "transition-all duration-200 ease-in-out";

// Sidebar state classes
export const sidebarClasses = (isCollapsed: boolean) => ({
  container: clsx(
    "hidden lg:flex lg:flex-col transition-all duration-300 ease-in-out",
    isCollapsed ? "lg:w-20" : "lg:w-80"
  ),
  header: clsx(
    "flex items-center border-b border-gray-200 dark:border-gray-700",
    isCollapsed ? "justify-center p-2" : "justify-between p-4"
  ),
  menuContainer: clsx("flex-1", isCollapsed ? "px-2" : "px-4"),
  footer: clsx(
    "border-t border-gray-200 dark:border-gray-700",
    isCollapsed ? "p-2" : "p-4"
  ),
  footerContent: clsx(
    "flex items-center group",
    isCollapsed ? "justify-center" : "space-x-3"
  ),
});

// Message bubble classes
export const messageBubbleClasses = (isUser: boolean) => ({
  container: clsx("max-w-3xl", isUser ? "order-2" : "order-1"),
  layout: clsx(
    "flex items-start space-x-3",
    isUser && "flex-row-reverse space-x-reverse"
  ),
  avatar: clsx(
    "w-8 h-8 rounded-full flex items-center justify-center",
    isUser ? "bg-blue-500" : "bg-gray-500"
  ),
  content: clsx("flex-1", isUser && "text-right"),
  bubble: clsx(
    "p-4 rounded-lg",
    isUser
      ? "bg-blue-500 text-white"
      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
  ),
  text: clsx(isUser ? "text-white" : "text-gray-900 dark:text-white"),
});
