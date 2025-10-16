import { NextResponse } from "next/server";
import { orders, wishes } from "@/db/schema";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";

// GET - Lấy order theo ID cùng với wishes
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const order = await db.select().from(orders).where(eq(orders.id, id));

    if (order.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "Order not found" 
      }, { status: 404 });
    }

    // Lấy wishes của order này
    const orderWishes = await db
      .select()
      .from(wishes)
      .where(eq(wishes.order_id, id))
      .orderBy(desc(wishes.createdAt));

    return NextResponse.json({ 
      status: "success", 
      data: {
        ...order[0],
        wishes: orderWishes
      }
    });
  } catch (err) {
    console.error("Error fetching order:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}

// PUT - Cập nhật order
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const updateData = await req.json();

    // Remove id from updateData if present
    delete updateData.id;
    delete updateData.createdAt;

    // Convert date strings to Date objects if present
    if (updateData.public_start) {
      updateData.public_start = new Date(updateData.public_start);
    }
    if (updateData.public_end) {
      updateData.public_end = new Date(updateData.public_end);
    }

    // Add updatedAt timestamp
    updateData.updatedAt = new Date();

    const updatedOrder = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();

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
    console.error("Error updating order:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}

// DELETE - Xóa order
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deletedOrder = await db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning();

    if (deletedOrder.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "Order not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      status: "success", 
      message: "Order deleted successfully",
      data: deletedOrder[0] 
    });
  } catch (err) {
    console.error("Error deleting order:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}
