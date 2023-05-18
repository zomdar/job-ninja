import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface User {
  auth0Id: string;
  name: string;
  email: string;
  resumeRequests: number;
  lastRequestDate: string;
  // Add other properties as needed
}

class UserStore {
  user: User | null = null;
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUser = async (auth0Id: string) => {
    if (!auth0Id) return;
    if (this.user && this.user.auth0Id === auth0Id) return;  // Don't fetch if user is already fetched

    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${auth0Id}`);
      this.user = response.data;
    } catch (error: any) {
      if (error instanceof Error) {
        this.error = error;
      }
    } finally {
      this.loading = false;
    }
  };

  async incrementResumeCount(auth0Id: string) {
    if (!auth0Id) return;
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${encodeURIComponent(auth0Id)}/increment`);
    if (response.status === 200) {
      this.fetchUser(auth0Id);
    } else {
      throw new Error("Could not increment resume count");
    }
  }

}

export default UserStore;
