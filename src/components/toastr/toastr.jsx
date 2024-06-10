"use client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Toastr({ showToastr }) {
  useEffect(() => {
    if (showToastr) {
      openToastr();
    }
  }, [showToastr]);

  const openToastr = () => {
    toast.success(showToastr.description, {
      autoClose: 3000,
      className: "custom-toastr",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer />
    </>
  );
}
