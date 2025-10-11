import { NextResponse } from "next/server";
import { payments } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";


export async function POST(req: Request) {
  try {
    const { id, gateway, transactionDate, code, content, transferAmount } = await req.json();
    console.log(id, gateway, transactionDate, code, content, transferAmount, "loi gi day");
    
    // Convert transactionDate string to Date object
    const transactionDateObj = new Date(transactionDate);
    
    // Lưu thông tin payment vào database
    await db.insert(payments).values({
      gateway: gateway,
      transaction_date: transactionDateObj,
      code: code,
      content: content,
      transferAmount: transferAmount,
      transfer_id: id,
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log(err, "loi gi day");
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ 
        status: "error", 
        message: "Code parameter is required" 
      }, { status: 400 });
    }

    // Tìm payment theo code
    const payment = await db.select().from(payments).where(eq(payments.code, code)).limit(1);

    if (payment.length === 0) {
      return NextResponse.json({ 
        status: "error", 
        message: "Payment not found" 
      }, { status: 404 });
    }

    // Convert BigInt fields to strings for JSON serialization
    const paymentData = {
      ...payment[0],
      transferAmount: payment[0].transferAmount.toString(),
      transfer_id: payment[0].transfer_id.toString()
    };

    return NextResponse.json({ 
      status: "success", 
      data: paymentData 
    });
  } catch (err) {
    console.log(err, "findPaymentByCode error");
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
