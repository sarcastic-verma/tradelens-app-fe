import axios from "axios";
import { BackendUser } from "../../types";
import { UpdateUserDto } from "../../types/users";
import { axiosInstance } from "../../utils/axios-instance";

export class UserRepository {
  static getMe() {
    return axiosInstance.get<BackendUser>("/api/users/me");
  }

  static updateMe(data: UpdateUserDto) {
    return axiosInstance.patch<BackendUser>("/api/users/me", data);
  }

  static doSocialAuth(token: string) {
    return axios.post(
      "/api/users/social",
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }
}
