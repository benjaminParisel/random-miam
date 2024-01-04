import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      // // @ts-ignore
      // jwt: ({ token, user }) => ({
      //   ...token,
      //   user,
      // }),
      //@ts-ignore
      async authorize(credentials, req) {
        //@ts-ignore
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email !== 'alex@email.com' && password !== 'qqqqq') {
          throw new Error('invalid credentials');
        }
        // confirmed users
        return { id: 1, name: 'Alex', email: 'alex@email.com' };
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    jwt: ({ token, account, user }) => ({
      // @ts-ignore
      if(account) {
        token.acessToken = account.accessToken;
        token.id = user.id;
      },
    }),
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
});
