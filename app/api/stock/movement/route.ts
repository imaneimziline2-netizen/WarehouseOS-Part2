import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StockMovement from "@/models/StockMovement";
import Product from "@/models/Product";
import { stockMovementSchema } from "@/lib/validations";

export async function GET() {
  try {
    await connectDB();
    
    const movements = await StockMovement.find()
      .populate("product", "name sku")
      .sort({ createdAt: -1 });

    return NextResponse.json(movements);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch movements" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // تحليل الجسم
    const body = await request.json();
    console.log("📦 API Body Received:", body);

    // 1. التحقق من Zod
    const validation = stockMovementSchema.safeParse(body);
    if (!validation.success) {
      console.log("❌ Validation failed:", validation.error.flatten().fieldErrors);
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productId, type, quantity, note } = validation.data;

    // 2. البحث عن المنتوج
    const product = await Product.findById(productId);
    
    if (!product) {
      console.log("❌ Product not found for ID:", productId);
      return NextResponse.json(
        { message: "Product not found. Please select a valid product." },
        { status: 404 }
      );
    }

    if (product.archived) {
      return NextResponse.json(
        { message: "Cannot move stock for an archived product." },
        { status: 400 }
      );
    }

    // 3. الحسابات واللوجيك
    const oldStock = product.quantity;
    
    if (type === "OUT") {
      if (product.quantity < quantity) {
        return NextResponse.json(
          { message: `Insufficient stock. Available: ${product.quantity}, Requested: ${quantity}` },
          { status: 400 }
        );
      }
      product.quantity -= quantity;
    } else {
      product.quantity += quantity;
    }

    console.log(`🔄 Stock updated: ${oldStock} -> ${product.quantity}`);

    // 4. الحفظ فالداتابيز (مهم جداً هنا)
    await product.save();

    // 5. تسجيل الحركة
    const movement = await StockMovement.create({
      product: product._id.toString(),
      type,
      quantity,
      note,
    });

    console.log("✅ Movement saved successfully!");

    // إرجاع النجاح
    return NextResponse.json(
      {
        message: "Stock movement recorded successfully",
        movement,
        newStock: product.quantity,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("🔥 CRITICAL ERROR:", error);
    
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}