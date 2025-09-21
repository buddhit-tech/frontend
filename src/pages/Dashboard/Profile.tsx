import {
  AtIcon,
  BuildingOfficeIcon,
  CameraIcon,
  IdentificationCardIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserIcon,
} from "@phosphor-icons/react";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Statistic,
  Typography,
  Upload,
} from "antd";
import { type FC, useContext, useState } from "react";

import DashboardPageWrapper from "../../components/page/DashboardPageWrapper";

import type { GetProp, UploadProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import LayoutContext from "../../contexts/Layout/context";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AvatarUploader: FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const layoutContext = useContext(LayoutContext);
  const isDark = layoutContext?.isDark ?? false;

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <Avatar
          size={120}
          src={imageUrl}
          className={clsx(
            "border-4 shadow-lg transition-all duration-300",
            "group-hover:shadow-xl group-hover:shadow-blue-500/20",
            isDark ? "border-gray-600" : "border-gray-200"
          )}
          icon={
            !imageUrl && (
              <div
                className={clsx(
                  "flex flex-col items-center justify-center",
                  "transition-all duration-200",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}
              >
                {loading ? (
                  <LoadingOutlined className="text-2xl mb-2" />
                ) : (
                  <CameraIcon size={28} weight="light" className="mb-2" />
                )}
                <span className="text-xs font-medium">
                  {loading ? "Uploading..." : "Add Photo"}
                </span>
              </div>
            )
          }
        />

        {/* Camera overlay button */}
        <div
          className={clsx(
            "absolute -bottom-2 -right-2 z-10",
            "rounded-full p-2 shadow-lg border-2 transition-all duration-200",
            "cursor-pointer hover:scale-110",
            isDark
              ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
          )}
        >
          <CameraIcon size={16} />
        </div>

        {/* Hidden upload input */}
        <Upload
          name="avatar"
          showUploadList={false}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          className="absolute inset-0 opacity-0 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full cursor-pointer" />
        </Upload>
      </div>

      {/* Upload instructions */}
      <div className="mt-4 text-center max-w-xs">
        <Typography.Text
          className={clsx(
            "text-xs leading-relaxed",
            isDark ? "text-gray-400" : "text-gray-500"
          )}
        >
          Click to upload a new photo
        </Typography.Text>
        <br />
        <Typography.Text
          className={clsx(
            "text-xs",
            isDark ? "text-gray-500" : "text-gray-400"
          )}
        >
          PNG, JPG up to 2MB
        </Typography.Text>
      </div>
    </div>
  );
};

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const layoutContext = useContext(LayoutContext);
  const isDark = layoutContext?.isDark ?? false;

  const handleEdit = () => {
    setIsEditing(true);
    message.info("Edit mode enabled");
  };

  const handleSave = async () => {
    try {
      await form.validateFields();
      setIsEditing(false);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Please fill in all required fields");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    message.info("Changes cancelled");
  };

  return (
    <DashboardPageWrapper
      showHeader
      title="Profile"
      subtitle="Manage your personal information and account settings"
    >
      <div className="space-y-6">
        {/* Profile Information Card */}
        <Card
          className={clsx(
            "w-full shadow-lg transition-all duration-300",
            isDark
              ? "bg-gray-800/50 border-gray-700"
              : "bg-white border-gray-200"
          )}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className={clsx(
                "p-2 rounded-lg",
                isDark ? "bg-blue-600/20" : "bg-blue-100"
              )}
            >
              <UserCircleIcon
                size={24}
                className={clsx(isDark ? "text-blue-400" : "text-blue-600")}
                weight="fill"
              />
            </div>
            <Typography.Title
              level={3}
              className={clsx(
                "mb-0 font-semibold",
                isDark ? "text-white" : "text-gray-900"
              )}
            >
              Personal Information
            </Typography.Title>
          </div>

          <Form
            layout="vertical"
            form={form}
            disabled={true}
            className="space-y-6"
          >
            {/* Avatar Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
              <div className="flex-shrink-0">
                <AvatarUploader />
              </div>
              <div className="flex-1">
                <Typography.Title
                  level={5}
                  className={clsx(
                    "mb-2 font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}
                >
                  Profile Picture
                </Typography.Title>
                <Typography.Text
                  className={clsx(
                    "text-sm leading-relaxed block",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}
                >
                  Upload a high-quality photo for your profile. We recommend
                  using a PNG or JPG file. Maximum size: 2 MB. For best results,
                  use an image that's at least 200x200px.
                </Typography.Text>
              </div>
            </div>

            <Divider className="my-6" />

            {/* Basic Information */}
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <UserIcon
                        size={16}
                        className={clsx(
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}
                      />
                      <span className="font-medium">First Name</span>
                    </div>
                  }
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your first name"
                    className={clsx(
                      "transition-all duration-200",
                      isDark
                        ? "bg-gray-700/50 border-gray-600"
                        : "bg-white border-gray-300"
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <UserIcon
                        size={16}
                        className={clsx(
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}
                      />
                      <span className="font-medium">Last Name</span>
                    </div>
                  }
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your last name"
                    className={clsx(
                      "transition-all duration-200",
                      isDark
                        ? "bg-gray-700/50 border-gray-600"
                        : "bg-white border-gray-300"
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <AtIcon
                        size={16}
                        className={clsx(
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}
                      />
                      <span className="font-medium">Email Address</span>
                    </div>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email address"
                    className={clsx(
                      "transition-all duration-200",
                      isDark
                        ? "bg-gray-700/50 border-gray-600"
                        : "bg-white border-gray-300"
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <BuildingOfficeIcon
                        size={16}
                        className={clsx(
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}
                      />
                      <span className="font-medium">Organization</span>
                    </div>
                  }
                  name="orgName"
                >
                  <Input
                    size="large"
                    placeholder="Enter your organization name"
                    className={clsx(
                      "transition-all duration-200",
                      isDark
                        ? "bg-gray-700/50 border-gray-600"
                        : "bg-white border-gray-300"
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon
                        size={16}
                        className={clsx(
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}
                      />
                      <span className="font-medium">Access Type</span>
                    </div>
                  }
                  name="accessType"
                >
                  <Input
                    size="large"
                    placeholder="Your access level"
                    className={clsx(
                      "transition-all duration-200",
                      isDark
                        ? "bg-gray-700/50 border-gray-600"
                        : "bg-white border-gray-300"
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <IdentificationCardIcon
                        size={16}
                        className={clsx(
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}
                      />
                      <span className="font-medium">Buddhit ID</span>
                    </div>
                  }
                  name="buddhitId"
                >
                  <Input
                    size="large"
                    placeholder="Your unique Buddhit ID"
                    className={clsx(
                      "transition-all duration-200",
                      isDark
                        ? "bg-gray-700/50 border-gray-600"
                        : "bg-white border-gray-300"
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <br />
        {/* Account Statistics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card
              className={clsx(
                "text-center shadow-lg transition-all duration-300 hover:shadow-xl",
                isDark
                  ? "bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700"
                  : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              )}
            >
              <Statistic
                title={
                  <span
                    className={clsx(
                      "text-sm font-medium",
                      isDark ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    Account Status
                  </span>
                }
                value="Active"
                valueStyle={{
                  color: "#52c41a",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              className={clsx(
                "text-center shadow-lg transition-all duration-300 hover:shadow-xl",
                isDark
                  ? "bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700"
                  : "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              )}
            >
              <Statistic
                title={
                  <span
                    className={clsx(
                      "text-sm font-medium",
                      isDark ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    Member Since
                  </span>
                }
                value="2024"
                valueStyle={{
                  color: isDark ? "#4ade80" : "#059669",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              className={clsx(
                "text-center shadow-lg transition-all duration-300 hover:shadow-xl",
                isDark
                  ? "bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700"
                  : "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
              )}
            >
              <Statistic
                title={
                  <span
                    className={clsx(
                      "text-sm font-medium",
                      isDark ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    Profile Complete
                  </span>
                }
                value="85%"
                valueStyle={{
                  color: isDark ? "#a78bfa" : "#7c3aed",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardPageWrapper>
  );
};

export default Profile;
