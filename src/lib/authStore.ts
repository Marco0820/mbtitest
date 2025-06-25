import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { users, User } from './dummyUsers';

interface AuthState {
  user: User | null;
  login: (email: string, password?: string) => Promise<User | null>;
  logout: () => void;
  signup: (userData: Omit<User, 'id'>) => Promise<User | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: async (email, password) => {
        // In a real app, you'd verify password. Here we just find the user by email.
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (foundUser) {
          console.log("User found, logging in:", foundUser.name);
          set({ user: foundUser });
          return foundUser;
        }
        console.log("Login failed: User not found");
        return null;
      },
      logout: () => {
        console.log("Logging out");
        set({ user: null });
      },
      signup: async (userData) => {
        const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (existingUser) {
          console.log("Signup failed: Email already in use");
          return null;
        }
        
        const newUser: User = {
          id: users.length + 1,
          ...userData,
        };
        
        users.push(newUser);
        set({ user: newUser });
        console.log("New user signed up and logged in:", newUser.name);
        return newUser;
      },
    }),
    {
      name: 'auth-storage', // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
); 