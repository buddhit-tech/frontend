import { Card, Col, Divider, Form, Input, Row, Typography } from "antd";
import { UserCircleIcon } from "@phosphor-icons/react";
import DashboardPageWrapper from "../../components/page/DashboardPageWrapper";

import { useState, type FC } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";

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

const Uploader: FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        className="avatar-uploader"
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

const Profile = () => {
  const [form] = Form.useForm();

  return (
    <DashboardPageWrapper
      showHeader
      title="Profile"
      subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, neque?"
    >
      <Row gutter={16}>
        <Col span={24}>
          <Card className="w-full shadow-sx !rounded-[4px]">
            <div className="flex gap-2 items-center mb-4">
              <UserCircleIcon size={30} color="#000" weight="fill" />
              <Typography.Text className="mb-0 p-0">
                <span className="text-xl">Your Profile Information</span>
              </Typography.Text>
            </div>
            <Form layout="vertical" form={form} disabled>
              <div className="w-full flex items-center gap-4">
                <Form.Item label="Profile Image">
                  <Uploader />
                </Form.Item>
                <Typography.Text>
                  Upload a PNG, JPG, or SVG file. Maximum size: 5 MB.
                  Recommended size: 200x200px for best results.
                </Typography.Text>
              </div>
              <Divider className="mt-0 pt-0" />
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input size="large" placeholder="Your first name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input size="large" placeholder="Your last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Email" name="email">
                    <Input size="large" placeholder="Your email address" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Organization Name" name="orgName">
                    <Input size="large" placeholder="Your organization name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Access Type" name="accessType">
                    <Input size="large" placeholder="Your access type" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Buddhit ID" name="buddhitId">
                    <Input size="large" placeholder="Your Buddhit ID" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </DashboardPageWrapper>
  );
};

export default Profile;
