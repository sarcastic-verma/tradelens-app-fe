import axios from "axios";

export class UserRepository {
  static doSocialAuth(token: string) {
    return axios.post(
      "/api/auth/social",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
