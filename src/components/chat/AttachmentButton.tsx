import type { FC } from "react";
import { Button, Tooltip, Dropdown } from "antd";
import { PaperclipIcon, ImageIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";

type AttachmentButtonProps = {
  onAttachmentSelect?: (type: string) => void;
};

const AttachmentButton: FC<AttachmentButtonProps> = ({
  onAttachmentSelect,
}) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  const attachmentItems = [
    {
      key: "image",
      label: "Upload Image",
      icon: <ImageIcon size={16} />,
    },
    {
      key: "file",
      label: "Upload File",
      icon: <PaperclipIcon size={16} />,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    onAttachmentSelect?.(key);
  };

  return (
    <Dropdown
      menu={{ items: attachmentItems, onClick: handleMenuClick }}
      trigger={["click"]}
      placement="topLeft"
    >
      <Tooltip title="Attach files" placement="top">
        <Button
          type="text"
          size="small"
          icon={<PaperclipIcon size={16} />}
          className={clsx(
            "!h-8 !w-8 !rounded-lg !border-0 transition-all duration-200",
            "hover:!scale-105",
            isDark
              ? "!text-gray-400 hover:text-gray-300 !hover:bg-gray-700/50"
              : "!text-gray-500 hover:text-gray-600 !hover:bg-gray-100/50"
          )}
        />
      </Tooltip>
    </Dropdown>
  );
};

export default AttachmentButton;
