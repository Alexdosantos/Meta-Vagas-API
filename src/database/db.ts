import mongoose from "mongoose";
class Database {
  static initialize() {
    mongoose.connection.on("open", () => {
      console.log("Database connected");
    });
    mongoose.connect(process.env.DATABASE_URL as string);
  }
}

export { Database };
