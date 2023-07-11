import { Seat } from "@/utils/Model/seatModel";
import { dbConnect } from "@/utils/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  await dbConnect();
  const arr = await request.json();

  console.log("POST  arr:", arr);

  try {
    // const seatstatus = await Seat.updateMany({
    //   _id: { $in: arr },
    //   status: true,
    // });
    return NextResponse.json({ seatstatus: "xx" }, { status: 200 });
  } catch (error) {
    console.log("GET  error:", error);

    return NextResponse.json({ msg: "failed" }, { status: 500 });
  }
};
