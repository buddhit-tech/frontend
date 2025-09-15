import mitt from "mitt";

// Define event types
type Events = {
  teacherAction: {
    action: string;
    data?: any;
  };
  // Add more event types as needed
};

// Create and export the event bus instance
export const eventBus = mitt<Events>();
