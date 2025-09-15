import { type FC, type MouseEvent, type ReactNode } from "react";
import { Avatar, Modal, Descriptions, Typography, Tag, Space } from "antd";
import { InfoIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../../hooks/useLayout";
import { useToggle } from "usehooks-ts";

interface SidebarMenuItemWithFixedOptionProps {
  label: string;
  icon?: ReactNode;
}

const SidebarMenuItemWithFixedOption: FC<
  SidebarMenuItemWithFixedOptionProps
> = ({ label, icon }) => {
  const { darkMode } = useLayout();
  const [isOpen, toggler] = useToggle();

  const actionClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggler();
  };

  return (
    <div className="flex items-center justify-between">
      {icon && icon}
      <span>{label}</span>
      <div
        onClick={actionClickHandler}
        className={clsx(
          "p-1 flex items-center justify-center rounded-sm transition-all duration-200 ease-in-out cursor-pointer",
          darkMode === "dark"
            ? "hover:bg-[#212121] hover:bg-opacity-15"
            : "hover:bg-gray-200 hover:bg-opacity-50"
        )}
      >
        <InfoIcon
          size={16}
          weight="bold"
          color={darkMode === "dark" ? "white" : "#177ddc"}
        />
      </div>
      <Modal
        centered
        width={720}
        open={isOpen}
        footer={null}
        onCancel={toggler}
        title="Subject Details"
        closable={{ "aria-label": "Custom Close Button" }}
      >
        <div className="px-1 py-1 md:py-2">
          <Descriptions
            colon
            bordered
            column={1}
            size="middle"
            className="rounded-md overflow-hidden"
          >
            <Descriptions.Item label="Class Name">Dummy Name</Descriptions.Item>
            <Descriptions.Item label="Class Description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
              error.
            </Descriptions.Item>
            <Descriptions.Item label="Subject Name">
              Dummy Subject Name
            </Descriptions.Item>
            <Descriptions.Item label="Subject Description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              a.
            </Descriptions.Item>
            <Descriptions.Item label="Teacher">
              <Space size={12} align="start" className="items-start">
                <Avatar
                  size={48}
                  shape="square"
                  src="https://www.institutobrasilisrael.org/wp-content/uploads/2017/10/speaker3-min.jpg"
                />
                <div className="flex flex-col">
                  <Typography.Text strong>Anna Hathway</Typography.Text>
                  <Typography.Text type="secondary" className="mt-0.5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis, vitae.
                  </Typography.Text>
                </div>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Associated Books">
              <div className="flex flex-wrap gap-2">
                {["Colorful Anatomy", "Great Specimens", "The Species"].map(
                  (book) => (
                    <Tag key={book} color="blue" className="m-0">
                      {book}
                    </Tag>
                  )
                )}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
    </div>
  );
};

export default SidebarMenuItemWithFixedOption;
