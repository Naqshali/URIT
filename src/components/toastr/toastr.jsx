"use client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Toastr({ showToastr, action }) {
  const router = useRouter();
  useEffect(() => {
    if (showToastr) {
      openToastr();
    }
  }, [showToastr]);

  const openToastr = () => {
    toast.success(showToastr.description, {
      autoClose: 2000,
      className: "custom-toastr",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      onClick: handleToastClick,
    });
  };

  const handleToastClick = () => {
    if (action) {
      if (showToastr.notificationType === "Message") {
        router.push("/chats");
      } else {
        router.push("/notifications");
      }
      console.log("showToastr", showToastr);
    }
  };

  return (
    <>
      <ToastContainer />
    </>
  );
}
