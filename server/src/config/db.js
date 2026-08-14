import mongoose from "mongoose";

export const ConnectToDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Mongo DB Uri not properly defined");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MONGO DB");
  } catch (error) {
    console.error("Error: ", error);
  }
};
