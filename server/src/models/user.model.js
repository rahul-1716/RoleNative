import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already taken"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Account with this email address already exists"],
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
