import { UserRole } from "./common";

export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  displayName: string;
  userRole: UserRole;
};
