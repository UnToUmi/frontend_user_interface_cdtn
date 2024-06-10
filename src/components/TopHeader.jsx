import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaLock,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdPhonePortrait,
} from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { messageClear, setLanguageGlobal } from "../store/reducers/authReducer";
import toast from "react-hot-toast";

const TopHeader = () => {
  const dispatch = useDispatch();
  const { userInfo, locale, successMessage } = useSelector(
    (state) => state.auth
  );
  const [showLanguage, setShowLanguage] = useState(false);
  const toggleLanguageMenu = () => {
    setShowLanguage(!showLanguage);
  };

  // console.log("language", language);

  const selectLanguage = (lang) => {
    dispatch(setLanguageGlobal(lang));
    setShowLanguage(false);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);
  return (
    <div className="header-top transition-all duration-200 sticky z-50 top-0  bg-[#caddff] md-lg:hidden">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className=" flex justify-between items-center h-[50px] text-slate-500">
          <ul className="flex justify-start items-center gap-8 font-semibold text-black">
            <li className="flex  justify-center items-center gap-2 text-sm">
              <MdEmail /> support@gmail.com
            </li>
            <Divider
              sx={{ height: "20px" }}
              color="000000"
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <li className="flex  justify-center items-center gap-2 text-sm">
              <IoMdPhonePortrait /> +(89) 977264 889
            </li>
          </ul>
          <div className="flex items-center gap-5">
            <div className="flex justify-center items-center gap-4 text-black">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaGithub />
              </a>
            </div>
            <Divider
              sx={{ height: "20px" }}
              color="000000"
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <div
              className="flex relative cursor-pointer text-slate-800 text-sm justify-center items-center gap-1"
              onClick={toggleLanguageMenu}
            >
              <img
                src={`${
                  locale === "vi"
                    ? "https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
                    : "https://kenh14cdn.com/thumb_w/660/2017/2-1503128133740.png"
                }`}
                alt=""
                className="w-5 h-3 relative left-1"
              />
              <span className="transition duration-200 relative left-2">
                {showLanguage ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </span>
              <ul
                className={`
                  ${
                    showLanguage ? "visible" : "invisible"
                  } fixed transition-all duration-200 ${
                  showLanguage ? "top-10" : "top-8"
                }  z-10 w-fit rounded-xl text-white p-4 flex flex-col gap-3 bg-black`}
              >
                <li
                  onClick={() => selectLanguage("vi")}
                  className={`${
                    locale === "vi"
                      ? "bg-slate-500 p-2 rounded-xl"
                      : "hover:bg-slate-400 p-2 rounded-xl duration-200"
                  }`}
                >
                  Việt Nam
                </li>
                <Divider
                  sx={{ height: "1px" }}
                  color="#FFFFFF"
                  orientation="horizontal"
                  variant="fullWidth"
                  flexItem
                />
                <li
                  onClick={() => selectLanguage("en")}
                  className={`${
                    locale === "en"
                      ? "bg-slate-500 p-2 rounded-xl"
                      : "hover:bg-slate-400 p-2 rounded-xl duration-200"
                  }`}
                >
                  English
                </li>
              </ul>
            </div>
            <Divider
              sx={{ height: "20px" }}
              color="000000"
              orientation="vertical"
              variant="middle"
              flexItem
            />
            {userInfo && userInfo?.name ? (
              <Link
                className="flex py-2 px-3  cursor-pointer hover:bg-purple-600 hover:text-white duration-200 rounded-xl justify-center items-center gap-2 text-sm text-black"
                to="/dashboard"
              >
                <FaUser /> {userInfo?.name}
              </Link>
            ) : (
              <Link
                className="py-2 px-3 rounded-xl hover:bg-purple-600 hover:text-white duration-200 flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                to="/login"
              >
                <FaLock /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
