"use client";

import { useEffect, useRef } from "react";

export default function Payments() {
  const paymentElementRef = useRef(null); // Reference to payment div

  useEffect(() => {
    const initializeMoyasar = () => {
      if (window.Moyasar && paymentElementRef.current) {
        // Initialize Moyasar when element is available
        window.Moyasar.init({
          element: paymentElementRef.current, // Use ref instead of query selector
          amount: 10000, // Amount in halalas (1 SAR = 100 halalas)
          currency: "SAR",
          description: "Your Order Description",
          publishable_api_key:
            "pk_test_ZnRduNbgek9zo8NCQb4seK2ALFByfDgaGrBp4rma",
          callback_url: "http://localhost:3000/manage-projects",
          methods: ["creditcard"],
          on_completed: function (payment) {
            console.log(payment); // Handle the successful payment
          },
          on_failed: function (error) {
            console.error(error); // Handle any payment failure
          },
        });
      } else {
        console.error("Moyasar SDK not loaded or element not found");
      }
    };

    // Ensure Moyasar is loaded
    if (window.Moyasar) {
      console.log("useEffect ~ window:", window);
      initializeMoyasar();
    } else {
      // Retry loading Moyasar if it wasn't ready at first
      const intervalId = setInterval(() => {
        if (window.Moyasar && paymentElementRef.current) {
          initializeMoyasar();
          clearInterval(intervalId);
        }
      }, 500); // Retry every 500ms
    }
  }, []);

  return (
    <>
      <div>
        <h2>Complete Your Payment</h2>
        <div ref={paymentElementRef} id="moyasar-payment"></div>{" "}
        {/* Ref added */}
      </div>
    </>
  );
}
