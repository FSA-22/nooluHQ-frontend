import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Google OAuth client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google secret
    }),
  ],

  session: {
    strategy: 'jwt', // store everything in JWT (no DB)
  },

  callbacks: {
    /**
     *  Runs on:
     * - initial login
     * - every session check
     */
    async jwt({ token, account }) {
      // Only run backend call on FIRST login
      if (account?.id_token) {
        try {
          // Call your backend with Google ID token
          const { data } = await axios.post(
            `${process.env.BACKEND_URL}/api/auths/google-login`,
            {
              idToken: account.id_token,
            },
          );

          /**
           * Store backend tokens inside JWT
           * This is your "single source of truth"
           */
          token.accessToken = data.accessToken;
          token.refreshToken = data.refreshToken;

          // Optional: store user info
          token.user = data.user;
        } catch (error: any) {
          console.error(
            '❌ Backend Google login failed:',
            error?.response?.data || error,
          );

          // Prevent login if backend fails
          throw new Error('Backend authentication failed');
        }
      }

      return token;
    },

    /**
     * Expose data to client session
     */
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;

      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
