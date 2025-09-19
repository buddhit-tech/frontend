import type { FC } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import useLayout from "../../../hooks/useLayout";
import { ToggleButtonContainer, ToggleButton, ToggleIcon } from "./styled";

const SidebarToggleButton: FC = () => {
  const { toggleCollapse, collapsed, darkMode } = useLayout();

  const Icon = collapsed ? CaretRightIcon : CaretLeftIcon;
  const isDark = darkMode === "dark";

  return (
    <ToggleButtonContainer>
      <ToggleButton $isDark={isDark} onClick={toggleCollapse}>
        <ToggleIcon>
          <Icon
            size={18}
            weight="bold"
            color={isDark ? "#f5f5f5" : "#262626"}
          />
        </ToggleIcon>
      </ToggleButton>
    </ToggleButtonContainer>
  );
};

export default SidebarToggleButton;
