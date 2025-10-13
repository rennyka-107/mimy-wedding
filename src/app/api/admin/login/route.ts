import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USERNAME = "mimy313181";
const ADMIN_PASSWORD = "longmy313181";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create session token (simple hash for demo)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      // Set cookie with 24 hour expiration
      const cookieStore = await cookies();
      cookieStore.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return NextResponse.json({
        status: "success",
        message: "Đăng nhập thành công"
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "Tên đăng nhập hoặc mật khẩu không đúng"
      }, { status: 401 });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return NextResponse.json({
      status: "error",
      message: "Có lỗi xảy ra"
    }, { status: 500 });
  }
}
