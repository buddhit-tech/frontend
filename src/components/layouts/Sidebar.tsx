import { type FC, useState } from "react";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, Dropdown, Avatar } from "antd";
import useLayout from "../../hooks/useLayout";
import {
  AtomIcon,
  CaretLeftIcon,
  CaretRightIcon,
  InfinityIcon,
  MoonIcon,
  NotebookIcon,
  SunIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const DefaultMenuItems = [
  {
    key: "1",
    label: "Discover",
    icon: <InfinityIcon weight="bold" />,
  },
  {
    key: "my_space",
    label: "My Space",
    icon: <AtomIcon weight="bold" />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
    ],
  },
  {
    key: "my_subjects",
    label: "My Subjects",
    icon: <NotebookIcon weight="bold" />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
    ],
  },
];

const BrandLogo: FC = () => {
  const { toggleCollapse, collapsed, darkMode } = useLayout();
  const [isHover, setIsHover] = useState(false);

  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png";

  if (!collapsed) {
    return (
      <div
        className={clsx(
          "flex items-center justify-between p-2",
          darkMode === "dark" ? "bg-[#001529]" : "bg-white"
        )}
      >
        <div className="flex items-center gap-2">
          <img
            alt="Buddhit"
            className="w-8 h-8 shrink-0 object-contain"
            src={imageUrl}
          />
          <span
            className={clsx(
              "font-bold",
              darkMode === "dark" ? "text-white" : "text-[#262626]"
            )}
          >
            Buddhit
          </span>
        </div>
        <Button
          type="text"
          size="small"
          shape="circle"
          onClick={toggleCollapse}
          className={clsx(
            darkMode === "dark"
              ? "text-white hover:bg-[#177ddc] hover:bg-opacity-20"
              : "text-[#595959] hover:bg-[#f5f5f5]"
          )}
          icon={
            <CaretLeftIcon color={darkMode === "dark" ? "white" : "black"} />
          }
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={clsx(
        "relative flex items-center justify-center h-10 p-2",
        darkMode === "dark" ? "bg-[#001529]" : "bg-white"
      )}
    >
      {!isHover ? (
        <img
          alt="Buddhit"
          src={imageUrl}
          className="w-10 h-10 object-contain"
        />
      ) : (
        <Button
          type="text"
          size="small"
          shape="circle"
          onClick={toggleCollapse}
          className={clsx(
            darkMode === "dark"
              ? "text-white hover:bg-[#177ddc] hover:bg-opacity-20"
              : "text-[#595959] hover:bg-[#f5f5f5]"
          )}
          icon={
            <CaretRightIcon color={darkMode === "dark" ? "white" : "black"} />
          }
        />
      )}
    </div>
  );
};

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { collapsed, darkMode, toggleMode } = useLayout();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "mode",
      icon: darkMode === "dark" ? <SunIcon /> : <MoonIcon />,
      label: darkMode === "dark" ? "Light Mode" : "Dark Mode",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "profile":
        navigate("/profile");
        break;
      case "settings":
        console.log("Settings clicked");
        break;
      case "mode":
        toggleMode(darkMode === "dark" ? false : true);
        break;
      case "logout":
        console.log("Logout clicked");
        break;
    }
  };

  if (collapsed) {
    return (
      <div
        className={clsx(
          "flex justify-center p-2 border-t border-r",
          darkMode === "dark"
            ? "border-[#303030] bg-[#001529]"
            : "border-[#f0f0f0] bg-white"
        )}
      >
        <Dropdown
          trigger={["click"]}
          placement="topRight"
          menu={{ items: userMenuItems, onClick: handleMenuClick }}
          overlayStyle={{ width: "256px" }}
        >
          <Avatar
            size={48}
            icon={<UserOutlined />}
            className={clsx(
              "cursor-pointer hover:opacity-80 transition-opacity",
              darkMode === "dark" ? "bg-[#177ddc]" : "bg-[#1890ff]"
            )}
          />
        </Dropdown>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "p-3 border-t border-r",
        darkMode === "dark"
          ? "border-[#303030] bg-[#001529]"
          : "border-[#f0f0f0] bg-white"
      )}
    >
      <Dropdown
        menu={{ items: userMenuItems, onClick: handleMenuClick }}
        placement="topRight"
        trigger={["click"]}
        overlayStyle={{ width: "256px" }}
      >
        <div
          className={clsx(
            "flex items-center gap-3 cursor-pointer rounded-lg p-2 transition-colors",
            darkMode === "dark"
              ? "hover:bg-[#177ddc] hover:bg-opacity-20"
              : "hover:bg-[#f5f5f5]"
          )}
        >
          <Avatar
            size={48}
            icon={<UserOutlined />}
            className={clsx(
              "shrink-0",
              darkMode === "dark" ? "bg-[#177ddc]" : "bg-[#1890ff]"
            )}
          />
          <div className="flex-1 min-w-0">
            <div
              className={clsx(
                "text-sm font-medium truncate",
                darkMode === "dark" ? "text-white" : "text-[#262626]"
              )}
            >
              John Doe
            </div>
            <div
              className={clsx(
                "text-xs truncate",
                darkMode === "dark" ? "text-[#8c8c8c]" : "text-[#595959]"
              )}
            >
              john.doe@example.com
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

const Sidebar: FC = () => {
  const { collapsed, darkMode } = useLayout();

  if (collapsed) {
    return (
      <div className="w-[80px] h-[100vh] flex flex-col">
        <div
          className={clsx(
            "p-2 border-r",
            darkMode === "dark"
              ? "border-[#303030] bg-[#001529]"
              : "border-[#f0f0f0] bg-white"
          )}
        >
          <BrandLogo />
        </div>
        <Menu
          mode="inline"
          items={DefaultMenuItems}
          theme={darkMode}
          className="flex-1 w-[80px] border-0 [&_.ant-menu]:border-0 [&_.ant-menu-inline]:border-0"
          defaultOpenKeys={["sub1"]}
          defaultSelectedKeys={["1"]}
          inlineCollapsed={true}
        />
        <UserProfile />
      </div>
    );
  }

  return (
    <div className="w-[256px] h-[100vh] flex flex-col">
      <div
        className={clsx(
          "p-2 border-r",
          darkMode === "dark"
            ? "border-[#303030] bg-[#001529]"
            : "border-[#f0f0f0] bg-white"
        )}
      >
        <BrandLogo />
      </div>
      <Menu
        mode="inline"
        items={DefaultMenuItems}
        theme={darkMode}
        className="flex-1 w-[256px] border-0 [&_.ant-menu]:border-0 [&_.ant-menu-inline]:border-0"
        defaultOpenKeys={["sub1"]}
        defaultSelectedKeys={["1"]}
        inlineCollapsed={false}
      />
      <UserProfile />
    </div>
  );
};

export default Sidebar;
