import mongoose, { Schema, model, InferSchemaType } from "mongoose";

const UserSckema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }],
  },
  { timestamps: true }
);

type IUser = InferSchemaType<typeof UserSckema>;
const User = model("User", UserSckema);

export { IUser, User };
