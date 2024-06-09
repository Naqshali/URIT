"use client";
import { useEffect, useState } from "react";
import profileStore from "@/store/myprofile/profile";

export default function ChangePassword() {
  const { changePassword } = profileStore();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const isSame = newPassword === confirmNewPassword;
    console.log("isSame", isSame);
  }, [newPassword, confirmNewPassword]);

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const onSubmitForm = async () => {
    await changePassword({ newPassword: newPassword });
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Change password</h5>
        </div>
        <div className="col-lg-7">
          <div className="row">
            <form className="form-style1">
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Old Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      New Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                      value={newPassword}
                      onChange={handleNewPassword}
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Confirm New Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                      value={confirmNewPassword}
                      onChange={handleConfirmNewPassword}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-start">
                    <button
                      type="button"
                      className="ud-btn btn-thm"
                      onClick={() => onSubmitForm()}
                    >
                      Change Password
                      <i className="fal fa-arrow-right-long" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
