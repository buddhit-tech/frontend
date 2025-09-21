import type { FC } from "react";
import { Card, Typography, Button, Tag, theme, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import clsx from "clsx";
import type { InterestWidgetProps } from "./types";

const { Text, Title } = Typography;

const InterestWidget: FC<InterestWidgetProps> = ({
  title,
  theme: themeMode,
  categories,
  onCategoryToggle,
  onSave,
  onClose,
  className,
}) => {
  const { token } = theme.useToken();

  return (
    <Card
      className={clsx("transition-all duration-200", className)}
      style={{
        backgroundColor:
          themeMode === "dark" ? token.colorBgContainer : "#ffffff",
        border: `1px solid ${
          themeMode === "dark" ? token.colorBorder : "#e5e7eb"
        }`,
        marginBottom: "16px",
      }}
      bodyStyle={{ padding: "16px" }}
      title={
        <div className="flex items-center justify-between">
          <Title
            level={5}
            style={{
              color: themeMode === "dark" ? token.colorText : "#1f2937",
              margin: 0,
            }}
          >
            {title}
          </Title>
          {onClose && (
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            />
          )}
        </div>
      }
    >
      <div className="space-y-4">
        <Text
          className="block text-sm"
          style={{
            color: themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
          }}
        >
          Select topics and interests to customize your Discover experience.
        </Text>

        <Space wrap size={[8, 8]}>
          {categories.map((category: any) => (
            <Tag.CheckableTag
              key={category.id}
              checked={category.selected}
              onChange={() => onCategoryToggle?.(category.id)}
              style={{
                backgroundColor: category.selected
                  ? themeMode === "dark"
                    ? token.colorPrimary
                    : "#3b82f6"
                  : themeMode === "dark"
                  ? token.colorFillSecondary
                  : "#f3f4f6",
                color: category.selected
                  ? "#ffffff"
                  : themeMode === "dark"
                  ? token.colorText
                  : "#374151",
                border: category.selected
                  ? "none"
                  : `1px solid ${
                      themeMode === "dark" ? token.colorBorder : "#d1d5db"
                    }`,
                borderRadius: "6px",
                padding: "4px 8px",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {category.name}
            </Tag.CheckableTag>
          ))}
        </Space>

        {onSave && (
          <Button
            type="primary"
            size="small"
            onClick={onSave}
            className="w-full"
            style={{
              backgroundColor:
                themeMode === "dark" ? token.colorPrimary : "#3b82f6",
              borderColor:
                themeMode === "dark" ? token.colorPrimary : "#3b82f6",
            }}
          >
            Save Interests
          </Button>
        )}
      </div>
    </Card>
  );
};

export default InterestWidget;
