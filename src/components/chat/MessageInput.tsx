import type { FC } from "react";
import { Input } from "antd";
import styled from "styled-components";
import useLayout from "../../hooks/useLayout";

type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
};

const StyledTextArea = styled(Input.TextArea)<{ $isDark: boolean }>`
  border: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
  resize: none !important;
  outline: none !important;
  font-size: 16px;
  line-height: 1.5;
  padding: 0 !important;
  &:focus {
    box-shadow: none !important;
    border: 0 !important;
    outline: none !important;
  }
  &::placeholder {
    color: ${(props) => (props.$isDark ? "#9ca3af" : "#6b7280")} !important;
  }
  color: ${(props) => (props.$isDark ? "#f3f4f6" : "#1f2937")} !important;
`;

const MessageInput: FC<MessageInputProps> = ({
  value,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  placeholder = "Ask anything",
}) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  return (
    <div className="flex-1 relative">
      <StyledTextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoSize={{ minRows: 1, maxRows: 6 }}
        $isDark={isDark}
      />
    </div>
  );
};

export default MessageInput;
