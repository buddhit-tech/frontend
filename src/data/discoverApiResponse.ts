export type DiscoverApiResponse = {
  featured: {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    publishedAt: string;
    sourceCount: number;
    category: string;
    featured: boolean;
  };
  articles: Array<{
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    publishedAt: string;
    sourceCount: number;
    category: string;
    featured?: boolean;
  }>;
  widgets: {
    interests: {
      title: string;
      description: string;
      categories: Array<{
        id: string;
        name: string;
        selected: boolean;
      }>;
    };
    weather: {
      title: string;
      location: string;
      temperature: string;
      condition: string;
      high: string;
      low: string;
      forecast: Array<{
        day: string;
        icon: string;
        temp: string;
      }>;
    };
    market: {
      title: string;
      data: Array<{
        name: string;
        value: string;
        change: string;
        changeType: "positive" | "negative";
      }>;
    };
    trendingCompanies: {
      title: string;
      companies: Array<{
        name: string;
        ticker: string;
        price: string;
        change: string;
        changeType: "positive" | "negative";
      }>;
    };
  };
  layout: {
    tabs: Array<{
      key: string;
      label: string;
      hasDropdown?: boolean;
    }>;
    gridConfig: {
      featured: {
        size: "large";
      };
      articles: {
        grid1: {
          count: 3;
          size: "medium";
          columns: {
            xs: 24;
            sm: 12;
            lg: 8;
          };
        };
        grid2: {
          count: 3;
          size: "medium";
          columns: {
            xs: 24;
            sm: 12;
            lg: 12;
          };
        };
      };
    };
  };
};

export const mockDiscoverApiResponse: DiscoverApiResponse = {
  featured: {
    id: "1",
    title: "Netflix's 'Black Rabbit' climbs to No. 2 globally",
    description:
      "The crime thriller series has gained massive popularity worldwide, featuring intense plotlines and stellar performances.",
    imageUrl:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=200&fit=crop",
    publishedAt: "12 hours ago",
    sourceCount: 47,
    category: "Entertainment",
    featured: true,
  },
  articles: [
    {
      id: "2",
      title:
        "Zuckerberg says he'd rather 'misspend' billions than lose AI race",
      imageUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      publishedAt: "2 hours ago",
      sourceCount: 50,
      category: "Technology",
    },
    {
      id: "3",
      title: "TCS gets 5,505 H-1B visas as Trump imposes $100,000 fee",
      imageUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
      publishedAt: "4 hours ago",
      sourceCount: 46,
      category: "Business",
    },
    {
      id: "4",
      title:
        "India urges Saudi Arabia to consider 'sensitivities' over Pakistan defense pact",
      imageUrl:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=200&fit=crop",
      publishedAt: "6 hours ago",
      sourceCount: 33,
      category: "Politics",
    },
    {
      id: "5",
      title: "AI models can deliberately deceive humans, new research reveals",
      description:
        "OpenAI's o3 model demonstrates concerning capabilities for intentional deception in AI systems.",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
      publishedAt: "Sep 19, 2025",
      sourceCount: 30,
      category: "Technology",
    },
    {
      id: "6",
      title: "Trump launches $1M 'Gold Card' visas, hikes H-1B fees to $100K",
      description:
        "New immigration reforms introduce premium visa options and significant fee increases for work visas.",
      imageUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      publishedAt: "Sep 20, 2025",
      sourceCount: 42,
      category: "Politics",
    },
    {
      id: "7",
      title: "3,000-year-old Egyptian bracelet stolen, melted for scrap",
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
      publishedAt: "1 day ago",
      sourceCount: 41,
      category: "Culture",
    },
    {
      id: "8",
      title: "Bank of Japan announces plans to sell massive ETF holdings",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      publishedAt: "8 hours ago",
      sourceCount: 35,
      category: "Finance",
    },
    {
      id: "9",
      title: "Porsche pulls back from EV strategy, hitting VW with $6B loss",
      imageUrl:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=200&fit=crop",
      publishedAt: "5 hours ago",
      sourceCount: 45,
      category: "Business",
    },
  ],
  widgets: {
    interests: {
      title: "Make it yours",
      description:
        "Select topics and interests to customize your Discover experience.",
      categories: [
        { id: "tech", name: "Tech & Science", selected: true },
        { id: "finance", name: "Finance", selected: false },
        { id: "arts", name: "Arts & Culture", selected: false },
        { id: "sports", name: "Sports", selected: true },
        { id: "entertainment", name: "Entertainment", selected: true },
      ],
    },
    weather: {
      title: "Weather",
      location: "Mumbai",
      temperature: "31°",
      condition: "Mostly sunny",
      high: "33°",
      low: "26°",
      forecast: [
        { day: "Sun", icon: "☀️", temp: "32°" },
        { day: "Mon", icon: "⛅", temp: "29°" },
        { day: "Tue", icon: "☀️", temp: "31°" },
        { day: "Wed", icon: "🌤️", temp: "30°" },
        { day: "Thu", icon: "⛅", temp: "28°" },
      ],
    },
    market: {
      title: "Market Outlook",
      data: [
        {
          name: "S&P 500",
          value: "6,722.5",
          change: "+0.43%",
          changeType: "positive",
        },
        {
          name: "NASDAQ",
          value: "24,866.25",
          change: "+0.65%",
          changeType: "positive",
        },
        {
          name: "Bitcoin",
          value: "$115,800.15",
          change: "+0.06%",
          changeType: "positive",
        },
        {
          name: "VIX",
          value: "15.45",
          change: "-1.59%",
          changeType: "negative",
        },
      ],
    },
    trendingCompanies: {
      title: "Trending Companies",
      companies: [
        {
          name: "Amazon.com, Inc.",
          ticker: "AMZN",
          price: "$231.48",
          change: "+0.11%",
          changeType: "positive",
        },
        {
          name: "Microsoft Corporation",
          ticker: "MSFT",
          price: "$517.93",
          change: "+1.86%",
          changeType: "positive",
        },
        {
          name: "Alphabet Inc.",
          ticker: "GOOG",
          price: "$255.24",
          change: "+1.15%",
          changeType: "positive",
        },
        {
          name: "The Goldman Sachs Group, Inc.",
          ticker: "GS",
          price: "$805.00",
          change: "+0.09%",
          changeType: "positive",
        },
        {
          name: "Infosys Limited",
          ticker: "INFY",
          price: "$1,540.2",
          change: "-0.03%",
          changeType: "negative",
        },
      ],
    },
  },
  layout: {
    tabs: [
      { key: "for-you", label: "For You" },
      { key: "top", label: "Top" },
      { key: "topics", label: "Topics", hasDropdown: true },
    ],
    gridConfig: {
      featured: {
        size: "large",
      },
      articles: {
        grid1: {
          count: 3,
          size: "medium",
          columns: {
            xs: 24,
            sm: 12,
            lg: 8,
          },
        },
        grid2: {
          count: 3,
          size: "medium",
          columns: {
            xs: 24,
            sm: 12,
            lg: 12,
          },
        },
      },
    },
  },
};
