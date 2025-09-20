export type TUserGroup =
  | "management"
  | "accounting"
  | "development"
  | "analytics"
  | "tester"
  | "unknown"
  | "all";

export type TUser = {
  name: string;
  email: string;
  surname: string;
  login: string;
  group: TUserGroup;
  _id: string;
};
