import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  fetchDiscoverData,
  updateUserInterests,
  fetchPersonalizedContent,
} from "../utils/discoverApi";
// import type { EnhancedDiscoverApiResponse } from "../data/enhancedDiscoverApiResponse";

// Query keys
export const discoverKeys = {
  all: ["discover"] as const,
  lists: () => [...discoverKeys.all, "list"] as const,
  list: (filters: string) => [...discoverKeys.lists(), { filters }] as const,
  personalized: (interests: string[]) =>
    [...discoverKeys.all, "personalized", interests] as const,
};

// Fetch discover data query
export const useDiscoverData = (endpoint?: string) => {
  return useQuery({
    queryKey: discoverKeys.lists(),
    queryFn: () => fetchDiscoverData(endpoint),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Fetch personalized content query
export const usePersonalizedContent = (interests: string[], enabled = true) => {
  return useQuery({
    queryKey: discoverKeys.personalized(interests),
    queryFn: () => fetchPersonalizedContent(interests),
    enabled: enabled && interests.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Update user interests mutation
export const useUpdateInterests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interests: string[]) => updateUserInterests(interests),
    onSuccess: (_data, variables) => {
      message.success("Interests updated successfully!");

      // Invalidate and refetch personalized content
      queryClient.invalidateQueries({
        queryKey: discoverKeys.personalized(variables),
      });

      // Optionally invalidate all discover queries
      queryClient.invalidateQueries({
        queryKey: discoverKeys.all,
      });
    },
    onError: (error) => {
      console.error("Error updating interests:", error);
      message.error("Failed to update interests");
    },
  });
};

// Prefetch discover data
export const usePrefetchDiscoverData = () => {
  const queryClient = useQueryClient();

  return (endpoint?: string) => {
    queryClient.prefetchQuery({
      queryKey: discoverKeys.lists(),
      queryFn: () => fetchDiscoverData(endpoint),
      staleTime: 5 * 60 * 1000,
    });
  };
};
