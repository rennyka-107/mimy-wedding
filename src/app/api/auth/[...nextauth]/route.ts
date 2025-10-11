import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "your-super-secret-key",
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email và mật khẩu là bắt buộc");
        }

        // Tìm user theo email
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email)
        });

        if (!user || !user.password) {
          throw new Error("Email hoặc mật khẩu không chính xác");
        }

        // So sánh mật khẩu
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Email hoặc mật khẩu không chính xác");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Nếu là đăng nhập bằng Google, lưu thông tin vào DB
      if (account?.provider === "google" && profile?.email) {
        try {
          // Kiểm tra xem user đã tồn tại chưa
          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, profile.email as string)
          });
          
          // Nếu chưa có, thêm vào DB
          if (!existingUser) {
            await db.insert(users).values({
              email: profile.email as string,
              name: profile.name || 'Google User',
              image: profile?.image || null,
              emailVerified: new Date()
            });
          }
        } catch (error) {
          console.error("Lỗi khi lưu user Google:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: { id: string }; user?: { id: string } }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
