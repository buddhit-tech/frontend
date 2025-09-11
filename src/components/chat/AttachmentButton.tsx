import type { FC } from "react";
import {
  Plus,
  Paperclip,
  GoogleDriveLogo,
  BookOpen,
  Palette,
  Lightbulb,
  Binoculars,
} from "@phosphor-icons/react";
import { theme } from "antd";
import type { MenuProps } from "antd";
import ThemeAwareDropdown from "../common/ThemeAwareDropdown";

type AttachmentButtonProps = {
  onAttachmentSelect?: (key: string) => void;
};

const AttachmentButton: FC<AttachmentButtonProps> = ({
  onAttachmentSelect,
}) => {
  const { token } = theme.useToken();

  const handleMenuClick = ({ key }: { key: string }) => {
    onAttachmentSelect?.(key);
  };

  // Main menu items
  const attachmentMenuItems: MenuProps["items"] = [
    {
      key: "add-photos-files",
      label: "Add photos & files",
      icon: <Paperclip size={16} />,
    },
    {
      key: "add-google-drive",
      label: "Add from Google Drive",
      icon: <GoogleDriveLogo size={16} />,
    },
    {
      key: "study-learn",
      label: "Study and learn",
      icon: <BookOpen size={16} />,
    },
    {
      key: "create-image",
      label: "Create image",
      icon: <Palette size={16} />,
    },
    {
      key: "think-longer",
      label: "Think longer",
      icon: <Lightbulb size={16} />,
    },
    {
      key: "deep-research",
      label: "Deep research",
      icon: <Binoculars size={16} />,
    },
  ];

  return (
    <ThemeAwareDropdown
      menuItems={attachmentMenuItems}
      onMenuClick={handleMenuClick}
      tooltip="Attach files"
      tooltipPlacement="top"
      placement="topLeft"
      minWidth="280px"
      maxWidth="320px"
    >
      <button
        className="flex items-center justify-center w-6 h-6 rounded transition-all duration-200 hover:scale-105"
        style={{
          color: token.colorTextSecondary,
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = token.colorText;
          e.currentTarget.style.backgroundColor = token.colorFill;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = token.colorTextSecondary;
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <Plus size={16} weight="bold" />
      </button>
    </ThemeAwareDropdown>
  );
};

export default AttachmentButton;
