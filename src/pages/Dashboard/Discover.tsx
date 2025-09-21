import type { FC } from "react";
import { Spin, Alert, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import EnhancedDynamicLayout from "../../components/discover/EnhancedDynamicLayout";
import { mockEnhancedDiscoverApiResponse } from "../../data/enhancedDiscoverApiResponse";
import { useDiscoverData } from "../../hooks/useDiscoverQuery";

const Discover: FC = () => {
  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useDiscoverData("/api/discover");

  // Use mock data if API fails
  const displayData = apiResponse || mockEnhancedDiscoverApiResponse;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error && !displayData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert
          message="Error Loading Content"
          description={error.message || "Failed to load discover content"}
          type="error"
          showIcon
          className="max-w-md"
          action={
            <Button
              size="small"
              danger
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
              loading={isFetching}
            >
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert
          message="No Data"
          description="No discover content available"
          type="info"
          showIcon
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {isFetching && (
        <div className="fixed top-4 right-4 z-50">
          <Spin size="small" />
        </div>
      )}
      <EnhancedDynamicLayout apiResponse={displayData} />
    </div>
  );
};

export default Discover;
