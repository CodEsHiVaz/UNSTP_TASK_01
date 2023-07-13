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

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const getdata = async () => {
    const res = await axios.get("api/seats");
    const data = await res.data.seatstatus;
    setseats(data);
  };
  const reset = async () => {
    try {
      const res = await axios.patch("api/seats/reset");
      const data = await res.data.data;
      getdata();
      showToastMessage(`Booking reset successfully!`, "success");
    } catch (error) {

      console.log("reset  error:", error);
      showToastMessage("Failed while reset booking", "error");
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("ffffffffffffffffffffffffffff");

    try {
      const res = await axios.post("api/seats/book", {
        noOfSeats: numOfSeats,
      });
      const data = await res.data.data;
      getdata();
      showToastMessage(`${numOfSeats} Seat booked successfully!`, "success");
    } catch (error) {
      console.log("handelSubmit  error:", error);
      showToastMessage("Failed to book seat. Please try again.", "error");
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.parrent}>
        <div className={styles.seatsSection}>
          <div className={styles.seatContainer}>
            {seats &&
              seats.map((elem) => {
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
              <div id={styles.red}>0</div>
              <p>Booked Seats</p>
            </div>
            <div>
              {" "}
              <div id={styles.green}>0</div>
              <p>Available Seats</p>
            </div>
          </div>{" "}
        </div>
        <div className={styles.bookingSection}>
          <h2 className={styles.head}>Bus Ticket Booking System</h2>

          <div className={styles.bookingForm}>
            {" "}
            <form onSubmit={handelSubmit}>
              <div className={styles.inputSection}>
                <label htmlFor="seatnumbr">
                  Enter Number of Seats to be book
                </label>
                <input
                  type="number"
                  onChange={(e) => setnumOfSeats(e.target.value)}
                  name="seatnumbr"
                  id="seatnumbr"
                />
              </div>

              <div className={styles.butnDiv}>
                <button onClick={reset} className={styles.reset} type="button">
                  Resete Booking
                </button>
                <button className={styles.submit} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
      {showToast && <Toast message={toastMessage} type={toastType} />}
        </div>
      </div>
    </main>
  );
}
