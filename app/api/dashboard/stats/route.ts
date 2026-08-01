import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();

    const totalProducts = await Product.countDocuments({ archived: false });
    
    const totalCategories = await Category.countDocuments({ archived: false });

    const stockData = await Product.aggregate([
      { $match: { archived: false } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);
    const totalStock = stockData[0]?.total || 0;

    const valueData = await Product.aggregate([
      { $match: { archived: false } },
      { $group: { _id: null, total: { $sum: { $multiply: ["$price", "$quantity"] } } } }
    ]);
    const totalValue = valueData[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalStock,
        totalValue,
      }
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch dashboard statistics" 
      }, 
      { status: 500 }
    );
  }
}