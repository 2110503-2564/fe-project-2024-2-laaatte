import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
    {
      model: {
        type: String,
        required: [true, "Please add model name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters"],
      },
      description: {
        type: String,
        required: [true, "Please add description"],
      },
      picture: {
        type: String,
        required: false,
      },
      seats: {
        type: Number,
        required: [true, "Please add number of seats"],
      },
      doors: {
        type: Number,
        required: [true, "Please add number of doors"],
      },
      largebags: {
        type: Number,
        required: [true, "Please add number of large bags that can be accommodated"],
      },
      smallbags: {
        type: Number,
        required: [true, "Please add number of small bags that can be accommodated"],
      },
      automatic: {
        type: Boolean,
        required: [true, "Please identify it uses automatic transmission"],
      },
      dayRate: {
        type: Number,
        required: [true, "Please add day rate"],
      },
    }
  );

  const Car = mongoose.models.Car || mongoose.model("Car",CarSchema) 
  export default Car