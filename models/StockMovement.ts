import mongoose, { Schema, Document } from "mongoose";

export interface IStockMovement extends Document {
  product: mongoose.Types.ObjectId;
  type: "IN" | "OUT";
  quantity: number;
  note?: string;
  createdAt: Date;
}

const StockMovementSchema = new Schema<IStockMovement>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    type: {
      type: String,
      enum: ["IN", "OUT"],
      required: [true, "Movement type is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

const StockMovement =
  mongoose.models.StockMovement ||
  mongoose.model<IStockMovement>("StockMovement", StockMovementSchema);

export default StockMovement;