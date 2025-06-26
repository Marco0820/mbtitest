import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import { Adapter } from "next-auth/adapters";
import { HttpsProxyAgent } from "https-proxy-agent";

let agent;
if (process.env.HTTP_PROXY) {
  console.log(`[AUTH] Using proxy for NextAuth: ${process.env.HTTP_PROXY}`);
  agent = new HttpsProxyAgent(process.env.HTTP_PROXY);
} else {
  console.log("[AUTH] No proxy configured for NextAuth. Direct connection will be used.");
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // wellKnown: "http://accounts.google.com/.well-known/openid-configuration",
      httpOptions: {
        agent,
        timeout: 10000,
      }
    }),
    // FacebookProvider({
    //     clientId: process.env.FACEBOOK_CLIENT_ID as string,
    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    // })
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("---AUTH SIGNIN CALLBACK---");
      console.log("User:", JSON.stringify(user, null, 2));
      console.log("Account:", JSON.stringify(account, null, 2));
      console.log("Profile:", JSON.stringify(profile, null, 2));
      console.log("--------------------------");
      return true;
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 