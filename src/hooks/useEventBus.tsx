import { useEffect } from "react";
import { eventBus } from "../utils/eventBus";

type EventCallback<T = any> = (data: T) => void;

/**
 * Custom hook for subscribing to events from the event bus
 * @param eventName - The name of the event to listen for
 * @param callback - The callback function to execute when the event is emitted
 * @param deps - Optional dependency array for the callback (similar to useEffect)
 */
export const useEventBus = <T = any,>(
  eventName: string,
  callback: EventCallback<T>,
  deps?: React.DependencyList
) => {
  useEffect(() => {
    // Subscribe to the event
    eventBus.on(eventName as any, callback);

    // Cleanup: unsubscribe when component unmounts or dependencies change
    return () => {
      eventBus.off(eventName as any, callback);
    };
  }, deps || []);
};

export default useEventBus;
