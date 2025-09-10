import type { FC } from "react";
import { Typography, Row, Col } from "antd";
import PromptCard from "./PromptCard";
import useLayout from "../../hooks/useLayout";
import { type PromptData } from "./PromptCard";
import clsx from "clsx";

const { Title } = Typography;

interface SuggestedPromptsProps {
  prompts: PromptData[];
  title?: string;
  onPromptClick?: (description: string) => void;
}

const SuggestedPrompts: FC<SuggestedPromptsProps> = ({
  prompts,
  onPromptClick,
  title = "Suggested for you",
}) => {
  const { textColor } = useLayout();

  return (
    <div className="mb-8">
      <Title level={4} className="!mb-4 text-center">
        <span className={clsx(textColor)}>{title}</span>
      </Title>
      <Row gutter={[16, 16]}>
        {prompts.map((prompt, index) => (
          <Col xs={24} sm={12} key={index}>
            <PromptCard prompt={prompt} onClick={onPromptClick} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SuggestedPrompts;
