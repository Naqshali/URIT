"use client";
import profileStore from "@/store/myprofile/profile";

export default function ConfirmPassword() {
  const { deactivateAccount } = profileStore();
  const handleSubmit = () => {
    deactivateAccount({ password: "pass" });
  };
  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="col-lg-7">
          <div className="row">
            <div className="bdrb1 pb15 mb25">
              <h5 className="list-title">Close Account</h5>
            </div>
            <form className="form-style1">
              <div className="row">
                <div className="col-sm-12">
                  <h6>Close account</h6>
                  <p className="text">
                    Warning: If you close your account, you will be unsubscribed
                    activities forever.
                  </p>
                </div>
                <div className="col-sm-6">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Enter Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                    />
                  </div>
                  <div className="text-start">
                    <button
                      type="button"
                      className="remove-account"
                      onClick={handleSubmit}
                    >
                      Close
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
