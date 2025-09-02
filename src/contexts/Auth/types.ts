export enum AccessType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string | null;
  accessType: AccessType;
};

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  logoutUser: () => void;
  authenticateUser: () => void;
};
