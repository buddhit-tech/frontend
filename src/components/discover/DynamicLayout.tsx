import type { FC } from "react";
import { useState } from "react";
import { Row, Col, Typography, theme, Space, Tabs, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";
import ComponentRenderer from "./ComponentRenderer";
import { updateUserInterests } from "../../utils/discoverApi";
import type { DiscoverApiResponse } from "../../data/discoverApiResponse";

const { Title } = Typography;

interface DynamicLayoutProps {
  apiResponse: DiscoverApiResponse;
}

const DynamicLayout: FC<DynamicLayoutProps> = ({ apiResponse }) => {
  const { token } = theme.useToken();
  const { isDark } = useLayout();
  const [selectedCategories, setSelectedCategories] = useState(
    apiResponse.widgets.interests.categories
  );

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
      )
    );
  };

  const handleSaveInterests = async () => {
    try {
      const selectedInterestIds = selectedCategories
        .filter((cat) => cat.selected)
        .map((cat) => cat.id);

      await updateUserInterests(selectedInterestIds);
      message.success("Interests saved successfully!");
      console.log("Interests saved:", selectedInterestIds);
    } catch (error) {
      message.error("Failed to save interests");
      console.error("Error saving interests:", error);
    }
  };

  const handleCloseInterests = () => {
    console.log("Interests widget closed");
  };

  // Prepare tab items from API response
  const tabItems = apiResponse.layout.tabs.map((tab) => ({
    key: tab.key,
    label: tab.hasDropdown ? (
      <Space>
        {tab.label}
        <DownOutlined style={{ fontSize: "12px" }} />
      </Space>
    ) : (
      tab.label
    ),
  }));

  // Split articles based on grid configuration
  const grid1Articles = apiResponse.articles.slice(
    0,
    apiResponse.layout.gridConfig.articles.grid1.count
  );
  const grid2Articles = apiResponse.articles.slice(
    apiResponse.layout.gridConfig.articles.grid1.count,
    apiResponse.layout.gridConfig.articles.grid1.count +
      apiResponse.layout.gridConfig.articles.grid2.count
  );

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{
        backgroundColor: isDark ? "#212121" : "#fff",
        color: isDark ? token.colorText : "#1f2937",
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Title
            level={2}
            className="mb-0"
            style={{ color: isDark ? token.colorText : "#1f2937" }}
          >
            Discover
          </Title>
        </div>

        <Tabs
          items={tabItems}
          defaultActiveKey="for-you"
          className={clsx(
            "border-b-0",
            isDark ? "ant-tabs-dark" : "ant-tabs-light"
          )}
          style={{
            color: isDark ? token.colorText : "#1f2937",
          }}
        />
      </div>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Left Content - Articles */}
        <Col xs={24} lg={16} xl={18}>
          <div className="space-y-6">
            {/* Featured Article */}
            <ComponentRenderer
              config={{
                type: "ArticleCard",
                props: { size: apiResponse.layout.gridConfig.featured.size },
              }}
              theme={isDark ? "dark" : "light"}
              data={apiResponse.featured}
            />

            {/* First Article Grid */}
            <Row gutter={[16, 16]}>
              {grid1Articles.map((article) => (
                <Col
                  xs={apiResponse.layout.gridConfig.articles.grid1.columns.xs}
                  sm={apiResponse.layout.gridConfig.articles.grid1.columns.sm}
                  lg={apiResponse.layout.gridConfig.articles.grid1.columns.lg}
                  key={article.id}
                >
                  <ComponentRenderer
                    config={{
                      type: "ArticleCard",
                      props: {
                        size: apiResponse.layout.gridConfig.articles.grid1.size,
                      },
                    }}
                    theme={isDark ? "dark" : "light"}
                    data={article}
                  />
                </Col>
              ))}
            </Row>

            {/* Second Article Grid */}
            <Row gutter={[16, 16]}>
              {grid2Articles.map((article) => (
                <Col
                  xs={apiResponse.layout.gridConfig.articles.grid2.columns.xs}
                  sm={apiResponse.layout.gridConfig.articles.grid2.columns.sm}
                  lg={apiResponse.layout.gridConfig.articles.grid2.columns.lg}
                  key={article.id}
                >
                  <ComponentRenderer
                    config={{
                      type: "ArticleCard",
                      props: {
                        size: apiResponse.layout.gridConfig.articles.grid2.size,
                      },
                    }}
                    theme={isDark ? "dark" : "light"}
                    data={article}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>

        {/* Right Sidebar - Widgets */}
        <Col xs={24} lg={8} xl={6}>
          <div className="space-y-0">
            {/* Interest Widget */}
            <ComponentRenderer
              config={{
                type: "InterestWidget",
                props: {
                  title: apiResponse.widgets.interests.title,
                  className: "mb-4",
                },
              }}
              theme={isDark ? "dark" : "light"}
              data={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              onSave={handleSaveInterests}
              onClose={handleCloseInterests}
            />

            {/* Weather Widget */}
            <ComponentRenderer
              config={{
                type: "WeatherWidget",
                props: {
                  title: apiResponse.widgets.weather.title,
                  className: "mb-4",
                },
              }}
              theme={isDark ? "dark" : "light"}
              data={apiResponse.widgets.weather}
            />

            {/* Market Widget */}
            <ComponentRenderer
              config={{
                type: "MarketWidget",
                props: {
                  title: apiResponse.widgets.market.title,
                  className: "mb-4",
                },
              }}
              theme={isDark ? "dark" : "light"}
              data={apiResponse.widgets.market.data}
            />

            {/* Trending Companies Widget */}
            <ComponentRenderer
              config={{
                type: "TrendingCompaniesWidget",
                props: {
                  title: apiResponse.widgets.trendingCompanies.title,
                },
              }}
              theme={isDark ? "dark" : "light"}
              data={apiResponse.widgets.trendingCompanies.companies}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DynamicLayout;
