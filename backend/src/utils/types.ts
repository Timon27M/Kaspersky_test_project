export type TGroup =
  | "management"
  | "accounting"
  | "development"
  | "analytics"
  | "tester";

export type TAddUserBody = {
  name: string;
  email: string;
  surname: string;
  login: string;
  group?: TGroup; 
};

export type TUpdateUserBody = {
  name: string;
  surname: string;
  email: string;
  login: string;
  group?: TGroup; 
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
