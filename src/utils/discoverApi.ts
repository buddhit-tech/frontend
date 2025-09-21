import type { EnhancedDiscoverApiResponse } from "../data/enhancedDiscoverApiResponse";

/**
 * Fetches discover page data from the API
 * @param endpoint - API endpoint URL
 * @returns Promise<DiscoverApiResponse>
 */
export const fetchDiscoverData = async (
  endpoint: string = "/api/discover"
): Promise<EnhancedDiscoverApiResponse> => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate the response structure
    if (!validateDiscoverApiResponse(data)) {
      throw new Error("Invalid API response structure");
    }

    return data as EnhancedDiscoverApiResponse;
  } catch (error) {
    console.error("Error fetching discover data:", error);
    throw error;
  }
};

/**
 * Validates the API response structure
 * @param data - Response data to validate
 * @returns boolean
 */
const validateDiscoverApiResponse = (data: any): boolean => {
  return (
    data &&
    typeof data === "object" &&
    data.featured &&
    Array.isArray(data.articles) &&
    data.widgets &&
    data.layout &&
    data.widgets.interests &&
    data.widgets.weather &&
    data.widgets.market &&
    data.widgets.trendingCompanies
  );
};

/**
 * Updates user interests
 * @param interests - Array of selected interest IDs
 * @param endpoint - API endpoint URL
 */
export const updateUserInterests = async (
  interests: string[],
  endpoint: string = "/api/user/interests"
): Promise<void> => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ interests }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating user interests:", error);
    throw error;
  }
};

/**
 * Fetches personalized content based on user interests
 * @param interests - Array of user interest IDs
 * @param endpoint - API endpoint URL
 * @returns Promise<DiscoverApiResponse>
 */
export const fetchPersonalizedContent = async (
  interests: string[],
  endpoint: string = "/api/discover/personalized"
): Promise<EnhancedDiscoverApiResponse> => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ interests }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!validateDiscoverApiResponse(data)) {
      throw new Error("Invalid API response structure");
    }

    return data as EnhancedDiscoverApiResponse;
  } catch (error) {
    console.error("Error fetching personalized content:", error);
    throw error;
  }
};
