import NextAuth, { DefaultSession, User } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      mbti?: string | null;
      gender?: string | null;
      country?: string | null;
      state?: string | null;
      city?: string | null;
      bio?: string | null;
    } & DefaultSession["user"]
  }

  interface User {
    mbti?: string | null;
    gender?: string | null;
    country?: string | null;
    state?: string | null;
    city?: string | null;
    bio?: string | null;
  }
} 