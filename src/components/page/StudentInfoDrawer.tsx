import { Drawer, Input, List, Button, Typography, Empty, Modal } from "antd";
import type { FC } from "react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import { TrashIcon } from "@phosphor-icons/react";

type StudentInfoDrawerProps = {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
};

const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StudentInfoDrawer: FC<StudentInfoDrawerProps> = ({
  open,
  onClose,
  isDark,
}) => {
  useAuth();
  const [query, setQuery] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const teachers = useMemo(
    () => [
      {
        id: "t1",
        name: "Dr. Amelia Watson",
        subject: "Mathematics",
        email: "amelia.watson@example.com",
        avatar: null as string | null,
      },
      {
        id: "t2",
        name: "Mr. Leo Park",
        subject: "Physics",
        email: "leo.park@example.com",
        avatar: null as string | null,
      },
      {
        id: "t3",
        name: "Ms. Ava Kapoor",
        subject: "Chemistry",
        email: "ava.kapoor@example.com",
        avatar: null as string | null,
      },
      {
        id: "t4",
        name: "Prof. Mateo Rossi",
        subject: "Biology",
        email: "mateo.rossi@example.com",
        avatar: null as string | null,
      },
    ],
    []
  );

  const filteredTeachers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q)
    );
  }, [query, teachers]);

  const handleDeleteClick = (itemId: string) => {
    setItemToDelete(itemId);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      // TODO: Implement actual delete logic here
      console.log("Deleting item:", itemToDelete);
      // You can add your delete API call here
    }
    setDeleteModalVisible(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setItemToDelete(null);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={380}
      title={
        <span
          className={clsx(
            "font-medium",
            isDark ? "text-white" : "text-[#19181a]"
          )}
        >
          Teacher Chat List
        </span>
      }
      styles={{
        header: {
          borderBottom: isDark ? "1px solid #303030" : "1px solid #f0f0f0",
          backgroundColor: isDark ? "#212121" : "#fff",
        },
        body: {
          backgroundColor: isDark ? "#212121" : "#fff",
          padding: 0,
        },
      }}
    >
      <DrawerBody className={clsx(isDark ? "text-white" : "text-[#19181a]")}>
        <div className="p-6">
          <Input.Search
            allowClear
            size="large"
            placeholder="Search teachers by name, subject, or email"
            onChange={(e) => setQuery(e.target.value)}
            className={clsx(
              "mb-5 rounded-full",
              isDark ? "[&_.ant-input]:bg-[#1a1a1a]" : "[&_.ant-input]:bg-white"
            )}
          />
          {filteredTeachers.length === 0 ? (
            <Empty
              description={
                <span
                  className={clsx(isDark ? "text-[#8c8c8c]" : "text-[#666]")}
                >
                  No teachers found
                </span>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <List
              itemLayout="vertical"
              split={false}
              dataSource={filteredTeachers}
              className="mt-2"
              renderItem={(item) => (
                <div
                  className={clsx(
                    "flex items-center gap-4 p-3 mb-3 rounded-xl border transition-colors",
                    isDark
                      ? "border-[#2b2b2b] bg-[#1b1b1b] hover:border-[#3a3a3a] hover:bg-[#202020]"
                      : "border-[#f0f0f0] bg-white hover:border-[#e6e6e6] hover:bg-[#fafafa]"
                  )}
                >
                  {/* <Avatar size={44} src={item.avatar || undefined}>
                    {item.name?.[0]}
                  </Avatar> */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Typography.Text
                        className={clsx(
                          "font-medium truncate",
                          isDark ? "text-white" : "text-[#19181a]"
                        )}
                      >
                        Q1: Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Numquam iusto eveniet laborum fugiat, perferendis
                        pariatur quam veniam eligendi totam expedita?
                      </Typography.Text>
                      {/* <Tag
                        color={isDark ? "geekblue" : "blue"}
                        className="rounded-full px-2 m-0"
                      >
                        {item.subject}
                      </Tag> */}
                    </div>
                    {/* <Typography.Text
                      className={clsx(
                        "block text-sm truncate",
                        isDark ? "text-[#8c8c8c]" : "text-[#5a5f6a]"
                      )}
                    >
                      {item.name}
                    </Typography.Text> */}
                  </div>
                  <div className="shrink-0">
                    <Button
                      type="text"
                      size="small"
                      shape="round"
                      onClick={() => handleDeleteClick(item.id)}
                      className={clsx(
                        "hover:bg-red-50 hover:text-red-600",
                        isDark && "hover:bg-red-900/20 hover:text-red-400"
                      )}
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </div>
              )}
            />
          )}
        </div>
      </DrawerBody>

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        centered
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          className:
            "bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600",
        }}
        cancelButtonProps={{
          className: clsx(
            isDark
              ? "bg-[#2a2a2a] border-[#404040] text-white hover:bg-[#3a3a3a] hover:border-[#505050]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          ),
        }}
        className={clsx(
          isDark
            ? "[&_.ant-modal-content]:bg-[#1a1a1a] [&_.ant-modal-header]:bg-[#1a1a1a] [&_.ant-modal-header]:border-[#404040] [&_.ant-modal-title]:text-white"
            : ""
        )}
      >
        <p className={clsx(isDark ? "text-white" : "text-gray-700")}>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
      </Modal>
    </Drawer>
  );
};

export default StudentInfoDrawer;
