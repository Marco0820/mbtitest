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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const customUser = user as User;
        token.id = customUser.id;
        token.mbti = customUser.mbti;
        token.name = customUser.name;
        token.email = customUser.email;
        token.picture = customUser.image;
        token.gender = customUser.gender;
        token.country = customUser.country;
        token.state = customUser.state;
        token.city = customUser.city;
        token.bio = customUser.bio;
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session.user };
        if (session.user?.image) {
          token.picture = session.user.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.mbti = token.mbti;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.gender = token.gender;
        session.user.country = token.country;
        session.user.state = token.state;
        session.user.city = token.city;
        session.user.bio = token.bio;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 