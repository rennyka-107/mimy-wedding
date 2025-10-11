import { NextResponse } from "next/server";
import { orders } from "@/db/schema";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";

// POST - Tăng view count cho order
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Tăng view count lên 1
    const updatedOrder = await db
      .update(orders)
      .set({ 
        views: sql`${orders.views} + 1`,
        updatedAt: new Date()
      })
      .where(eq(orders.id, id))
      .returning({
        id: orders.id,
        views: orders.views
      });

    if (updatedOrder.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "Order not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      status: "success", 
      data: updatedOrder[0] 
    });
  } catch (err) {
    console.error("Error incrementing views:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}
