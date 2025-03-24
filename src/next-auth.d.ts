import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; // Add the role property to the User type
  }

  interface Session {
    user: User & { role?: string }; // Add the role property to the Session
  }
}