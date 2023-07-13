import { Seat } from "@/utils/Model/seatModel";
import { dbConnect } from "@/utils/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const PATCH = async () => {
    await dbConnect();
    try {
      await Seat.updateMany({ status: true }, { status: false });
      return NextResponse.json(
        { massage: "Bookings successfully reseted" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { massage: `error while resete boookings ${error.massage}` },
        { status: 500 }
      );
    }
  };
  
  