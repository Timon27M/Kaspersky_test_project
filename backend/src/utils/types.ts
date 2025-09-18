export type TAddUserBody = {
  name: string;
  email: string;
  surname: string;
  login: string;
  group?: "management" | "accounting" | "human resources department"; // если group необязательный
};

export type TUpdateUserBody = {
  name: string;
  surname: string;
  email: string;
  login: string;
  group?: "management" | "accounting" | "human resources department"; // если group необязательный
};

export type TUserParams = {
  userId: string
}

export type TDefaultError = {
  message: string;
}