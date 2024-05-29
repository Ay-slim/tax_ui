import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
  }

  interface Session {
    user: {
      _id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
  }
}