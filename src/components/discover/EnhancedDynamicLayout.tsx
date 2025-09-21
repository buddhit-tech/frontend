import { Fragment, type FC } from "react";
import { Row, Col, Typography, theme, Divider } from "antd";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";
import ComponentRenderer from "./ComponentRenderer";
import { useUpdateInterests } from "../../hooks/useDiscoverQuery";
import type { EnhancedDiscoverApiResponse } from "../../data/enhancedDiscoverApiResponse";

const { Title } = Typography;

interface EnhancedDynamicLayoutProps {
  apiResponse: EnhancedDiscoverApiResponse;
}

const EnhancedDynamicLayout: FC<EnhancedDynamicLayoutProps> = ({
  apiResponse,
}) => {
  const { token } = theme.useToken();
  const { isDark } = useLayout();
  const updateInterestsMutation = useUpdateInterests();

  const handleSaveInterests = async (selectedInterestIds: string[]) => {
    updateInterestsMutation.mutate(selectedInterestIds);
  };

  const handleCloseInterests = () => {
    console.log("Interests widget closed");
  };

  // // Prepare tab items from API response
  // const tabItems = apiResponse.layout.tabs.map((tab) => ({
  //   key: tab.key,
  //   label: tab.hasDropdown ? (
  //     <Space>
  //       {tab.label}
  //       <DownOutlined style={{ fontSize: "12px" }} />
  //     </Space>
  //   ) : (
  //     tab.label
  //   ),
  // }));

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
      className="min-h-screen p-4 md:p-6 theme-transition"
      style={{
        backgroundColor: isDark ? "#212121" : "#fff",
        color: isDark ? token.colorText : "#1f2937",
      }}
    >
      {/* Header */}
      <div className="">
        <div className="flex items-center justify-between theme-transition">
          <Title
            level={1}
            className={clsx(
              "mb-0 font-bold theme-transition",
              isDark
                ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            )}
          >
            Discover
          </Title>
        </div>

        {/* <Tabs
          items={tabItems}
          defaultActiveKey="for-you"
          className={clsx(
            "border-b-0 theme-transition",
            isDark ? "ant-tabs-dark" : "ant-tabs-light"
          )}
          style={{
            color: isDark ? token.colorText : "#1f2937",
          }}
        /> */}
      </div>

      {/* Main Content */}
      <Row gutter={[32, 32]} className="theme-transition">
        {/* Left Content - Articles */}
        <Col xs={24} lg={16} xl={18} className="theme-transition">
          <div className="space-y-8 theme-transition">
            {/* Sections */}
            {apiResponse.sections.length > 0 && (
              <div className="space-y-8 mb-8">
                <Divider
                  orientation="left"
                  className="text-lg font-semibold"
                  style={{
                    color: isDark ? token.colorText : "#1f2937",
                    borderColor: isDark ? token.colorBorder : "#e5e7eb",
                  }}
                >
                  Featured Stories
                </Divider>
                {apiResponse.sections.map((section) => (
                  <Fragment key={section.id}>
                    <ComponentRenderer
                      config={{
                        type: "Section",
                        props: { className: "mb-6" },
                      }}
                      theme={isDark ? "dark" : "light"}
                      data={section}
                    />
                    <br />
                  </Fragment>
                ))}
              </div>
            )}

            {/* Article Grids */}
            <div className="space-y-8">
              <Divider
                orientation="left"
                className="text-lg font-semibold"
                style={{
                  color: isDark ? token.colorText : "#1f2937",
                  borderColor: isDark ? token.colorBorder : "#e5e7eb",
                }}
              >
                Latest News
              </Divider>

              {/* First Article Grid */}
              <Row gutter={[20, 20]} className="equal-height-row">
                {grid1Articles.map((article) => (
                  <Col
                    xs={apiResponse.layout.gridConfig.articles.grid1.columns.xs}
                    sm={apiResponse.layout.gridConfig.articles.grid1.columns.sm}
                    lg={apiResponse.layout.gridConfig.articles.grid1.columns.lg}
                    key={article.id}
                  >
                    <ComponentRenderer
                      config={{
                        type: "EnhancedCard",
                      }}
                      theme={isDark ? "dark" : "light"}
                      data={article}
                    />
                  </Col>
                ))}
              </Row>

              {/* Second Article Grid */}
              <Row gutter={[20, 20]} className="equal-height-row">
                {grid2Articles.map((article) => (
                  <Col
                    xs={apiResponse.layout.gridConfig.articles.grid2.columns.xs}
                    sm={apiResponse.layout.gridConfig.articles.grid2.columns.sm}
                    lg={apiResponse.layout.gridConfig.articles.grid2.columns.lg}
                    key={article.id}
                  >
                    <ComponentRenderer
                      config={{
                        type: "EnhancedCard",
                      }}
                      theme={isDark ? "dark" : "light"}
                      data={article}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>

        {/* Right Sidebar - Widgets */}
        <Col xs={24} lg={8} xl={6}>
          <div className="space-y-6">
            {/* Interest Widget */}
            <ComponentRenderer
              config={{
                type: "InterestWidget",
                props: {
                  title: apiResponse.widgets.interests.title,
                  className: "mb-6",
                },
              }}
              theme={isDark ? "dark" : "light"}
              data={apiResponse.widgets.interests.categories}
              onSave={() => {
                const selectedIds = apiResponse.widgets.interests.categories
                  .filter((cat) => cat.selected)
                  .map((cat) => cat.id);
                handleSaveInterests(selectedIds);
              }}
              onClose={handleCloseInterests}
            />

            {/* Weather Widget */}
            <ComponentRenderer
              config={{
                type: "WeatherWidget",
                props: {
                  title: apiResponse.widgets.weather.title,
                  className: "mb-6",
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
                  className: "mb-6",
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

export default EnhancedDynamicLayout;
