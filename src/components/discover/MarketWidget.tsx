import type { FC } from "react";
import { Card, Typography, theme, Progress } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import clsx from "clsx";
import type { MarketWidgetProps } from "./types";

const { Text, Title } = Typography;

const MarketWidget: FC<MarketWidgetProps> = ({
  title,
  theme: themeMode,
  marketData,
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

        <div className="space-y-3">
          {marketData.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <Text
                  className="block text-xs font-medium truncate"
                  style={{
                    color: themeMode === "dark" ? token.colorText : "#1f2937",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  className="block text-xs"
                  style={{
                    color:
                      themeMode === "dark"
                        ? token.colorTextSecondary
                        : "#6b7280",
                  }}
                >
                  {item.value}
                </Text>
              </div>

              <div className="flex items-center gap-1 ml-2">
                {item.changeType === "positive" ? (
                  <ArrowUpOutlined
                    style={{
                      color: "#10b981",
                      fontSize: "12px",
                    }}
                  />
                ) : (
                  <ArrowDownOutlined
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                    }}
                  />
                )}
                <Text
                  className="text-xs font-medium"
                  style={{
                    color:
                      item.changeType === "positive" ? "#10b981" : "#ef4444",
                  }}
                >
                  {item.change}
                </Text>
              </div>
            </div>
          ))}
        </div>

        {/* Mini chart representation */}
        <div
          className="mt-4 pt-3 border-t"
          style={{
            borderColor: themeMode === "dark" ? token.colorBorder : "#e5e7eb",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Text
              className="text-xs"
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
              }}
            >
              Market Trend
            </Text>
          </div>

          {/* Simple progress bars to represent market performance */}
          <div className="space-y-2">
            {marketData.slice(0, 2).map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Text
                  className="text-xs w-12 truncate"
                  style={{
                    color:
                      themeMode === "dark"
                        ? token.colorTextSecondary
                        : "#6b7280",
                  }}
                >
                  {item.name.split(" ")[0]}
                </Text>
                <Progress
                  percent={
                    Math.abs(parseFloat(item.change.replace(/[+%-]/g, ""))) * 10
                  }
                  size="small"
                  strokeColor={
                    item.changeType === "positive" ? "#10b981" : "#ef4444"
                  }
                  trailColor={
                    themeMode === "dark" ? token.colorFillSecondary : "#f3f4f6"
                  }
                  showInfo={false}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MarketWidget;
