import React from "react";
import clsx from "clsx";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  onClick?: () => void;
}

const cardVariants = {
  default: "bg-white dark:bg-gray-800",
  elevated: "bg-white dark:bg-gray-800 shadow-lg",
  outlined:
    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
  filled: "bg-gray-50 dark:bg-gray-700",
};

const cardPadding = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

const cardShadows = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  padding = "md",
  shadow = "none",
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg transition-all duration-200",
        cardVariants[variant],
        cardPadding[padding],
        cardShadows[shadow],
        hover && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Card sub-components for better composition
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={clsx("mb-4", className)}>{children}</div>
);

export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h3
    className={clsx(
      "text-lg font-semibold text-gray-900 dark:text-white",
      className
    )}
  >
    {children}
  </h3>
);

export const CardSubtitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={clsx("text-sm text-gray-600 dark:text-gray-400", className)}>
    {children}
  </p>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={clsx("", className)}>{children}</div>
);

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={clsx(
      "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700",
      className
    )}
  >
    {children}
  </div>
);
