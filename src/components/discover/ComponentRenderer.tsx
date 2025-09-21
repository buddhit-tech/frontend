import type { FC } from "react";
import ArticleCard from "./ArticleCard";
import Section from "./Section";
import EnhancedCard from "./EnhancedCard";
import InterestWidget from "./InterestWidget";
import WeatherWidget from "./WeatherWidget";
import MarketWidget from "./MarketWidget";
import TrendingCompaniesWidget from "./TrendingCompaniesWidget";
import type { ComponentConfig } from "./types";

interface ComponentRendererProps {
  config: ComponentConfig;
  theme: "light" | "dark";
  data?: any;
  onCategoryToggle?: (categoryId: string) => void;
  onSave?: () => void;
  onClose?: () => void;
}

const ComponentRenderer: FC<ComponentRendererProps> = ({
  config,
  theme,
  data,
  onCategoryToggle,
  onSave,
  onClose,
}) => {
  const { type, props = {} } = config;

  switch (type) {
    case "ArticleCard":
      return <ArticleCard article={data} theme={theme} {...props} />;

    case "Section":
      return (
        <Section
          content={data.content}
          layout={data.layout}
          theme={theme}
          {...props}
        />
      );

    case "EnhancedCard":
      return (
        <EnhancedCard
          content={data.content}
          layout={data.layout}
          theme={theme}
          {...props}
        />
      );

    case "InterestWidget":
      return (
        <InterestWidget
          title={props.title || "Make it yours"}
          theme={theme}
          categories={data}
          onCategoryToggle={onCategoryToggle}
          onSave={onSave}
          onClose={onClose}
          {...props}
        />
      );

    case "WeatherWidget":
      return (
        <WeatherWidget
          title={props.title || "Weather"}
          theme={theme}
          weatherData={data}
          {...props}
        />
      );

    case "MarketWidget":
      return (
        <MarketWidget
          title={props.title || "Market Outlook"}
          theme={theme}
          marketData={data}
          {...props}
        />
      );

    case "TrendingCompaniesWidget":
      return (
        <TrendingCompaniesWidget
          title={props.title || "Trending Companies"}
          theme={theme}
          companies={data}
          {...props}
        />
      );

    default:
      return (
        <div className="p-4 text-center text-gray-500">
          Unknown component type: {type}
        </div>
      );
  }
};

export default ComponentRenderer;
