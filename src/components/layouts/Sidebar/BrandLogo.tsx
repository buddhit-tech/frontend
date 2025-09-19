import type { FC } from "react";
import { theme } from "antd";
import useLayout from "../../../hooks/useLayout";
import {
  BrandLogoContainer,
  BrandLogoContent,
  BrandImage,
  BrandText,
} from "./styled";

const BrandLogo: FC = () => {
  const { token } = theme.useToken();
  const { collapsed, darkMode } = useLayout();

  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png";

  return (
    <BrandLogoContainer
      $collapsed={collapsed}
      style={{
        backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
        borderColor: token.colorBorder,
      }}
    >
      {!collapsed && (
        <BrandLogoContent>
          <BrandImage alt="Buddhit" src={imageUrl} $collapsed={collapsed} />
          <BrandText style={{ color: token.colorText }}>Buddhit</BrandText>
        </BrandLogoContent>
      )}
      {collapsed && (
        <BrandImage alt="Buddhit" src={imageUrl} $collapsed={collapsed} />
      )}
    </BrandLogoContainer>
  );
};

export default BrandLogo;
