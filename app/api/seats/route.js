import { Seat } from "@/utils/Model/seatModel";
import { dbConnect } from "@/utils/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();
  try {
    const seatstatus = await Seat.find();
    return NextResponse.json({ seatstatus }, { status: 200 });
  } catch (error) {
    console.log("GET  error:", error);

    return NextResponse.json({ msg: "failed" }, { status: 500 });
  }
};
export const POST = async (request) => {
  await dbConnect();
  const arr = await request.json();

  console.log("POST  arr:", arr);

  try {
    const seatstatus = await Seat.updateMany(
      {
        _id: { $in: arr },
      },
      { $set: { status: true } }
    );
    return NextResponse.json({ seatstatus }, { status: 200 });
  } catch (error) {
    console.log("GET  error:", error);

    return NextResponse.json({ msg: "failed" }, { status: 500 });
  }
};

// export const POST = async (request) => {
//   await dbConnect();
//   const body = await request.json();

//   console.log("POST  body:", body);

//   try {
//     const data = await Seat.create(body);
//     return NextResponse.json({ data }, { status: 200 });
//   } catch (error) {
//     console.log("GET  error:", error);

//     return new NextResponse.json({ msg: "failed" }, { status: 500 });
//   }
// };
