import type { FC } from "react";
import { Button, Tooltip } from "antd";
import { Microphone } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";

type VoiceButtonProps = {
  onVoiceClick?: () => void;
};

const VoiceButton: FC<VoiceButtonProps> = ({ onVoiceClick }) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  return (
    <Tooltip title="Voice input" placement="top">
      <Button
        type="text"
        size="small"
        icon={<Microphone size={16} />}
        onClick={onVoiceClick}
        className={clsx(
          "!h-8 !w-8 !rounded-lg !border-0 transition-all duration-200",
          "hover:!scale-105",
          isDark
            ? "!text-gray-400 hover:text-gray-300 !hover:bg-gray-700/50"
            : "!text-gray-500 hover:text-gray-600 !hover:bg-gray-100/50"
        )}
      />
    </Tooltip>
  );
};

export default VoiceButton;
