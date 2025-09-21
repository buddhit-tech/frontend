import type { FC } from "react";
import { Card, Typography, Tag, theme } from "antd";
import { HeartOutlined, ClockCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import type { ArticleCardProps } from "./types";

const { Text, Title } = Typography;

const ArticleCard: FC<ArticleCardProps> = ({
  article,
  theme: themeMode,
  size = "medium",
}) => {
  const { token } = theme.useToken();

  const cardClasses = clsx(
    "transition-all duration-200 hover:shadow-lg",
    "border-0 overflow-hidden",
    size === "large" && "mb-6",
    size === "medium" && "mb-4",
    size === "small" && "mb-3"
  );

  const imageClasses = clsx(
    "w-full object-cover transition-transform duration-200 hover:scale-105",
    size === "large" && "h-48",
    size === "medium" && "h-32",
    size === "small" && "h-24"
  );

  const titleClasses = clsx(
    "font-medium transition-colors duration-200",
    size === "large" && "text-lg mb-2",
    size === "medium" && "text-base mb-1",
    size === "small" && "text-sm mb-1"
  );

  return (
    <Card
      className={cardClasses}
      style={{
        backgroundColor:
          themeMode === "dark" ? token.colorBgContainer : "#ffffff",
        border: `1px solid ${
          themeMode === "dark" ? token.colorBorder : "#e5e7eb"
        }`,
      }}
      bodyStyle={{ padding: size === "large" ? "16px" : "12px" }}
      cover={
        <div className="overflow-hidden">
          <img
            alt={article.title}
            src={article.imageUrl}
            className={imageClasses}
          />
        </div>
      }
    >
      <div className="space-y-2">
        {/* Category Tag */}
        <Tag
          color={themeMode === "dark" ? token.colorPrimary : "#3b82f6"}
          className="text-xs"
        >
          {article.category}
        </Tag>

        {/* Title */}
        <Title
          level={size === "large" ? 4 : 5}
          className={titleClasses}
          style={{
            color: themeMode === "dark" ? token.colorText : "#1f2937",
            marginBottom: size === "large" ? "8px" : "4px",
          }}
        >
          {article.title}
        </Title>

        {/* Description (only for large cards) */}
        {size === "large" && article.description && (
          <Text
            className="text-sm block mb-3"
            style={{
              color:
                themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
            }}
          >
            {article.description}
          </Text>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <ClockCircleOutlined
                style={{
                  color:
                    themeMode === "dark" ? token.colorTextSecondary : "#9ca3af",
                  fontSize: "12px",
                }}
              />
              <Text
                style={{
                  color:
                    themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
                }}
              >
                {article.publishedAt}
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <HeartOutlined
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#9ca3af",
                fontSize: "12px",
              }}
            />
            <Text
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
              }}
            >
              {article.sourceCount} sources
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
