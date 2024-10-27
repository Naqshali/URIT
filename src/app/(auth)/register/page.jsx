"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import signUpStore from "@/store/signUp";
import globalStore from "@/store/global";

export default function Page() {
  const router = useRouter();
  const { signUp } = signUpStore();
  const { getMetaData } = globalStore();

  const [userObj, setUserObj] = useState({
    name: "",
    password: "",
    userType: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const setAccType = (param) => {
    setUserObj({
      ...userObj,
      userType: param,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserObj({
      ...userObj,
      [name]: value,
    });
  };

  const createAccount = async () => {
    const result = await signUp(userObj);
    if (result) {
      router.push("/");
    }
    await getMetaData();
  };

  return (
    <>
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <Image
                  height={40}
                  width={133}
                  src="/images/header-logo2.png"
                  alt="Header Logo"
                />
                {/* <h2 className="title">Register</h2> */}
              </div>
            </div>
          </div>
          <div>
            {userObj.userType === "" ? (
              <div
                className="row wow fadeInRight mx-auto log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12"
                data-wow-delay="300ms container"
              >
                <div className="row">
                  <h4 className="text-center">Choose your account type</h4>
                </div>
                <div className="row">
                  <div className="col-md-6  col-sm-12">
                    <div className="d-grid mb20">
                      <button
                        className="ud-btn btn-thm default-box-shadow2"
                        type="button"
                        onClick={() => setAccType("CLIENT")}
                      >
                        As a Client <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 mx-auto">
                    <div className="d-grid mb20">
                      <button
                        className="ud-btn btn-thm2 default-box-shadow2"
                        type="button"
                        onClick={() => setAccType("SERVICE_PROVIDER")}
                      >
                        As a Service Provider
                        <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row wow fadeInRight" data-wow-delay="300ms">
                <div className="col-xl-6 mx-auto">
                  <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                    <div>
                      <h4>Let's create your account! </h4>
                      <p className="text mt20">
                        Already have an account?{" "}
                        <Link href="/login" className="text-thm">
                          Log In!
                        </Link>{" "}
                        or{" "}
                        <Link
                          className="text-thm"
                          href=""
                          onClick={() => setAccType("")}
                        >
                          Back to account type?
                        </Link>
                      </p>
                    </div>
                    <div className="mb30">
                      <p className="text"></p>
                    </div>
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={userObj.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={userObj.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb15">
                      <label className="form-label fw500 dark-color">
                        Password
                      </label>
                      <span className="password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          value={userObj.password}
                          onChange={handleInputChange}
                        />
                        <span
                          className="input-group-text"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        >
                          <Image
                            height={25}
                            width={25}
                            src={
                              showPassword
                                ? "/images/eye-hidden.png"
                                : "/images/eye.png"
                            }
                            alt="right-bottom"
                          />
                        </span>
                      </span>
                    </div>
                    <div className="d-grid mb20">
                      <button
                        className="ud-btn btn-thm default-box-shadow2"
                        type="button"
                        onClick={() => createAccount()}
                      >
                        Create Account <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                    {/* <div className="hr_content mb20">
                      <hr />
                      <span className="hr_top_text">OR</span>
                    </div>
                    <div className="d-md-flex justify-content-between">
                      <button
                        className="ud-btn btn-fb fz14 fw400 mb-2 mb-md-0"
                        type="button"
                      >
                        <i className="fab fa-facebook-f pr10" /> Continue
                        Facebook
                      </button>
                      <button
                        className="ud-btn btn-google fz14 fw400 mb-2 mb-md-0"
                        type="button"
                      >
                        <i className="fab fa-google" /> Continue Google
                      </button>
                      <button
                        className="ud-btn btn-apple fz14 fw400"
                        type="button"
                      >
                        <i className="fab fa-apple" /> Continue Apple
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
