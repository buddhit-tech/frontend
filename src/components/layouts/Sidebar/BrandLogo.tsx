import { useMemo, type FC } from "react";
import { theme } from "antd";
import useLayout from "../../../hooks/useLayout";
import { BrandLogoContainer, BrandImage, BrandText } from "./styled";
import DarkLogo from "../../../assets/logo/buddhit-white.svg";
import LightLogo from "../../../assets/logo/buddhit-black.svg";

const BrandLogo: FC = () => {
  const { token } = theme.useToken();
  const { collapsed, isDark } = useLayout();

  const imageURL = useMemo<string>(
    () => (isDark ? DarkLogo : LightLogo),
    [isDark]
  );

  return (
    <BrandLogoContainer
      $collapsed={collapsed}
      style={{
        backgroundColor: isDark ? "#19181a" : "#f9f9f9",
      }}
    >
      {!collapsed && (
        <div className="flex items-center gap-2">
          <BrandImage alt="Buddhit" src={imageURL} $collapsed={collapsed} />
          <BrandText style={{ color: token.colorText }}>Buddhit</BrandText>
        </div>
      )}
      {collapsed && (
        <BrandImage alt="Buddhit" src={imageURL} $collapsed={collapsed} />
      )}
    </BrandLogoContainer>
  );
};

export default BrandLogo;
