import type { TUser, TUserWithoutId } from "../../../assets/types";
import { AxiosService } from "../AxiosService";

class UserService {
  async GetUsers(): Promise<TUser[] | undefined> {
    try {
      const response = await AxiosService.get<TUser[]>("users").then(
        (res) => res.data
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async GetUser(id: string): Promise<TUser | undefined> {
    try {
      const response = await AxiosService.get<TUser>(`user/${id}`).then(
        (res) => res.data
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async UpdateUser(userData: TUser): Promise<TUser | undefined> {
    const body = {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      login: userData.login,
      group: userData.group
    }

    try {
      const response = await AxiosService.patch<TUser>(`user/${userData._id}`, JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.data);

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteUser(id:string): Promise<TUser | undefined> {
    try {
      const response = await AxiosService.delete<TUser>(`user/${id}`, ).then((res) => res.data);

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async CreateUser(userData: TUserWithoutId): Promise<TUser | undefined> {
    try {
      const response = await AxiosService.post<TUser>("user", userData).then((res) => res.data);

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserService();
