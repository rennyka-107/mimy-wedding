import { NextResponse } from "next/server";
import { orders } from "@/db/schema";
import { db } from "@/db";
import { eq, count, sql } from "drizzle-orm";

// GET - Lấy thống kê orders
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    const whereCondition = userId ? eq(orders.user_id, userId) : undefined;

    // Đếm tổng số orders
    const totalOrders = await db
      .select({ count: count() })
      .from(orders)
      .where(whereCondition);

    // Tính tổng doanh thu
    const totalRevenue = await db
      .select({ 
        total: sql<number>`COALESCE(SUM(${orders.total_money}), 0)` 
      })
      .from(orders)
      .where(whereCondition);

    // Tổng lượt xem
    const totalViews = await db
      .select({ 
        total: sql<number>`COALESCE(SUM(${orders.views}), 0)` 
      })
      .from(orders)
      .where(whereCondition);

    // Orders gần đây (10 orders mới nhất)
    const recentOrders = await db
      .select({
        id: orders.id,
        code: orders.code,
        template_name: orders.template_name,
        total_money: orders.total_money,
        views: orders.views,
        createdAt: orders.createdAt
      })
      .from(orders)
      .where(whereCondition)
      .orderBy(sql`${orders.createdAt} DESC`)
      .limit(10);

    return NextResponse.json({ 
      status: "success", 
      data: {
        totalOrders: totalOrders[0]?.count || 0,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalViews: totalViews[0]?.total || 0,
        recentOrders
      }
    });
  } catch (err) {
    console.error("Error fetching order stats:", err);
    return NextResponse.json({ 
      status: "error", 
      message: err 
    }, { status: 500 });
  }
}
