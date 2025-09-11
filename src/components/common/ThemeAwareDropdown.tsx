import type { FC, ReactNode } from "react";
import { Dropdown, Tooltip, theme } from "antd";
import type { DropdownProps, MenuProps } from "antd";
import clsx from "clsx";

interface MenuInfo {
  key: string;
  keyPath: string[];
  item: any;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export interface ThemeAwareDropdownProps
  extends Omit<DropdownProps, "dropdownRender"> {
  children: ReactNode;
  menuItems: MenuProps["items"];
  onMenuClick?: MenuProps["onClick"];
  tooltip?: string;
  tooltipPlacement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  minWidth?: string;
  maxWidth?: string;
  className?: string;
  showArrow?: boolean;
}

const ThemeAwareDropdown: FC<ThemeAwareDropdownProps> = ({
  children,
  menuItems,
  onMenuClick,
  tooltip,
  tooltipPlacement = "top",
  minWidth = "200px",
  maxWidth = "320px",
  className,
  showArrow = true,
  placement = "bottomLeft",
  trigger = ["click"],
  ...dropdownProps
}) => {
  const { token } = theme.useToken();

  const dropdownContent = (
    <div
      className={clsx(
        "rounded-xl shadow-lg border transition-all duration-200",
        "backdrop-blur-sm",
        minWidth && `min-w-[${minWidth}]`,
        maxWidth && `max-w-[${maxWidth}]`,
        className
      )}
      style={{
        minWidth,
        maxWidth,
        backgroundColor: token.colorBgElevated,
        borderColor: token.colorBorder,
        color: token.colorText,
        boxShadow: token.boxShadow,
      }}
    >
      {/* Custom menu rendering for better theme control */}
      <div className="py-2">
        {menuItems?.map((item, index) => {
          if (item?.type === "divider") {
            return (
              <div
                key={index}
                className="mx-3 my-2 h-px"
                style={{ backgroundColor: token.colorBorder }}
              />
            );
          }

          if (!item || !("key" in item)) return null;

          const isDanger = "danger" in item ? item.danger : false;
          const hasIcon = "icon" in item && item.icon;
          const hasChildren = "children" in item && item.children;

          const handleClick = (e: React.MouseEvent<HTMLElement>) => {
            if (onMenuClick) {
              const menuInfo: MenuInfo = {
                key: item.key as string,
                keyPath: [item.key as string],
                item: item,
                domEvent: e,
              };
              onMenuClick(menuInfo);
            }
          };

          return (
            <div
              key={item.key || index}
              onClick={handleClick}
              className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-opacity-10"
              style={{
                color: isDanger ? token.colorError : token.colorText,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDanger
                  ? token.colorError + "20"
                  : token.colorFill;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {hasIcon && (
                <div
                  className="flex items-center justify-center"
                  style={{
                    color: isDanger
                      ? token.colorError
                      : token.colorTextSecondary,
                  }}
                >
                  {"icon" in item && item.icon}
                </div>
              )}
              <span
                className="text-sm font-medium"
                style={{
                  color: isDanger ? token.colorError : token.colorText,
                }}
              >
                {item.label}
              </span>
              {hasChildren && (
                <div className="ml-auto">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{ color: token.colorTextTertiary }}
                  >
                    <path
                      d="M4.5 3L7.5 6L4.5 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const dropdownElement = (
    <Dropdown
      {...dropdownProps}
      trigger={trigger}
      placement={placement}
      arrow={showArrow}
      dropdownRender={() => dropdownContent}
    >
      {children}
    </Dropdown>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        {dropdownElement}
      </Tooltip>
    );
  }

  return dropdownElement;
};

export default ThemeAwareDropdown;
