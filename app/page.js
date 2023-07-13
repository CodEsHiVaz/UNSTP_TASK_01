"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import Toast from "@/Components/Toast";

export default function Home() {
  const [seats, setseats] = useState([]);
  const [numOfSeats, setnumOfSeats] = useState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const getdata = async () => {
    setIsLoading(true);
    const res = await axios.get("api/seats");
    const data = await res.data.seatstatus;
    setseats(data);
    setIsLoading(false);
  };
  const reset = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch("api/seats/reset");

      getdata();
      showToastMessage(`Booking reset successfully!`, "success");
    } catch (error) {
      console.log("reset  error:", error);
      showToastMessage("Failed while reset booking", "error");
    }
    setIsLoading(false);
  };
  const handelSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("api/seats/book", {
        noOfSeats: numOfSeats,
      });
      const data = await res.data.data;
      getdata();
      showToastMessage(`${numOfSeats} Seat booked successfully!`, "success");
    } catch (error) {
      console.log("handelSubmit  error:", error.response.data.message);
      showToastMessage(
        error.response.data.message ==
          "You cannot book more than 7 seats at time"
          ? error.response.data.message
          : "Failed to book seat. Please try again.",
        "error"
      );
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      {isloading && <div class="circle-spin-2"></div>}
      <main className={styles.main}>
        <div className={styles.parrent}>
          <div className={styles.seatsSection}>
            <div className={styles.seatContainer}>
              {seats &&
                seats.map((elem, ind) => {
                  return (
                    <div
                      key={elem._id}
                      id={elem.status ? styles.red : styles.green}
                      className={styles.box}
                    >
                      <p>{elem.seatNumber}</p>
                    </div>
                  );
                })}
            </div>
            <div className={styles.index}>
              <div>
                {" "}
                <div id={styles.red}></div>
                <p> = Booked Seats</p>
              </div>
              <div>
                {" "}
                <div id={styles.green}></div>
                <p> = Available Seats</p>
              </div>
            </div>{" "}
          </div>
          <div className={styles.bookingSection}>
            <h2 className={styles.head}> Ticket Booking System</h2>
            <div className={styles.bookingForm}>
              {" "}
              <form onSubmit={handelSubmit}>
                <div className={styles.inputSection}>
                  <label htmlFor="seatnumbr">
                    Enter Number of Seats to be book
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={7}
                    onChange={(e) => setnumOfSeats(e.target.value)}
                    name="seatnumbr"
                    id="seatnumbr"
                  />
                </div>

                <div className={styles.butnDiv}>
                  <button
                    onClick={reset}
                    className={styles.reset}
                    type="button"
                  >
                    Resete Booking
                  </button>
                  <button className={styles.submit} type="submit">
                    Reserve
                  </button>
                </div>
              </form>
            </div>

            {showToast && <Toast message={toastMessage} type={toastType} />}
          </div>
        </div>
      </main>
    </>
  );
}
