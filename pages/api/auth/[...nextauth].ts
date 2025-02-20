// pages/api/auth/[...nextauth].js

import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization:{
        params:{
          scope:"openid email profile",
          prompt:"consent",
          access_type:'offline',
          response_type:'code'
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Usamos JWT para la sesión (puedes optar por la sesión basada en base de datos)
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Si se recibe información de la cuenta, la agregamos al token
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Agregamos datos del token a la sesión para tenerlos en el cliente
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);