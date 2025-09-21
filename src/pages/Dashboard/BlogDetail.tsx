import { useState, useEffect, type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  Avatar,
  Button,
  Space,
  Tag,
  Spin,
  Alert,
  theme,
  Row,
  Col,
  Breadcrumb,
} from "antd";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  UserOutlined,
  EyeOutlined,
  ShareAltOutlined,
  BookOutlined,
  LikeOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";
import MessageComposer from "../../components/chat/MessageComposer";
import { mockEnhancedDiscoverApiResponse } from "../../data/enhancedDiscoverApiResponse";
import type { ContentItem } from "../../data/enhancedDiscoverApiResponse";
import { FixedMessageComposerContainer } from "./BlogDetail.styled";

const { Title, Paragraph, Text } = Typography;

const BlogDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { isDark, collapsed } = useLayout();
  const [article, setArticle] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const findArticle = () => {
      setLoading(true);
      setError(null);

      try {
        // Search in featured content
        if (mockEnhancedDiscoverApiResponse.featured.id === id) {
          setArticle(mockEnhancedDiscoverApiResponse.featured);
          return;
        }

        // Search in sections
        const sectionArticle = mockEnhancedDiscoverApiResponse.sections.find(
          (section) => section.content.id === id
        );
        if (sectionArticle) {
          setArticle(sectionArticle.content);
          return;
        }

        // Search in articles
        const articleItem = mockEnhancedDiscoverApiResponse.articles.find(
          (article) => article.content.id === id
        );
        if (articleItem) {
          setArticle(articleItem.content);
          return;
        }

        setError("Article not found");
      } catch (err) {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      findArticle();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/discover");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert
          message="Article Not Found"
          description={error || "The requested article could not be found"}
          type="error"
          showIcon
          action={
            <Button type="primary" onClick={handleBack}>
              Back to Discover
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen theme-transition relative"
      style={{
        backgroundColor: isDark ? "#212121" : "#fff",
        color: isDark ? token.colorText : "#1f2937",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
        {/* Header */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              {
                title: (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                    style={{ color: token.colorTextSecondary }}
                  >
                    <ArrowLeftOutlined />
                    Discover
                  </button>
                ),
              },
              { title: article.category },
            ]}
            className="mb-4"
          />

          <div className="flex items-center justify-between mb-4 mt-5">
            <div className="flex items-center gap-3">
              <Avatar
                size={40}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: isDark ? "#177ddc" : "#1890ff",
                }}
              />
              <div>
                <Text strong className="text-sm">
                  News Reporter
                </Text>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarOutlined />
                    {article.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeOutlined />
                    {article.sourceCount} sources
                  </span>
                </div>
              </div>
            </div>

            <Space>
              <Button
                type="text"
                icon={<BookOutlined />}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Save
              </Button>
              <Button
                type="text"
                icon={<ShareAltOutlined />}
                onClick={handleShare}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Share
              </Button>
            </Space>
          </div>

          <Title
            level={1}
            className={clsx(
              "mb-4 font-bold leading-tight theme-transition",
              isDark ? "text-white" : "text-gray-900"
            )}
          >
            {article.title}
          </Title>

          {article.subtitle && (
            <Paragraph
              className={clsx(
                "text-lg mb-6 theme-transition",
                isDark ? "text-gray-300" : "text-gray-600"
              )}
            >
              {article.subtitle}
            </Paragraph>
          )}

          <div className="flex items-center gap-2 mb-6">
            <Tag color={isDark ? "#177ddc" : "#1890ff"} className="text-xs">
              {article.category}
            </Tag>
            {article.featured && (
              <Tag color="gold" className="text-xs">
                Featured
              </Tag>
            )}
          </div>
        </div>

        {/* Main Image */}
        <Card
          className="mb-8 overflow-hidden"
          style={{
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            borderColor: isDark ? "#404040" : "#e5e7eb",
          }}
          bodyStyle={{ padding: 0 }}
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-96 object-cover"
          />
        </Card>

        {/* Article Content */}
        <Row gutter={[32, 32]} className="mt-8">
          <Col xs={24} lg={16}>
            <div className="space-y-6">
              {/* Article Body */}
              <div
                className="prose prose-lg max-w-none theme-transition"
                style={{
                  color: isDark ? token.colorText : "#374151",
                }}
              >
                <Paragraph
                  className={clsx(
                    "text-lg leading-relaxed mb-6 theme-transition",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  {article.content}
                </Paragraph>

                {/* Extended content for demo purposes */}
                <Paragraph
                  className={clsx(
                    "text-base leading-relaxed mb-6 theme-transition",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  This comprehensive analysis delves deeper into the
                  implications and broader context of the story. The rapid
                  ascent of this content to global prominence reflects changing
                  consumer preferences and the evolving landscape of digital
                  media consumption.
                </Paragraph>

                <Paragraph
                  className={clsx(
                    "text-base leading-relaxed mb-6 theme-transition",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  Industry experts suggest that this trend represents a
                  significant shift in how audiences engage with content,
                  particularly in the streaming and entertainment sectors. The
                  combination of strategic marketing, quality production, and
                  timely release has created a perfect storm for success.
                </Paragraph>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <Space>
                  <Button
                    type="text"
                    icon={<LikeOutlined />}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Like
                  </Button>
                  <Button
                    type="text"
                    icon={<CommentOutlined />}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Comment
                  </Button>
                </Space>

                <Text className="text-sm text-gray-500">
                  {article.sourceCount} sources • {article.publishedAt}
                </Text>
              </div>
            </div>
          </Col>

          {/* Right Sidebar */}
          <Col xs={24} lg={8}>
            <div className="space-y-6">
              {/* Related Articles */}
              <Card
                title="Related Articles"
                className="theme-transition"
                style={{
                  backgroundColor: isDark ? "#2a2a2a" : "#fff",
                  borderColor: isDark ? "#404040" : "#e5e7eb",
                }}
              >
                <div className="space-y-4">
                  {mockEnhancedDiscoverApiResponse.articles
                    .slice(0, 3)
                    .map((relatedArticle) => (
                      <div
                        key={relatedArticle.id}
                        className="flex gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                        onClick={() =>
                          navigate(`/discover/${relatedArticle.content.id}`)
                        }
                      >
                        <img
                          src={relatedArticle.content.imageUrl}
                          alt={relatedArticle.content.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <Text
                            strong
                            className={clsx(
                              "text-sm block mb-1 line-clamp-2 theme-transition",
                              isDark ? "text-white" : "text-gray-900"
                            )}
                          >
                            {relatedArticle.content.title}
                          </Text>
                          <Text
                            className={clsx(
                              "text-xs theme-transition",
                              isDark ? "text-gray-400" : "text-gray-500"
                            )}
                          >
                            {relatedArticle.content.publishedAt}
                          </Text>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
              <br />
              {/* Tags */}
              <Card
                title="Tags"
                className="theme-transition"
                style={{
                  backgroundColor: isDark ? "#2a2a2a" : "#fff",
                  borderColor: isDark ? "#404040" : "#e5e7eb",
                }}
              >
                <div className="flex flex-wrap gap-2">
                  {[article.category, "News", "Analysis", "Trending"].map(
                    (tag) => (
                      <Tag
                        key={tag}
                        color={isDark ? "#177ddc" : "#1890ff"}
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        {tag}
                      </Tag>
                    )
                  )}
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
      <FixedMessageComposerContainer $isDark={isDark} $collapsed={collapsed}>
        <div className="max-w-4xl mx-auto">
          <div className="w-full">
            <MessageComposer
              placeholder="Ask anything about this article..."
              variant="fixed"
            />
          </div>
        </div>
      </FixedMessageComposerContainer>
    </div>
  );
};

export default BlogDetail;
