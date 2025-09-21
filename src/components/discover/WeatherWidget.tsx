import type { FC } from "react";
import { Card, Typography, theme, Row, Col } from "antd";
import clsx from "clsx";
import type { WeatherWidgetProps } from "./types";

const { Text, Title } = Typography;

const WeatherWidget: FC<WeatherWidgetProps> = ({
  title,
  theme: themeMode,
  weatherData,
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
    >
      <div className="space-y-4">
        <Title
          level={5}
          style={{
            color: themeMode === "dark" ? token.colorText : "#1f2937",
            margin: 0,
          }}
        >
          {title}
        </Title>

        {/* Current Weather */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Text
              className="text-2xl font-bold"
              style={{
                color: themeMode === "dark" ? token.colorText : "#1f2937",
              }}
            >
              {weatherData.temperature}
            </Text>
            <Text
              className="text-sm"
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
              }}
            >
              F/C
            </Text>
          </div>

          <Text
            className="block text-sm mb-1"
            style={{
              color:
                themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
            }}
          >
            {weatherData.condition}
          </Text>

          <Text
            className="block text-sm"
            style={{
              color:
                themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
            }}
          >
            {weatherData.location}
          </Text>

          <div className="flex items-center justify-center gap-2 mt-2">
            <Text
              className="text-xs"
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
              }}
            >
              H: {weatherData.high}
            </Text>
            <Text
              className="text-xs"
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
              }}
            >
              L: {weatherData.low}
            </Text>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div
          className="border-t pt-3"
          style={{
            borderColor: themeMode === "dark" ? token.colorBorder : "#e5e7eb",
          }}
        >
          <Row gutter={[8, 8]}>
            {weatherData.forecast.map((day: any, index: number) => (
              <Col span={24} key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Text
                      className="text-xs"
                      style={{
                        color:
                          themeMode === "dark" ? token.colorText : "#1f2937",
                      }}
                    >
                      {day.day}
                    </Text>
                    <span className="text-sm">{day.icon}</span>
                  </div>
                  <Text
                    className="text-xs"
                    style={{
                      color:
                        themeMode === "dark"
                          ? token.colorTextSecondary
                          : "#6b7280",
                    }}
                  >
                    {day.temp}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
