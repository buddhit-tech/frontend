import type { FC } from "react";
import { Button, Tooltip } from "antd";
import { SmileyIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";

type EmojiButtonProps = {
  onEmojiClick?: () => void;
};

const EmojiButton: FC<EmojiButtonProps> = ({ onEmojiClick }) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  return (
    <Tooltip title="Add emoji" placement="top">
      <Button
        type="text"
        size="small"
        icon={<SmileyIcon size={16} />}
        onClick={onEmojiClick}
        className={clsx(
          "absolute right-2 bottom-1 !h-7 !w-7 !rounded-lg !border-0 transition-all duration-200",
          "hover:!scale-105",
          isDark
            ? "!text-gray-400 hover:text-gray-300 !hover:bg-gray-700/50"
            : "!text-gray-500 hover:text-gray-600 !hover:bg-gray-100/50"
        )}
      />
    </Tooltip>
  );
};

export default EmojiButton;
