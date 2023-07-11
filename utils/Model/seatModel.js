import mongoose from "mongoose";
const SeatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true },
  status: {
    type: Boolean,
    required: true,
  },
});
export const Seat = mongoose.models.Seat || mongoose.model("Seat", SeatSchema);
