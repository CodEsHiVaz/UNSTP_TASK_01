import { Seat } from "@/utils/Model/seatModel";
import { dbConnect } from "@/utils/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();
  try {
    const seatstatus = await Seat.find().sort({ seatNumber: 1 });
    return NextResponse.json({ seatstatus }, { status: 200 });
  } catch (error) {
    console.log("GET  error:", error);
    return NextResponse.json(
      { massage: `request failed due to ${error.massage} ` },
      { status: 404 }
    );
  }
};
