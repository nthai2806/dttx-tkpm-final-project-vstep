export type AuthState =
  | "UnAuthenticated"
  | "Authenticated"
  | "SigningIn"
  | "SigningUp"
  | "CheckingToken"
  | "GettingAuthInfo";

export type UserRole = "Student" | "Teacher" | "Admin";

export type ExamState = "NotBegin" | "Began" | "Finished";
