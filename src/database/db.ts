import mongoose from "mongoose";

class Database {
  static async initialize() {
    try {
      await mongoose.connect(process.env.DATABASE_URL as string);
      mongoose.connection.on("open", () => {
        console.log("Database connected");
      });
    } catch (error) {
      console.error("Database connection error:", error);
    }
  }
}

export { Database };
