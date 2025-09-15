import type { FC, MouseEventHandler, ReactNode } from "react";
import { useState, useMemo } from "react";
import { Avatar, theme, Button } from "antd";
import styled from "styled-components";
import ChatTileDetails from "./ChatTileDetails";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";

export type ChatTileSubItem = {
  id: string;
  label: ReactNode;
  onClick?: () => void;
};

export type ChatTileProps = {
  chatId: string;
  name: string;
  avatar: string;
  status?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  subItems?: ChatTileSubItem[];
  accordionTitle?: ReactNode;
  accordionContent?: ReactNode;
  defaultOpen?: boolean;
};

const TileContainer = styled.div<{ $hoverBg: string; $text: string }>`
  display: flex;
  align-items: center;
  gap: 0.75rem; /* 12px */
  padding: 0.5rem; /* 8px */
  border-radius: 0.5rem; /* 8px */
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 0.25rem; /* 4px */
  background-color: transparent;

  &:hover {
    background-color: ${(p) => p.$hoverBg};
  }

  .tile-name {
    color: ${(p) => p.$text};
  }
`;

const RightActions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

/* details extracted to ChatTileDetails */

const ChatTile: FC<ChatTileProps> = ({
  chatId,
  name,
  avatar,
  status,
  onClick,
  subItems,
  accordionTitle = "Details",
  accordionContent,
  defaultOpen = false,
}) => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const items = useMemo(() => subItems, [subItems]);

  return (
    <div data-chat-id={chatId}>
      <TileContainer
        $hoverBg={token.colorFill}
        $text={token.colorText}
        onClick={onClick}
      >
        <Avatar
          src={avatar}
          alt={name}
          size={40}
          style={{
            border: `2px solid ${token.colorBorder}`,
            boxShadow: token.boxShadowSecondary,
          }}
        />

        <div className="flex flex-col min-w-0">
          <span className="font-medium text-base truncate tile-name">
            {name}
          </span>
          {status ? (
            <span
              className="text-xs truncate"
              style={{ color: token.colorTextSecondary }}
            >
              {status}
            </span>
          ) : null}
        </div>

        <RightActions>
          <Button
            type="text"
            size="small"
            aria-label={open ? "Collapse" : "Expand"}
            style={{ outline: "none", boxShadow: "none" }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            icon={open ? <CaretUpIcon /> : <CaretDownIcon />}
          />
        </RightActions>
      </TileContainer>

      {open ? (
        <ChatTileDetails
          items={items}
          accordionTitle={accordionTitle}
          accordionContent={accordionContent}
        />
      ) : null}
    </div>
  );
};

export default ChatTile;
