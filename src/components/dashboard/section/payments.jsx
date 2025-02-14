"use client";

import { useEffect, useRef } from "react";
import { sendMessage } from "@/services/ChatService";

export default function Payments({ selectedProposal }) {
  const paymentElementRef = useRef(null);

  useEffect(() => {
    const initializeMoyasar = () => {
      if (window.Moyasar && paymentElementRef.current) {
        window.Moyasar.init({
          element: paymentElementRef.current,
          amount: selectedProposal.hourlyRate * 100, // Amount in halalas (1 SAR = 100 halalas)
          currency: "SAR",
          description: "Your Order Description",
          publishable_api_key:
            "pk_test_ZnRduNbgek9zo8NCQb4seK2ALFByfDgaGrBp4rma",
          callback_url: `http://localhost:3000//proposal-accepted?proposalId=${selectedProposal.id}&projectId=${selectedProposal.projectId}`,
          methods: ["creditcard"],
          on_completed: async (payment) => {
            console.log("hahahahah", payment);
          },
          on_failed: function (error) {
            console.error(error);
          },
        });
      } else {
        console.error("Moyasar SDK not loaded or element not found");
      }
    };

    if (window.Moyasar) {
      console.log("useEffect ~ window:", window);
      initializeMoyasar();
    } else {
      const intervalId = setInterval(() => {
        if (window.Moyasar && paymentElementRef.current) {
          initializeMoyasar();
          clearInterval(intervalId);
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <div>
        {/* <h2>Complete Your Payment</h2> */}
        <div ref={paymentElementRef} id="moyasar-payment"></div>{" "}
        {/* Ref added */}
      </div>
    </>
  );
}
