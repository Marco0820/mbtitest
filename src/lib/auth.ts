import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/db';

async function verifyTurnstile(token: string) {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("CLOUDFLARE_TURNSTILE_SECRET_KEY is not set.");
    return false;
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });

  const data = await response.json();
  return data.success;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 20000,
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        token: { label: 'Turnstile Token', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials.token) {
          throw new Error('Missing credentials or token.');
        }

        /*
        const isHuman = await verifyTurnstile(credentials.token);
        if (!isHuman) {
          throw new Error('Human verification failed.');
        }
        */

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        try {
          const userExists = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (!userExists) {
            await prisma.user.create({
              data: {
                email: profile.email,
                name: profile.name,
                image: (profile as any).picture,
              },
            });
          }
        } catch (error) {
          console.error("Failed to create user during Google sign-in:", error);
          // Prevent sign-in if database operation fails
          return false;
        }
      }
      return true; // Allow sign-in
    },
    async jwt({ token, user, trigger, session }) {
      // The user object is only available on the first sign-in.
      // We use it to find our user in the database and get their ID.
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        
        if (dbUser) {
          // Persist the user's ID and other details to the token
          token.id = dbUser.id;
          token.mbti = dbUser.mbti;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.picture = dbUser.image;
          token.gender = dbUser.gender;
          token.country = dbUser.country;
          token.state = dbUser.state;
          token.city = dbUser.city;
          token.bio = dbUser.bio;
        }
      }

      // This is for session updates, e.g., when a user updates their profile
      if (trigger === "update" && session) {
        token = { ...token, ...session.user };
        if (session.user?.image) {
          token.picture = session.user.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.name = dbUser.name;
          session.user.email = dbUser.email;
          session.user.image = dbUser.image;
          session.user.mbti = dbUser.mbti;
          session.user.gender = dbUser.gender;
          session.user.country = dbUser.country;
          session.user.state = dbUser.state;
          session.user.city = dbUser.city;
          session.user.bio = dbUser.bio;
        } else {
          // User not found in DB, invalidate session
          return null as any; 
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 