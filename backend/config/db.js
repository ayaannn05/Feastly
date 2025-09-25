import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected Successfully!");
  } catch (err) {
    res.status(404).json({
      status: "success",
      message: err,
    });
  }
};

export default connectDb;
