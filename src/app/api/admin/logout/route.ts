import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin-session');

    return NextResponse.json({
      status: "success",
      message: "Đăng xuất thành công"
    });
  } catch (err) {
    console.error("Error during logout:", err);
    return NextResponse.json({
      status: "error",
      message: "Có lỗi xảy ra"
    }, { status: 500 });
  }
}
