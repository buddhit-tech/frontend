export type ComponentConfig = {
  type: string;
  props?: Record<string, any>;
  children?: ComponentConfig[];
};

export type ArticleCardProps = {
  article: {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    publishedAt: string;
    sourceCount: number;
    category: string;
    featured?: boolean;
  };
  theme: "light" | "dark";
  size?: "small" | "medium" | "large";
};

export type WidgetProps = {
  title: string;
  theme: "light" | "dark";
  className?: string;
};

export type WeatherWidgetProps = WidgetProps & {
  weatherData: {
    location: string;
    temperature: string;
    condition: string;
    high: string;
    low: string;
    forecast: {
      day: string;
      icon: string;
      temp: string;
    }[];
  };
};

export type MarketWidgetProps = WidgetProps & {
  marketData: Array<{
    name: string;
    value: string;
    change: string;
    changeType: "positive" | "negative";
  }>;
};

export type TrendingCompaniesWidgetProps = WidgetProps & {
  companies: Array<{
    name: string;
    ticker: string;
    price: string;
    change: string;
    changeType: "positive" | "negative";
  }>;
};

export type InterestWidgetProps = WidgetProps & {
  categories: Array<{
    id: string;
    name: string;
    selected?: boolean;
  }>;
  onCategoryToggle?: (categoryId: string) => void;
  onSave?: () => void;
  onClose?: () => void;
};

// New enhanced types for multiple layouts
export type ContentItem = {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl: string;
  publishedAt: string;
  sourceCount: number;
  category: string;
  featured?: boolean;
};

export type SectionLayout =
  | "left-image-right-content"
  | "top-image-bottom-content";
export type CardLayout =
  | "left-image-right-content"
  | "top-image-bottom-content";

export type SectionProps = {
  content: ContentItem;
  layout: SectionLayout;
  theme: "light" | "dark";
  className?: string;
};

export type EnhancedCardProps = {
  content: ContentItem;
  layout: CardLayout;
  theme: "light" | "dark";
  className?: string;
};
