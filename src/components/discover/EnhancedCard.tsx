import type { FC } from "react";
import { Card, Typography, Tag, theme, Row, Col, Divider } from "antd";
import { ClockCircleOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import type { EnhancedCardProps } from "./types";

const { Text, Title } = Typography;

const EnhancedCard: FC<EnhancedCardProps> = ({
  content,
  layout,
  theme: themeMode,
  className,
}) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/discover/${content.id}`);
  };

  const containerClasses = clsx(
    "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
    "border-0 overflow-hidden rounded-lg cursor-pointer",
    className
  );

  const imageClasses = clsx(
    "object-cover transition-transform duration-300 hover:scale-105",
    layout === "left-image-right-content"
      ? "h-full min-h-[200px]"
      : "h-48 w-full"
  );

  const contentClasses = clsx(
    "p-4",
    layout === "left-image-right-content"
      ? "flex flex-col justify-center"
      : "space-y-3"
  );

  if (layout === "left-image-right-content") {
    return (
      <Card
        className={containerClasses}
        style={{
          backgroundColor:
            themeMode === "dark" ? token.colorBgContainer : "#ffffff",
          border: `1px solid ${
            themeMode === "dark" ? token.colorBorder : "#e5e7eb"
          }`,
        }}
        bodyStyle={{ padding: 0 }}
        onClick={handleCardClick}
      >
        <Row className="min-h-[250px]">
          <Col xs={24} sm={8} className="p-0">
            <div className="overflow-hidden h-full">
              <img
                alt={content.title}
                src={content.imageUrl}
                className={imageClasses}
              />
            </div>
          </Col>
          <Col xs={24} sm={16} className={contentClasses}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag
                  color={themeMode === "dark" ? token.colorPrimary : "#3b82f6"}
                  className="text-xs"
                >
                  {content.category}
                </Tag>
                <Divider type="vertical" />
                <div className="flex items-center gap-1">
                  <HeartOutlined
                    style={{
                      color:
                        themeMode === "dark"
                          ? token.colorTextSecondary
                          : "#9ca3af",
                      fontSize: "12px",
                    }}
                  />
                  <Text
                    className="text-xs"
                    style={{
                      color:
                        themeMode === "dark"
                          ? token.colorTextSecondary
                          : "#6b7280",
                    }}
                  >
                    {content.sourceCount}
                  </Text>
                </div>
              </div>

              <Title
                level={4}
                className="mb-2 line-clamp-2"
                style={{
                  color: themeMode === "dark" ? token.colorText : "#1f2937",
                }}
              >
                {content.title}
              </Title>

              {content.subtitle && (
                <Title
                  level={5}
                  className="mb-2 opacity-80 line-clamp-1"
                  style={{
                    color:
                      themeMode === "dark"
                        ? token.colorTextSecondary
                        : "#6b7280",
                  }}
                >
                  {content.subtitle}
                </Title>
              )}

              {content.content && (
                <Text
                  className="text-sm leading-relaxed block mb-3 line-clamp-3"
                  style={{
                    color: themeMode === "dark" ? token.colorText : "#374151",
                  }}
                >
                  {content.content}
                </Text>
              )}

              <div
                className="flex items-center gap-2 pt-2 border-t"
                style={{
                  borderColor:
                    themeMode === "dark" ? token.colorBorder : "#e5e7eb",
                }}
              >
                <ClockCircleOutlined
                  style={{
                    color:
                      themeMode === "dark"
                        ? token.colorTextSecondary
                        : "#9ca3af",
                    fontSize: "12px",
                  }}
                />
                <Text
                  className="text-xs"
                  style={{
                    color:
                      themeMode === "dark"
                        ? token.colorTextSecondary
                        : "#6b7280",
                  }}
                >
                  {content.publishedAt}
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }

  // top-image-bottom-content layout
  return (
    <Card
      className={containerClasses}
      style={{
        backgroundColor:
          themeMode === "dark" ? token.colorBgContainer : "#ffffff",
        border: `1px solid ${
          themeMode === "dark" ? token.colorBorder : "#e5e7eb"
        }`,
      }}
      bodyStyle={{ padding: 0 }}
      onClick={handleCardClick}
    >
      <div className="overflow-hidden">
        <img
          alt={content.title}
          src={content.imageUrl}
          className={imageClasses}
        />
      </div>

      <div className={contentClasses}>
        <div className="flex items-center gap-2 mb-2">
          <Tag
            color={themeMode === "dark" ? token.colorPrimary : "#3b82f6"}
            className="text-xs"
          >
            {content.category}
          </Tag>
          <Divider type="vertical" />
          <div className="flex items-center gap-1">
            <HeartOutlined
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#9ca3af",
                fontSize: "12px",
              }}
            />
            <Text
              className="text-xs"
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
              }}
            >
              {content.sourceCount}
            </Text>
          </div>
        </div>

        <Title
          level={4}
          className="mb-2 line-clamp-2"
          style={{ color: themeMode === "dark" ? token.colorText : "#1f2937" }}
        >
          {content.title}
        </Title>

        {content.subtitle && (
          <Title
            level={5}
            className="mb-2 opacity-80 line-clamp-1"
            style={{
              color:
                themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
            }}
          >
            {content.subtitle}
          </Title>
        )}

        {content.content && (
          <Text
            className="text-sm leading-relaxed block mb-3 line-clamp-2"
            style={{
              color: themeMode === "dark" ? token.colorText : "#374151",
            }}
          >
            {content.content}
          </Text>
        )}

        <div
          className="flex items-center gap-2 pt-2 border-t"
          style={{
            borderColor: themeMode === "dark" ? token.colorBorder : "#e5e7eb",
          }}
        >
          <ClockCircleOutlined
            style={{
              color:
                themeMode === "dark" ? token.colorTextSecondary : "#9ca3af",
              fontSize: "12px",
            }}
          />
          <Text
            className="text-xs"
            style={{
              color:
                themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
            }}
          >
            {content.publishedAt}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedCard;
