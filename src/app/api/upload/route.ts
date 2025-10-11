import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { join } from "path";
import * as crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { users, images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkImageLimit } from "@/utils/limits";

export const dynamic = "force-dynamic";

// Kích thước file tối đa (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    // Kiểm tra xác thực người dùng
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    // Tìm user_id dựa trên email
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email)
    });

    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy thông tin người dùng" },
        { status: 404 }
      );
    }
    
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    // Kiểm tra nếu file là ảnh
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Kiểm tra kích thước file
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }
    
    // Kiểm tra giới hạn số lượng ảnh
    const checkResult = await checkImageLimit(user.id);
    
    if (!checkResult.allowed) {
      return NextResponse.json(
        { error: checkResult.message },
        { status: 403 }
      );
    }

    // Tạo tên file ngẫu nhiên để tránh trùng lặp
    const buffer = await file.arrayBuffer();
    const fileName = crypto.randomBytes(16).toString("hex");
    const fileExtension = file.name.split(".").pop();
    const fullFileName = `${fileName}.${fileExtension}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filePath = join(uploadDir, fullFileName);

    // Kiểm tra xem thư mục uploads có tồn tại không
    try {
      await fs.access(uploadDir);
    } catch (error) {
      console.log(error, "loi gi day");
      // Nếu không tồn tại, tạo mới thư mục
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Ghi file vào thư mục uploads
    await fs.writeFile(filePath, Buffer.from(buffer));
      
    // Lưu thông tin ảnh vào bảng images
    await db.insert(images).values({
      userId: user.id,
      name: fullFileName,
      originalName: file.name,
      path: filePath,
      url: `/uploads/${fullFileName}`,
      mimeType: file.type,
      size: file.size,
      used: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();

    // Trả về đường dẫn của file để client có thể hiển thị
    const fileUrl = `/uploads/${fullFileName}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
