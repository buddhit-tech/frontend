import type { FC } from "react";
import { theme } from "antd";
import useLayout from "../../../hooks/useLayout";
import { BrandLogoContainer, BrandImage, BrandText } from "./styled";

const BrandLogo: FC = () => {
  const { token } = theme.useToken();
  const { collapsed, isDark } = useLayout();

  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png";

  return (
    <BrandLogoContainer
      $collapsed={collapsed}
      style={{
        backgroundColor: isDark ? "#19181a" : "#f9f9f9",
      }}
    >
      {!collapsed && (
        <div className="flex items-center gap-2">
          <BrandImage alt="Buddhit" src={imageUrl} $collapsed={collapsed} />
          <BrandText style={{ color: token.colorText }}>Buddhit</BrandText>
        </div>
      )}
      {collapsed && (
        <BrandImage alt="Buddhit" src={imageUrl} $collapsed={collapsed} />
      )}
    </BrandLogoContainer>
  );
};

export default BrandLogo;
