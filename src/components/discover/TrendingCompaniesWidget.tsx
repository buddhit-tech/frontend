import type { FC } from "react";
import { Card, Typography, theme } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import clsx from "clsx";
import type { TrendingCompaniesWidgetProps } from "./types";

const { Text, Title } = Typography;

const TrendingCompaniesWidget: FC<TrendingCompaniesWidgetProps> = ({
  title,
  theme: themeMode,
  companies,
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
          {companies.map((company: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-opacity-50 transition-colors duration-200"
              style={{
                backgroundColor:
                  themeMode === "dark" ? "transparent" : "transparent",
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Text
                    className="text-xs font-medium truncate"
                    style={{
                      color: themeMode === "dark" ? token.colorText : "#1f2937",
                    }}
                  >
                    {company.name}
                  </Text>
                </div>

                <div className="flex items-center gap-2">
                  <Text
                    className="text-xs font-mono"
                    style={{
                      color:
                        themeMode === "dark"
                          ? token.colorTextSecondary
                          : "#6b7280",
                    }}
                  >
                    {company.ticker}
                  </Text>
                  <Text
                    className="text-xs"
                    style={{
                      color:
                        themeMode === "dark"
                          ? token.colorTextSecondary
                          : "#6b7280",
                    }}
                  >
                    {company.price}
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-1 ml-2">
                {company.changeType === "positive" ? (
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
                      company.changeType === "positive" ? "#10b981" : "#ef4444",
                  }}
                >
                  {company.change}
                </Text>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className="mt-4 pt-3 border-t"
          style={{
            borderColor: themeMode === "dark" ? token.colorBorder : "#e5e7eb",
          }}
        >
          <div className="flex items-center justify-between">
            <Text
              className="text-xs"
              style={{
                color:
                  themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
              }}
            >
              Market Status
            </Text>
            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#10b981" }}
              />
              <Text
                className="text-xs"
                style={{
                  color:
                    themeMode === "dark" ? token.colorTextSecondary : "#6b7280",
                }}
              >
                Mostly Up
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrendingCompaniesWidget;
