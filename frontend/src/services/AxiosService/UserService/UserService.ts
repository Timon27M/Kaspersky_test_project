import type { TUser } from "../../../assets/types";
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
}

export default new UserService();
