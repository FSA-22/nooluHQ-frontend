import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    idToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    idToken?: string;
    user?: {
      id?: string;
      email?: string;
      name?: string | null;
      role?: string | null;
      onboardingStep?: string;
      picture?: string | null;
      country?: string;
    };
  }

  interface User {
    id?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    user?: any;
  }
}
