import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser extends User {
    token: string;
}

export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
      
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });
      
          if (!res.ok) {
            return null; // Login failed
          }
      
          // 2️⃣ Parse the response
          const data = await res.json();
      
          // 3️⃣ Return the user session object
          return { id: data.userId, name: data.name, token: data.token };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      }
      
    }),
  ],
  callbacks : {
    async jwt({ token, user }) {
        if (user) {
          token.accessToken =(user as CustomUser).token;
        }
        return token;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        return session;
      },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
