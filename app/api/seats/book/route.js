import { Seat } from "@/utils/Model/seatModel";
import { dbConnect } from "@/utils/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  await dbConnect();
  const body = await request.json();

  try {
    const requiredSeats = body.noOfSeats;
    if (requiredSeats <= 7) {
      /* This code is responsible for finding and booking a group of seats based on the number of
      required seats. */
      const seats = await Seat.find().sort({ seatNumber: 1 });
      let booked = [];
      let i = 0;
      while (i < seats.length && i <= 71) {
        /* The code is initializing a variable `empty` to 0 and then looping through a group of 7 seats
    starting from index `i`. For each seat in the group, it checks if the `status` property of the
    seat is `false`. If it is, it increments the `empty` variable by 1. */
        let empty = 0;
        for (let j = i; j < i + 7; j++) {
          if (seats[j].status === false) {
            empty++;
          }
        }
        /* This code block is responsible for booking a group of seats if there are enough consecutive
       empty seats available. */
        if (empty >= requiredSeats) {
          empty = requiredSeats;
          for (let j = i; j < i + 7; j++) {
            if (seats[j].status === false && empty > 0) {
              booked.push(seats[j].seatNumber);
              await Seat.findByIdAndUpdate(
                { _id: seats[j]._id },
                { status: true }
              );
              empty--;
            }
          }

          break;
        } else {
          i += 7;
        }
      }

      /* This code block is checking if any seats have been successfully booked. If the `booked` array
    has a length greater than 0, it means that seats have been booked. In that case, it returns a
    JSON response using `NextResponse.json()` with the `booked` array as the response body and a
    status code of 200. This indicates that the booking was successful. */
      if (booked.length > 0) {
        return NextResponse.json({ booked }, { status: 200 });
      } /* The `else` block is executed when there are not enough consecutive empty seats available to
      book. In this block, the code queries the database to find all the seats that have a `status`
      of `false`, indicating that they are available. The seats are sorted in ascending order based
      on their `seatNumber`. The result of this query is stored in the `isAvailable` variable. */ else {
        const isAvailable = await Seat.find({ status: false }).sort({
          seatNumber: 1,
        });

        /* This code block is checking if there are not enough consecutive empty seats available to book. If
the length of the `isAvailable` array (which contains all the seats with a `status` of `false`) is
less than the `requiredSeats` value, it means that there are not enough seats available to fulfill
the booking request. */
        if (isAvailable.length < requiredSeats) {
          return NextResponse.json(
            { message: "not enough seats available to book" },
            { status: 400 }
          );
        } else if (isAvailable.length >= requiredSeats) {
          /* This code block is responsible for booking all the available seats when there are enough
     consecutive empty seats available to fulfill the booking request. */
          for (let j = 0; j < isAvailable.length; j++) {
            await Seat.findByIdAndUpdate(
              { _id: isAvailable[j]._id },
              { status: true }
            );
          }
          return NextResponse.json({massage:"success", booked }, { status: 200 });
        }

        /* The code block you provided is finding the difference between the seat numbers of the first and
   last seat in a group of required seats. */
        let difference = [];
        let a = 0;
        while (a <= isAvailable.length - requiredSeats) {
          let first = isAvailable[a].seatNumber;
          let last = isAvailable[a + requiredSeats - 1].seatNumber;
          difference.push(last - first);
          a += requiredSeats;
        }

        /* This code block is finding the group of consecutive seats with the least difference between the seat
numbers of the first and last seat. */
        let least = Math.min(...difference);
        let index = difference.indexOf(least) || 1;

        for (
          let j = requiredSeats * index;
          j < requiredSeats * index + requiredSeats;
          j++
        ) {
          console.log(isAvailable[j].seatNumber);
          booked.push(isAvailable[j].seatNumber);
          await Seat.findByIdAndUpdate(
            { _id: isAvailable[j]._id },
            { status: true }
          );
        }
        return NextResponse.json({massage:"success", booked }, { status: 200 });
      }
    } else {
      return NextResponse.json({ message:`You cannot book more than 7 seats at time` }, { status: 400 });
    }
  } catch (error) {
    console.log("POST  error:", error);
    return NextResponse.json({ massage:error.massage }, { status: 400 });
  }
};
