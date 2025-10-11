import { NextResponse } from "next/server";
import { wishes, orders } from "@/db/schema";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";

// GET - Lấy danh sách wishes theo order_id
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const publicUrl = searchParams.get('publicUrl');
    
    let orderIdToUse = orderId;
    
    // Nếu có publicUrl, tìm order theo public_url để lấy order_id
    if (publicUrl && !orderId) {
      const order = await db
        .select({ id: orders.id })
        .from(orders)
        .where(eq(orders.public_url, publicUrl))
        .limit(1);

      if (order.length === 0) {
        return NextResponse.json({ 
          status: "error", 
          message: "Order not found with this public URL" 
        }, { status: 404 });
      }

      orderIdToUse = order[0].id;
    }

    if (!orderIdToUse) {
      return NextResponse.json({ 
        status: "error", 
        message: "Order ID or public URL is required" 
      }, { status: 400 });
    }

    // Lấy danh sách wishes với thông tin order, sắp xếp theo thời gian tạo mới nhất
    const wishesList = await db
      .select({
        id: wishes.id,
        content: wishes.content,
        sender: wishes.sender,
        arrive: wishes.arrive,
        order_id: wishes.order_id,
        createdAt: wishes.createdAt,
        updatedAt: wishes.updatedAt,
        public_url: orders.public_url
      })
      .from(wishes)
      .leftJoin(orders, eq(wishes.order_id, orders.id))
      .where(eq(wishes.order_id, orderIdToUse))
      .orderBy(desc(wishes.createdAt));

    return NextResponse.json({ 
      status: "success", 
      data: wishesList 
    });
  } catch (err) {
    console.error("Error fetching wishes:", err);
    return NextResponse.json({ 
      status: "error", 
      message: JSON.stringify(err) 
    }, { status: 500 });
  }
}

// POST - Tạo wish mới
export async function POST(req: Request) {
  try {
    const { 
      content, 
      sender, 
      arrive, 
      publicUrl 
    } = await req.json();

    // Validate required fields
    if (!content || !sender || !publicUrl) {
      return NextResponse.json({ 
        status: "error", 
        message: "Missing required fields: content, sender, and publicUrl are required" 
      }, { status: 400 });
    }

    // Tìm order theo public_url để lấy order_id
    const order = await db
      .select({ id: orders.id })
      .from(orders)
      .where(eq(orders.public_url, publicUrl))
      .limit(1);

    if (order.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "Order not found with this public URL" 
      }, { status: 404 });
    }

    const orderId = order[0].id;

    // Tạo wish mới
    const newWish = await db.insert(wishes).values({
      content,
      sender,
      arrive: arrive || false, // Default to false if not provided
      order_id: orderId,
    }).returning();

    return NextResponse.json({ 
      status: "success", 
      message: "Wish created successfully",
      data: newWish[0] 
    });
  } catch (err) {
    console.error("Error creating wish:", err);
    return NextResponse.json({ 
      status: "error", 
      message: JSON.stringify(err) 
    }, { status: 500 });
  }
}

// PUT - Cập nhật wish theo ID
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wishId = searchParams.get('id');

    if (!wishId) {
      return NextResponse.json({ 
        status: "error", 
        message: "Wish ID is required" 
      }, { status: 400 });
    }

    const { 
      content, 
      sender, 
      arrive 
    } = await req.json();

    // Tạo object update với các field được cung cấp
    const updateData: { [key: string]: string | boolean | Date | null } = {};
    
    if (content !== undefined) updateData.content = content;
    if (sender !== undefined) updateData.sender = sender;
    if (arrive !== undefined) updateData.arrive = arrive;

    // Cập nhật updatedAt
    updateData.updatedAt = new Date();

    // Thực hiện update
    const updatedWish = await db
      .update(wishes)
      .set(updateData)
      .where(eq(wishes.id, wishId))
      .returning();

    if (updatedWish.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "Wish not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      status: "success", 
      message: "Wish updated successfully",
      data: updatedWish[0] 
    });
  } catch (err) {
    console.error("Error updating wish:", err);
    return NextResponse.json({ 
      status: "error", 
      message: JSON.stringify(err) 
    }, { status: 500 });
  }
}

// DELETE - Xóa wish theo ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wishId = searchParams.get('id');

    if (!wishId) {
      return NextResponse.json({ 
        status: "error", 
        message: "Wish ID is required" 
      }, { status: 400 });
    }

    // Xóa wish theo ID
    const deletedWish = await db
      .delete(wishes)
      .where(eq(wishes.id, wishId))
      .returning();

    if (deletedWish.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "Wish not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      status: "success", 
      message: "Wish deleted successfully",
      data: { id: wishId }
    });
  } catch (err) {
    console.error("Error deleting wish:", err);
    return NextResponse.json({ 
      status: "error", 
      message: JSON.stringify(err) 
    }, { status: 500 });
  }
}
