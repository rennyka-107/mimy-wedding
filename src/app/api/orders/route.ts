import { NextResponse } from "next/server";
import { orders } from "@/db/schema";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET - Lấy danh sách orders hoặc order theo publicUrl
export async function GET(req: Request) {
  try {
    // check user
    const session = await getServerSession(authOptions);
    const user = session?.user;
    console.log(session,"session")
    if (!user) {
      return NextResponse.json({ 
        status: "error", 
        message: "User not found" 
      }, { status: 404 });
    }
    const { searchParams } = new URL(req.url);
    const userId = user.id;
    const publicUrl = searchParams.get('publicUrl');
    const id = searchParams.get('id');
    
    // Nếu có publicUrl, tìm order theo public_url
    if (publicUrl) {
      const order = await db
        .select()
        .from(orders)
        .where(eq(orders.public_url, publicUrl))
        .limit(1);

      if (order.length === 0) {
        return NextResponse.json({ 
          status: "error", 
          message: "Order not found" 
        }, { status: 404 });
      }

      // Convert BigInt fields to strings for JSON serialization
      const orderData = {
        ...order[0],
        total_money: order[0].total_money.toString(),
        template_price: order[0].template_price.toString()
      };

      // Tăng view count
      await db
        .update(orders)
        .set({ 
          views: order[0].views + 1 
        })
        .where(eq(orders.id, order[0].id));

      return NextResponse.json({ 
        status: "success", 
        data: orderData 
      });
    }
    
    if (id) {
      const order = await db
        .select()
        .from(orders)
        .where(eq(orders.id, id))
        .limit(1);

      if (order.length === 0) {
        return NextResponse.json({ 
          status: "error", 
          message: "Order not found" 
        }, { status: 404 });
      }

      // Convert BigInt fields to strings for JSON serialization
      const orderData = {
        ...order[0],
        total_money: order[0].total_money.toString(),
        template_price: order[0].template_price.toString()
      };

      // Tăng view count
      await db
        .update(orders)
        .set({ 
          views: order[0].views + 1 
        })
        .where(eq(orders.id, order[0].id));

      return NextResponse.json({ 
        status: "success", 
        data: orderData 
      });
    }
    
    let orderList;
    if (userId) {
      // Lấy orders theo user_id, sắp xếp theo thời gian tạo mới nhất
      orderList = await db
        .select()
        .from(orders)
        .where(eq(orders.user_id, userId))
        .orderBy(desc(orders.createdAt));
    } else {
      // Lấy tất cả orders, sắp xếp theo thời gian tạo mới nhất
      orderList = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt));
    }

    // Convert BigInt fields to strings for JSON serialization
    const serializedOrderList = orderList.map(order => ({
      ...order,
      total_money: order.total_money.toString(),
      template_price: order.template_price.toString()
    }));

    return NextResponse.json({ 
      status: "success", 
      data: serializedOrderList 
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}

// POST - Tạo order mới
export async function POST(req: Request) {
  try {
    const { 
      code, 
      total_money, 
      template_id, 
      template_price, 
      user_id, 
      payment_id, 
      public_url, 
      public_start, 
      public_end, 
      template_name, 
      template_config 
    } = await req.json();

    // Validate required fields
    if (!total_money || !template_id || !template_price || !user_id || !template_name) {
      return NextResponse.json({ 
        status: "error", 
        message: "Missing required fields" 
      }, { status: 400 });
    }

    // Helper function to parse various date formats
    const parseDate = (dateString: string): Date | null => {
      if (!dateString || typeof dateString !== 'string') return null;
      
      const trimmed = dateString.trim();
      if (!trimmed) return null;
      
      // Handle DD-MM-YYYY format (e.g., "30-09-2025")
      const ddmmyyyyPattern = /^(\d{2})-(\d{2})-(\d{4})$/;
      const ddmmyyyyMatch = trimmed.match(ddmmyyyyPattern);
      
      if (ddmmyyyyMatch) {
        const [, day, month, year] = ddmmyyyyMatch;
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        
        // Validate ranges
        if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12 && yearNum >= 1900) {
          const date = new Date(yearNum, monthNum - 1, dayNum); // month is 0-indexed
          
          // Check if the date is valid (handles leap years, month lengths, etc.)
          if (date.getFullYear() === yearNum && 
              date.getMonth() === monthNum - 1 && 
              date.getDate() === dayNum) {
            return date;
          }
        }
        return null; // Invalid DD-MM-YYYY date
      }
      
      // Handle ISO format (YYYY-MM-DD) and other standard formats
      const date = new Date(trimmed);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return null;
      }
      
      return date;
    };

    const newOrder = await db.insert(orders).values({
      code: code ?? null,
      total_money,
      template_id,
      template_price,
      user_id,
      payment_id: payment_id ?? null,
      public_url: public_url ?? null,
      public_start: public_start ? parseDate(public_start) : null,
      public_end: public_end ? parseDate(public_end) : null,
      template_name,
      template_config,
    }).returning();

    // Convert BigInt fields to strings for JSON serialization
    const orderData = {
      ...newOrder[0],
      total_money: newOrder[0].total_money.toString(),
      template_price: newOrder[0].template_price.toString()
    };

    return NextResponse.json({ 
      status: "success", 
      data: orderData 
    });
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}

// DELETE - Xóa order theo ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json({ 
        status: "error", 
        message: "Order ID is required" 
      }, { status: 400 });
    }

    // Xóa order theo ID
    const deletedOrder = await db
      .delete(orders)
      .where(eq(orders.id, orderId))
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
      data: { id: orderId }
    });
  } catch (err) {
    console.error("Error deleting order:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}

// PUT - Cập nhật order theo ID
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json({ 
        status: "error", 
        message: "Order ID is required" 
      }, { status: 400 });
    }

    const { 
      code, 
      total_money, 
      template_id, 
      template_price, 
      user_id, 
      payment_id, 
      public_url, 
      public_start, 
      public_end, 
      template_name, 
      template_config 
    } = await req.json();

    // Helper function to parse various date formats
    const parseDate = (dateString: string): Date | null => {
      if (!dateString || typeof dateString !== 'string') return null;
      
      const trimmed = dateString.trim();
      if (!trimmed) return null;
      
      // Handle DD-MM-YYYY format (e.g., "30-09-2025")
      const ddmmyyyyPattern = /^(\d{2})-(\d{2})-(\d{4})$/;
      const ddmmyyyyMatch = trimmed.match(ddmmyyyyPattern);
      
      if (ddmmyyyyMatch) {
        const [, day, month, year] = ddmmyyyyMatch;
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        
        // Validate ranges
        if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12 && yearNum >= 1900) {
          const date = new Date(yearNum, monthNum - 1, dayNum); // month is 0-indexed
          
          // Check if the date is valid (handles leap years, month lengths, etc.)
          if (date.getFullYear() === yearNum && 
              date.getMonth() === monthNum - 1 && 
              date.getDate() === dayNum) {
            return date;
          }
        }
        return null; // Invalid DD-MM-YYYY date
      }
      
      // Handle ISO format (YYYY-MM-DD) and other standard formats
      const date = new Date(trimmed);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return null;
      }
      
      return date;
    };

    // Tạo object update với các field được cung cấp
    const updateData: { [key: string]: string | number | boolean | Date | null } = {};
    
    if (code !== undefined) updateData.code = code;
    if (total_money !== undefined) updateData.total_money = total_money;
    if (template_id !== undefined) updateData.template_id = template_id;
    if (template_price !== undefined) updateData.template_price = template_price;
    if (user_id !== undefined) updateData.user_id = user_id;
    if (payment_id !== undefined) updateData.payment_id = payment_id;
    if (public_url !== undefined) updateData.public_url = public_url;
    if (public_start !== undefined) updateData.public_start = public_start ? parseDate(public_start) : null;
    if (public_end !== undefined) updateData.public_end = public_end ? parseDate(public_end) : null;
    if (template_name !== undefined) updateData.template_name = template_name;
    if (template_config !== undefined) updateData.template_config = template_config;

    // Cập nhật updatedAt
    updateData.updatedAt = new Date();

    // Thực hiện update
    const updatedOrder = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, orderId))
      .returning();

    if (updatedOrder.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "Order not found" 
      }, { status: 404 });
    }

    // Convert BigInt fields to strings for JSON serialization
    const orderData = {
      ...updatedOrder[0],
      total_money: updatedOrder[0].total_money.toString(),
      template_price: updatedOrder[0].template_price.toString()
    };

    return NextResponse.json({ 
      status: "success", 
      message: "Order updated successfully",
      data: orderData 
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}
