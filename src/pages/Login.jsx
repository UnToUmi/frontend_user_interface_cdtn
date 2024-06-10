import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import TopHeader from "../components/TopHeader";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { customer_login, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import { FormattedMessage } from "react-intl";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, userInfo, locale } =
    useSelector((state) => state.auth);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });

    if (value.trim() === "") {
      setErrors({
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const login = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(customer_login(state));
      if (successMessage) {
        setState({
          email: "",
          password: "",
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ["email", "password"];

    fields.forEach((field) => {
      if (!state[field].trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required!`;
      } else if (field === "email" && !state[field].endsWith("@gmail.com")) {
        newErrors[field] = " Email tail must be @gmail.com";
      }
    });

    return newErrors;
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      <TopHeader />
      <Header />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid  grid-cols-2 md-lg:grid-cols-1 w-[60%] mx-auto bg-white rounded-xl">
            <div className="px-8 py-8">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">
                <FormattedMessage id="home-login.login" />
              </h2>

              <div>
                <form onSubmit={login} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-7 w-full relative">
                    <label
                      htmlFor="email"
                      className={` ${
                        errors.email ? "text-red-500" : "text-black"
                      } `}
                    >
                      <FormattedMessage id="home-login.email" />*
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.email}
                      type="text"
                      className={`duration-200 w-full px-3 py-2 border ${
                        errors.email
                          ? "border-red-500 placeholder-red-500"
                          : "border-slate-200"
                      } outline-none focus:border-green-500 rounded-xl`}
                      name="email"
                      id="email"
                      placeholder={
                        locale === "vi" ? "Nhập email" : "Enter your email"
                      }
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm left-4 absolute top-[105%]">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 mb-7 w-full relative">
                    <label
                      htmlFor="password"
                      className={` ${
                        errors.password ? "text-red-500" : "text-black"
                      } `}
                    >
                      <FormattedMessage id="home-login.password" />*
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.password}
                      type="text"
                      className={`duration-200 w-full px-3 py-2 border ${
                        errors.password
                          ? "border-red-500 placeholder-red-500"
                          : "border-slate-200"
                      } outline-none focus:border-green-500 rounded-xl`}
                      name="password"
                      id="password"
                      placeholder={
                        locale === "vi"
                          ? "Nhập mật khẩu"
                          : "Enter your password"
                      }
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm left-4 absolute top-[105%]">
                        {errors.password}
                      </span>
                    )}
                  </div>

                  <button
                    disabled={loader}
                    className={`${
                      loader ? "cursor-not-allowed opacity-50" : ""
                    } mt-5 px-8 w-full py-3 overflow-hidden bg-[#059473]  hover:bg-[#059473]/80 duration-200 text-white rounded-xl`}
                  >
                    {loader ? (
                      <PulseLoader speedMultiplier={0.9} color="white" />
                    ) : (
                      <FormattedMessage id="home-login.login" />
                    )}
                  </button>
                </form>
                <div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                  <span className="px-3 text-slate-600">
                    <FormattedMessage id="home-login.or" />
                  </span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                </div>

                <button className="px-8 w-full py-2 bg-blue-600 shadow hover:bg-blue-500 duration-200 rounded-xl flex justify-center items-center gap-2 mb-3">
                  <span className="w-fit h-fit p-2 text-blue-600 bg-white rounded-full te">
                    <FaFacebookF />
                  </span>
                  <span className="text-white">
                    <FormattedMessage id="home-login.login_with_facebook" />
                  </span>
                </button>
                <button className="px-8 w-full py-2 bg-orange-600 shadow hover:bg-orange-500 duration-200  rounded-xl flex justify-center items-center gap-2 mb-3">
                  <span className="w-fit h-fit p-2 text-orange-600 bg-white rounded-full te">
                    <FaGoogle />
                  </span>
                  <span className="text-white">
                    <FormattedMessage id="home-login.login_with_google" />
                  </span>
                </button>
              </div>
              <div className="text-center text-slate-600 pt-1 ">
                <p>
                  <FormattedMessage id="home-login.have_account" />
                  <Link
                    className="text-blue-500 hover:bg-blue-200 rounded-xl ml-3 text-center px-2 py-1 duration-200 "
                    to="/register"
                  >
                    <FormattedMessage id="home-login.register" />
                  </Link>
                </p>
              </div>
              <a target="_blank" href="http://localhost:3001/login">
                <div className="mt-4 px-8 w-full py-2 bg-purple-600  hover:bg-purple-500 duration-200 text-white rounded-xl flex justify-center items-center gap-2 mb-3">
                  Login As a Seller
                </div>
              </a>

              <a target="_blank" href="http://localhost:3001/register">
                <div className="px-8 w-full py-2 bg-[#ad2cc4] shadow hover:bg-[#ad2cc4]/80 duration-200 text-white rounded-xl flex justify-center items-center gap-2 mb-3">
                  Register As a Seller
                </div>
              </a>
            </div>
            <div className="w-full h-full py-4 pr-4 md-lg:hidden">
              <img
                className="w-full h-full object-cover rounded-xl "
                src="http://localhost:3000/images/login.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Login;
