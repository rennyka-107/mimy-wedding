import { NextResponse } from "next/server";
import { pageVisits } from "@/db/schema";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";

// Helper function to get client IP
function getClientIp(req: Request): string {
  // Try to get IP from various headers
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // Fallback
  return 'unknown';
}

// POST - Ghi nhận lượt truy cập mới
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { region, sub_id } = body;

    console.log('[API /visits POST] Received request body:', body);
    console.log('[API /visits POST] Extracted sub_id:', sub_id);

    // Lấy IP từ request headers
    const ip = getClientIp(req);

    // Prepare data for insertion
    const insertData = {
      ip,
      visit_time: new Date(),
      region: region ?? null,
      sub_id: sub_id ?? null,
    };

    console.log('[API /visits POST] Data to insert:', insertData);

    // Tạo record visit mới
    const newVisit = await db.insert(pageVisits).values(insertData).returning();

    console.log('[API /visits POST] Inserted successfully:', newVisit[0]);

    return NextResponse.json({
      status: "success",
      data: newVisit[0]
    });
  } catch (err) {
    console.error("[API /visits POST] Error creating page visit:", err);
    return NextResponse.json({
      status: "error",
      message: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
}

// GET - Lấy danh sách visits (có thể filter theo order_id hoặc sub_id)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subId = searchParams.get('sub_id');
    const limit = searchParams.get('limit');

    let visitsList;

    if (subId) {
      // Lấy visits theo sub_id
      visitsList = await db
        .select()
        .from(pageVisits)
        .where(eq(pageVisits.sub_id, subId))
        .orderBy(desc(pageVisits.visit_time));
    } else {
      // Lấy tất cả visits
      const query = db
        .select()
        .from(pageVisits)
        .orderBy(desc(pageVisits.visit_time));
      
      // Nếu có limit parameter, apply limit
      if (limit && !isNaN(parseInt(limit))) {
        visitsList = await query.limit(parseInt(limit));
      } else {
        visitsList = await query.limit(1000); // Default limit 1000 records
      }
    }

    return NextResponse.json({
      status: "success",
      data: visitsList,
      count: visitsList.length
    });
  } catch (err) {
    console.error("Error fetching visits:", err);
    return NextResponse.json({
      status: "error",
      message: err
    }, { status: 500 });
  }
}
