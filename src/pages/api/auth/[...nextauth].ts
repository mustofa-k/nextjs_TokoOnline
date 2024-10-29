import { loginwithGoogle, SigIn } from "@/services/auth/services";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Definisikan tipe untuk user
interface GoogleUser {
  email: string;
  fullName: string;
  role?: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your Email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const user: any = await SigIn(email);

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email; // Perbaiki dari 'enail' ke 'email'
        token.fullName = user.fullName;
        token.phone = user.phone;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          type: "google",
        };

        const googleUser = await new Promise<GoogleUser>((resolve) => {
          loginwithGoogle(data, (result: any) => {
            resolve(result);
          });
        });

        token.email = googleUser.email;
        token.fullName = googleUser.fullName;
        token.role = googleUser.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullName" in token) {
        session.user.fullName = token.fullName;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
