import { BackendUser } from "../../types";
import { PaginationDto } from "../../types/common";
import { axiosInstance } from "../../utils/axios-instance";

export class AdminRepository {
  static getAllUsers(pagination?: PaginationDto) {
    return axiosInstance.get<BackendUser[]>("/api/admin/users", {
      params: pagination,
    });
  }
}
