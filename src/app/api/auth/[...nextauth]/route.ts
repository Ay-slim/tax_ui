import { login } from "@/data/api_calls";
import { Account, AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {email: string, password: string};

        try {
          const {user} = await login({email, password});
          return user
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt ({ token, user }: {token: JWT, 
      user: User}): Promise<JWT>{
      // When a user logs in, add _id to the token
      if (user) {
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }: {session: Session, token: JWT}) {
      // Include _id in the session object
      if (token) {
        session.user._id = token._id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };