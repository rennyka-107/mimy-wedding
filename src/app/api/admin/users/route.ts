import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all users (excluding password field for security)
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        phone: users.phone,
        image: users.image,
        emailVerified: users.emailVerified,
        image_limit: users.image_limit,
        draft_limit: users.draft_limit,
        draft_used: users.draft_used,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return NextResponse.json({
      status: "success",
      data: allUsers,
      total: allUsers.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
