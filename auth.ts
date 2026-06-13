import { findUserByCredentials } from "@/app/(auth)/login/_actions/findUserByCredentials"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  
  providers: [
    Credentials({
      
      credentials: {
        email: { name: "email", type: "email" },
        password: { name: "password", type: "password" },
      },
      authorize: async (credentials) => {

      if (!credentials?.email || !credentials?.password) return null

      // procura usuario com as credenciais
      const user = await findUserByCredentials({
        email: credentials?.email as string,
        password: credentials?.password as string
      });

      if (!user || !user.id || !user.email || !user.name || !user.role) {
        return null;
      }

      return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        groceryId: user?.groceryId
      }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role; 
        token.groceryId = user.groceryId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;

        session.user.role = token.role as {
          id: string;
          name: string;
        } | undefined;

        session.user.groceryId = token.groceryId as string;
      }

      return session;
    }
  },
})