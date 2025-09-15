import type { FC, ReactNode } from "react";
import { theme, Collapse, Menu, Typography } from "antd";
import styled from "styled-components";

export type ChatTileDetailsItem = {
  id: string;
  label: ReactNode;
  onClick?: () => void;
};

export type ChatTileDetailsProps = {
  items?: ChatTileDetailsItem[];
  accordionTitle?: ReactNode;
  accordionContent?: ReactNode;
};

const DetailsWrapper = styled.div<{ $border: string }>`
  margin: 0.25rem 0;
  /* Remove side borders and indentation so items can be truly full width */
  padding-left: 0;
  border-left: 0;

  /* Ensure menu spans full width and has pleasant spacing */
  & .ant-menu-inline,
  & .ant-menu-vertical {
    width: 100%;
    background: transparent;
    border-inline-end: 0 !important;
  }

  /* Remove right selection indicator line */
  & .ant-menu-item::after {
    border-inline-end: 0 !important;
    border: none !important;
  }

  & .ant-menu-item {
    margin: 4px 0;
    border-radius: 8px;
    padding-inline: 10px !important;
  }

  /* Make the clickable title area stretch full width */
  & .ant-menu-title-content {
    display: block;
    width: 100%;
  }
`;

const ScrollableMenu = styled.div<{ $maxHeight: number }>`
  width: 100%;
  max-height: ${(p) => p.$maxHeight}px;
  overflow-y: auto;
  overflow-x: hidden;

  /* smooth scrollbar, subtle in dark/light */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

const ChatTileDetails: FC<ChatTileDetailsProps> = ({
  items,
  accordionTitle = "Details",
  accordionContent,
}) => {
  const { token } = theme.useToken();

  const menuItems = (items ?? []).map((item) => ({
    key: item.id,
    label: item.label,
    onClick: item.onClick,
  }));

  // AntD menu item default height ~40px. Show 5 items then scroll.
  const itemHeight = 40;
  const maxVisibleItems = 5;
  const maxHeight = maxVisibleItems * itemHeight + 4; // small buffer

  return (
    <DetailsWrapper $border={token.colorBorder}>
      {menuItems.length > 0 ? (
        <ScrollableMenu $maxHeight={maxHeight}>
          <Menu mode="inline" selectable={false} items={menuItems} />
        </ScrollableMenu>
      ) : null}

      {accordionContent ? (
        <Collapse
          bordered={false}
          style={{
            background: "transparent",
            marginTop: menuItems.length ? 8 : 0,
          }}
          items={[
            {
              key: "accordion",
              label: (
                <Typography.Text style={{ color: token.colorText }}>
                  {accordionTitle}
                </Typography.Text>
              ),
              children: (
                <div style={{ color: token.colorTextSecondary }}>
                  {accordionContent}
                </div>
              ),
            },
          ]}
        />
      ) : null}
    </DetailsWrapper>
  );
};

export default ChatTileDetails;
