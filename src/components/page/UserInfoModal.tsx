import { Avatar, Divider, Modal, Tag, Typography } from "antd";
import type { FC } from "react";
import clsx from "clsx";
import type { ChatUser } from "../../contexts/Chat/types";

type UserInfoModalProps = {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  chatUser: ChatUser | null;
};

const UserInfoModal: FC<UserInfoModalProps> = ({
  open,
  onClose,
  isDark,
  chatUser,
}) => {
  return (
    <Modal
      centered
      open={open}
      onCancel={onClose}
      footer={null}
      width={480}
      className={clsx("rounded-xl", isDark ? "dark-modal" : "light-modal")}
      styles={{
        body: {
          padding: 24,
          backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
        },
        header: {
          backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
        },
        content: {
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
        },
      }}
      title={
        <div className="flex items-center gap-3">
          <Avatar size={48} src={chatUser?.avatar || undefined}>
            {chatUser?.name?.[0]}
          </Avatar>
          <div className="flex flex-col">
            <span
              className={clsx(
                "text-lg font-semibold",
                isDark ? "text-white" : "text-[#19181a]"
              )}
            >
              {chatUser?.name || "User"}
            </span>
            {chatUser?.status && (
              <span
                className={clsx(
                  "text-xs",
                  isDark ? "text-[#a1a1aa]" : "text-[#6b7280]"
                )}
              >
                {chatUser.status}
              </span>
            )}
          </div>
        </div>
      }
    >
      <div
        className={clsx(
          "flex flex-col gap-4",
          isDark ? "text-[#d4d4d8]" : "text-[#111827]"
        )}
      >
        <div
          className={clsx(
            "rounded-lg p-4",
            isDark
              ? "bg-[#141414] border border-[#2a2a2a]"
              : "bg-[#fafafa] border border-[#f0f0f0]"
          )}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span
                className={clsx(
                  "text-sm",
                  isDark ? "text-[#a1a1aa]" : "text-[#6b7280]"
                )}
              >
                Name
              </span>
              <span className="text-base font-medium">
                {chatUser?.name || "-"}
              </span>
            </div>
            <div className="flex flex-col items-end">
              {chatUser?.status && (
                <Tag color={isDark ? "geekblue" : "blue"}>
                  {chatUser.status}
                </Tag>
              )}
            </div>
            <div className="flex flex-col">
              <span
                className={clsx(
                  "text-sm",
                  isDark ? "text-[#a1a1aa]" : "text-[#6b7280]"
                )}
              >
                User ID
              </span>
              <span className="text-base break-all">
                {chatUser?.userId || "-"}
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={clsx(
                  "text-sm",
                  isDark ? "text-[#a1a1aa]" : "text-[#6b7280]"
                )}
              >
                Chat ID
              </span>
              <span className="text-base break-all">
                {chatUser?.chatId || "-"}
              </span>
            </div>
          </div>
          <Divider
            className={clsx(isDark ? "border-[#2a2a2a]" : "border-[#f0f0f0]")}
          />
          <Typography.Text
            className={clsx(
              "m-0 p-0 text-center text-sm",
              isDark ? "text-[#8b949e]" : "text-[#6b7280]"
            )}
          >
            This information is visible only to you.
          </Typography.Text>
        </div>
      </div>
    </Modal>
  );
};

export default UserInfoModal;
