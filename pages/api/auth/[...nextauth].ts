import { supabase } from "@/lib/supabaseClient";
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
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
            // Determinar el proveedor y obtener el ID del proveedor
      const provider = account?.provider ?? '';
      const provider_id = profile?.sub ?? '';
      const access_token = account?.access_token ?? null;
      const refresh_token = account?.refresh_token ?? null;
      // save or update user on Supabase
      const { error } = await supabase
        .from('users')
        .upsert({
          email: user.email,
          name: user.name,
          provider,
          provider_id,
          access_token,
          refresh_token,
        }, { onConflict: 'email' });
        
      if (error) {
        console.error('Error al guardar el usuario en Supabase:', error);
        return false;
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);