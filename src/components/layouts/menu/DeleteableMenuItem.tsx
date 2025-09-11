import { type FC, type ReactNode } from "react";
import { TrashIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../../hooks/useLayout";
import { Modal, ConfigProvider, theme } from "antd";

interface DeleteableMenuItemProps {
  label: string;
  icon?: ReactNode;
}

const DeleteableMenuItem: FC<DeleteableMenuItemProps> = ({ label, icon }) => {
  const [modal, contextHolder] = Modal.useModal();

  const { darkMode } = useLayout();

  const handleDelete = async () => {
    const confirmed = await modal.confirm({
      centered: true,
      title: "Delete",
      onOk: () => {},
      onCancel: () => {},
      content: "Are you sure you want to delete this chat?",
    });
    console.log("Confirmed: ", confirmed);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm:
          darkMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="flex items-center justify-between">
        {icon && icon}
        <span>{label}</span>
        <div
          onClick={handleDelete}
          className={clsx(
            "p-1 flex items-center justify-center rounded transition-all duration-200 ease-in-out cursor-pointer",
            darkMode === "dark"
              ? "hover:bg-[#212121] hover:bg-opacity-15"
              : "hover:bg-gray-200 hover:bg-opacity-50"
          )}
        >
          <TrashIcon
            size={16}
            color={darkMode === "dark" ? "white" : "#177ddc"}
          />
        </div>
      </div>
      {contextHolder}
    </ConfigProvider>
  );
};

export default DeleteableMenuItem;
