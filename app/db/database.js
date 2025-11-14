import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://root:example@localhost:27017/universidad?authSource=admin");
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
}
