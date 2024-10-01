import { Schema, model } from "mongoose";
import { hash } from "bcrypt";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 12);
  }
});

export default mongoose.model("User", userSchema);
