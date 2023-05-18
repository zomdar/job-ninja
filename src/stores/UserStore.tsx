// src/stores/UserStore.tsx

import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class UserStore {
    user = null;
    loading = false;
    error: Error | null = null;
    savedItems: any[] = [];  // Add this to store the saved items

    auth0Id = '';
    name = '';
    email = '';
    resumeRequests = 0;
    lastRequestDate: Date | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    fetchUser = async (auth0Id: string) => {
        if (!auth0Id) return;
        if (this.user && this.auth0Id === auth0Id) return;  // Don't fetch if user is already fetched

        this.loading = true;
        this.error = null;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${auth0Id}`);
            const user = response.data;
            this.auth0Id = user.auth0Id;
            this.name = user.name;
            this.email = user.email;
            this.resumeRequests = user.resumeRequests;
            this.lastRequestDate = new Date(user.lastRequestDate);
            this.user = user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.error = error;
            }
        } finally {
            this.loading = false;
        }
    };

}

export default UserStore;
