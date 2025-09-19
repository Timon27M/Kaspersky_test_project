export type TGroup =
  | "management"
  | "accounting"
  | "development"
  | "analytics"
  | "tester";

export type TUserBody = {
  name: string;
  email: string;
  surname: string;
  login: string;
  group?: TGroup; 
  image?: Buffer;
};

export type TUserParams = {
  userId: string;
};

export type TDefaultError = {
  message: string;
};

export type TGetUserParams = {
  userId: string;
};
