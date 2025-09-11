import {
  AtomIcon,
  ChatCircleDotsIcon,
  InfinityIcon,
  NotebookIcon,
} from "@phosphor-icons/react";

export const DefaultMenuItems = [
  {
    key: "1.1",
    label: "New Chat",
    icon: <ChatCircleDotsIcon weight="bold" />,
  },
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
      { key: "5", label: "Option 5", isDeletable: true },
      { key: "6", label: "Option 6", isDeletable: true },
      { key: "7", label: "Option 7", isDeletable: true },
      { key: "8", label: "Option 8", isDeletable: true },
    ],
  },
  {
    key: "my_subjects",
    label: "My Subjects",
    icon: <NotebookIcon weight="bold" />,
    children: [
      {
        key: "9",
        label: "Option 9",
        hasOptions: true,
      },
      {
        key: "10",
        label: "Option 10",
        hasOptions: true,
      },
    ],
  },
];
