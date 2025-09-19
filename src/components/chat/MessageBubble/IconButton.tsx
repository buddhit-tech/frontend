import type { FC } from "react";
import { Tooltip } from "antd";
import { ActionButton } from "./styled";

type IconButtonProps = {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
  isDark: boolean;
};

const IconButton: FC<IconButtonProps> = ({
  icon,
  tooltip,
  onClick,
  isDark,
}) => (
  <Tooltip title={tooltip} placement="top">
    <ActionButton $isDark={isDark} onClick={onClick} icon={icon} />
  </Tooltip>
);

export default IconButton;
