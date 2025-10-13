import { NextResponse } from "next/server";
import { wishes, orders } from "@/db/schema";
import { db } from "@/db";
import { eq, count } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { users } from "@/db/schema";

// GET - Lấy thống kê lời chúc theo user_id
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
      return NextResponse.json({ 
        status: "error", 
        message: "User not found" 
      }, { status: 404 });
    }
    const find_user = await db.select().from(users).where(eq(users.email, user.email as string)).limit(1);
    if (find_user.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "User not found" 
      }, { status: 404 });
    }
    const userId = find_user[0].id;
    const { searchParams } = new URL(req.url);
    // const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ 
        status: "error", 
        message: "User ID is required" 
      }, { status: 400 });
    }

    // Lấy tổng số lời chúc từ tất cả các thiệp của user
    const totalWishesResult = await db
      .select({ 
        total: count(wishes.id) 
      })
      .from(wishes)
      .leftJoin(orders, eq(wishes.order_id, orders.id))
      .where(eq(orders.user_id, userId));

    // Lấy số lời chúc theo từng thiệp của user
    const wishesByOrderResult = await db
      .select({
        order_id: orders.id,
        template_name: orders.template_name,
        public_url: orders.public_url,
        total_wishes: count(wishes.id)
      })
      .from(orders)
      .leftJoin(wishes, eq(orders.id, wishes.order_id))
      .where(eq(orders.user_id, userId))
      .groupBy(orders.id, orders.template_name, orders.public_url);

    // Lấy số lời chúc theo trạng thái tham dự
    const attendanceStatsResult = await db
      .select({
        arrive: wishes.arrive,
        count: count(wishes.id)
      })
      .from(wishes)
      .leftJoin(orders, eq(wishes.order_id, orders.id))
      .where(eq(orders.user_id, userId))
      .groupBy(wishes.arrive);

    const totalWishes = totalWishesResult[0]?.total || 0;
    const attendingCount = attendanceStatsResult.find(stat => stat.arrive === true)?.count || 0;
    const notAttendingCount = attendanceStatsResult.find(stat => stat.arrive === false)?.count || 0;

    // Convert BigInt to number for JSON serialization
    const wishesByOrder = wishesByOrderResult.map(order => ({
      ...order,
      total_wishes: Number(order.total_wishes)
    }));

    const stats = {
      total_wishes: Number(totalWishes),
      attending_count: Number(attendingCount),
      not_attending_count: Number(notAttendingCount),
      total_orders: wishesByOrder.length,
      wishes_by_order: wishesByOrder
    };

    return NextResponse.json({ 
      status: "success", 
      data: stats 
    });
  } catch (err) {
    console.error("Error fetching wishes stats:", err);
    return NextResponse.json({ 
      status: "error", 
      message: JSON.stringify(err) 
    }, { status: 500 });
  }
}
