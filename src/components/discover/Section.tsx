import type { FC } from "react";
import { Card, Typography, Tag, theme, Row, Col, Divider } from "antd";
import { ClockCircleOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import type { SectionProps } from "./types";

const { Text, Title } = Typography;

const Section: FC<SectionProps> = ({
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
    "transition-all duration-300 hover:shadow-xl",
    "border-0 overflow-hidden rounded-xl cursor-pointer",
    className
  );

  const imageClasses = clsx(
    "object-cover transition-transform duration-300 hover:scale-105",
    layout === "left-image-right-content"
      ? "h-full min-h-[300px]"
      : "h-64 w-full"
  );

  const contentClasses = clsx(
    "p-6",
    layout === "left-image-right-content"
      ? "flex flex-col justify-center"
      : "space-y-4"
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
        <Row className="min-h-[400px]">
          <Col xs={24} lg={12} className="p-0">
            <div className="overflow-hidden h-full">
              <img
                alt={content.title}
                src={content.imageUrl}
                className={imageClasses}
              />
            </div>
          </Col>
          <Col xs={24} lg={12} className={contentClasses}>
            <div className="space-y-4">
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
                    {content.sourceCount} sources
                  </Text>
                </div>
              </div>

              <Title
                level={2}
                className="mb-2"
                style={{
                  color: themeMode === "dark" ? token.colorText : "#1f2937",
                }}
              >
                {content.title}
              </Title>

              {content.subtitle && (
                <Title
                  level={4}
                  className="mb-3 opacity-80"
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
                  className="text-base leading-relaxed block mb-4"
                  style={{
                    color: themeMode === "dark" ? token.colorText : "#374151",
                  }}
                >
                  {content.content}
                </Text>
              )}

              <div
                className="flex items-center gap-2 pt-4 border-t"
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
                    fontSize: "14px",
                  }}
                />
                <Text
                  className="text-sm"
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
        <div className="flex items-center gap-2 mb-3">
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
              {content.sourceCount} sources
            </Text>
          </div>
        </div>

        <Title
          level={2}
          className="mb-3"
          style={{ color: themeMode === "dark" ? token.colorText : "#1f2937" }}
        >
          {content.title}
        </Title>

        {content.subtitle && (
          <Title
            level={4}
            className="mb-3 opacity-80"
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
            className="text-base leading-relaxed block mb-4"
            style={{
              color: themeMode === "dark" ? token.colorText : "#374151",
            }}
          >
            {content.content}
          </Text>
        )}

        <div
          className="flex items-center gap-2 pt-3 border-t"
          style={{
            borderColor: themeMode === "dark" ? token.colorBorder : "#e5e7eb",
          }}
        >
          <ClockCircleOutlined
            style={{
              color:
                themeMode === "dark" ? token.colorTextSecondary : "#9ca3af",
              fontSize: "14px",
            }}
          />
          <Text
            className="text-sm"
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

export default Section;
