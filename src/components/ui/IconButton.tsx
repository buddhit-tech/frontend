import React from "react";
import clsx from "clsx";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const iconButtonVariants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-500",
  outline:
    "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500",
  ghost:
    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
  danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
};

const iconButtonSizes = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-14 h-14",
};

const iconSizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

const tooltipPositions = {
  top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
  left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
  right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
};

const tooltipArrows = {
  top: "top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-t-gray-900 dark:border-t-gray-700",
  bottom:
    "bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-700",
  left: "left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-l-gray-900 dark:border-l-gray-700",
  right:
    "right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-r-gray-900 dark:border-r-gray-700",
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = "ghost",
  size = "md",
  loading = false,
  tooltip,
  tooltipPosition = "top",
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group relative",
        iconButtonVariants[variant],
        iconButtonSizes[size],
        className
      )}
      disabled={disabled || loading}
      title={tooltip}
      {...props}
    >
      {loading ? (
        <svg
          className={clsx("animate-spin", iconSizes[size])}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <div className={iconSizes[size]}>{icon}</div>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className={clsx(
            "absolute px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50",
            tooltipPositions[tooltipPosition]
          )}
        >
          {tooltip}
          <div
            className={clsx("absolute", tooltipArrows[tooltipPosition])}
          ></div>
        </div>
      )}
    </button>
  );
};
