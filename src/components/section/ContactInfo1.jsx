"use client";

import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useState } from "react";

export default function ContactInfo1() {
  const [loader, setLoader] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const sendEmail = async () => {
    if (form.name === "") {
      alert("Name is required");
      return;
    }

    if (form.email === "") {
      alert("Email is required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      alert("Email is not valid");
      return;
    }

    if (form.message === "") {
      alert("Message is required");
      return;
    }

    setLoader(true);

    setTimeout(() => {
      setLoader(false);
      setEmailSent(true);
    }, 3000);

    setTimeout(() => {
      setEmailSent(false);
    }, 5000);

    const apiKey =
      "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";
    const endpoint = "https://api.brevo.com/v3/smtp/email";

    const emailData = {
      sender: { name: "URIT", email: form.email }, // Use your own domain
      to: [{ email: "osamakhan.se@gmail.com", name: "Urit Help" }], // Where you want to receive the email
      replyTo: { email: form.email, name: form.name }, // This is the user's email, so you can reply to it
      subject: `Contact`,
      htmlContent: `<p>${form.message}</p>`,
    };

    try {
      const response = await axios.post(endpoint, emailData, {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      });
      resetForm();
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <section className="pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-6">
              <div className="position-relative mt40">
                <div className="main-title">
                  <h4 className="form-title mb25">Keep In Touch With Us.</h4>
                  <p className="text">
                    Neque convallis a cras semper auctor. Libero id faucibus
                    nisl tincidunt egetnvallis.
                  </p>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-tracking" />
                  </div>
                  <div className="details">
                    <h5 className="title">Address</h5>
                    <p className="mb-0 text">
                      328 Queensberry Street, North <br /> Melbourne VIC 3051,
                      Australia.
                    </p>
                  </div>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-call" />
                  </div>
                  <div className="details">
                    <h5 className="title">Phone</h5>
                    <p className="mb-0 text">+(0) 392 94 03 01</p>
                  </div>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-mail" />
                  </div>
                  <div className="details">
                    <h5 className="title">Email</h5>
                    <p className="mb-0 text">hello@URIT</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
                <h4 className="form-title mb25">Tell us about yourself</h4>
                <p className="text mb30">
                  Whether you have questions or you would just like to say
                  hello, contact us.
                </p>
                <form className="form-style1">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Messages
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Description"
                          name="message"
                          value={form.message}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <button
                          type="button"
                          className="ud-btn btn-thm"
                          onClick={sendEmail}
                        >
                          {!loader && !emailSent ? (
                            <span>
                              Send Messages
                              <i className="fal fa-arrow-right-long" />
                            </span>
                          ) : emailSent ? (
                            <span>
                              Email Sent <i class="fa-solid fa-check"></i>
                            </span>
                          ) : (
                            <span>
                              <Oval
                                height="25"
                                width="25"
                                color="#ffffff"
                                secondaryColor="ffffff"
                                ariaLabel="oval-loading"
                                wrapperClass="loader-wrapper"
                              />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
