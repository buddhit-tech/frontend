# Discover Page API Integration

## Overview

The Discover page now uses a unified API response structure that dynamically renders the entire layout. This approach allows for:

- **Single API Call**: One endpoint provides all necessary data
- **Dynamic Layout**: Layout configuration is part of the API response
- **Flexible Content**: Easy to add/remove widgets and articles
- **Type Safety**: Full TypeScript support for the API response

## API Response Structure

### Main Response Type: `DiscoverApiResponse`

```typescript
interface DiscoverApiResponse {
  featured: Article;
  articles: Article[];
  widgets: {
    interests: InterestWidget;
    weather: WeatherWidget;
    market: MarketWidget;
    trendingCompanies: TrendingCompaniesWidget;
  };
  layout: {
    tabs: TabConfig[];
    gridConfig: GridConfiguration;
  };
}
```

## API Endpoints

### 1. Get Discover Data

```
GET /api/discover
```

**Response**: `DiscoverApiResponse`

### 2. Update User Interests

```
POST /api/user/interests
```

**Request Body**:

```json
{
  "interests": ["tech", "sports", "entertainment"]
}
```

### 3. Get Personalized Content

```
POST /api/discover/personalized
```

**Request Body**:

```json
{
  "interests": ["tech", "sports", "entertainment"]
}
```

**Response**: `DiscoverApiResponse` (filtered based on interests)

## Layout Configuration

The `layout` object in the API response controls how content is displayed:

### Tabs Configuration

```typescript
layout: {
  tabs: [
    { key: "for-you", label: "For You" },
    { key: "top", label: "Top" },
    { key: "topics", label: "Topics", hasDropdown: true },
  ];
}
```

### Grid Configuration

```typescript
layout: {
  gridConfig: {
    featured: { size: "large" },
    articles: {
      grid1: {
        count: 3,
        size: "medium",
        columns: { xs: 24, sm: 12, lg: 8 }
      },
      grid2: {
        count: 3,
        size: "medium",
        columns: { xs: 24, sm: 12, lg: 12 }
      }
    }
  }
}
```

## Component Architecture

### DynamicLayout Component

- Renders the entire page based on API response
- Handles state management for interactive widgets
- Manages layout configuration dynamically

### ComponentRenderer

- Renders individual components based on type
- Supports: ArticleCard, InterestWidget, WeatherWidget, MarketWidget, TrendingCompaniesWidget
- Fully theme-aware and responsive

## Usage Example

```typescript
// In your API service
const discoverData = await fetchDiscoverData("/api/discover");

// The response automatically configures:
// - Featured article placement
// - Article grid layout
// - Widget positioning
// - Tab configuration
// - Responsive breakpoints
```

## Benefits

1. **Single Source of Truth**: All layout and content data from one API call
2. **Dynamic Configuration**: Layout can be changed without code deployment
3. **A/B Testing**: Easy to test different layouts via API configuration
4. **Personalization**: Content and layout can be personalized per user
5. **Maintainability**: Centralized layout logic
6. **Performance**: Reduced API calls and optimized rendering

## Migration from Multiple APIs

If you're migrating from multiple API calls:

1. **Before**: Separate calls for articles, weather, market data, etc.
2. **After**: Single `/api/discover` call returns everything
3. **Fallback**: System gracefully falls back to mock data if API fails
4. **Caching**: Can implement caching at the single API level

## Error Handling

The system includes comprehensive error handling:

- Loading states with spinners
- Error messages for API failures
- Fallback to mock data
- Validation of API response structure
