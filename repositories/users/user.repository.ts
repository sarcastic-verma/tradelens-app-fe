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
    return axiosInstance.post<{ user: BackendUser; exists: boolean }>(
      "/api/users/social",
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }
}
