import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import {
  IoIosArrowUp,
  IoMdArrowDropup,
  IoMdPhonePortrait,
} from "react-icons/io";
import { FaFacebookF, FaList, FaLock, FaUser } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  get_card_products,
  get_wishlist_products,
} from "../store/reducers/cardReducer";
import { FormattedMessage } from "react-intl";
import { setLanguageGlobal } from "../store/reducers/authReducer";
import { toast } from "react-hot-toast";
import { Divider } from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.home);
  const { userInfo, locale } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );

  const { pathname } = useLocation();

  const [showShidebar, setShowShidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const [showLanguage, setShowLanguage] = useState(false);

  const toggleLanguageMenu = () => {
    setShowLanguage(!showLanguage);
  };

  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`);
  };

  const redirect_card_page = () => {
    if (userInfo) {
      navigate("/card");
    } else {
      navigate("/login");
    }
  };

  const redirect_wishlists_page = () => {
    if (userInfo) {
      navigate("/dashboard/my-wishlist");
    } else {
      navigate("/login");
      toast.error(changeToast());
    }
  };

  const changeToast = () => {
    if (locale === "vi") {
      return "Bạn phải đăng nhập trước!";
    } else return "You must login first!";
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(get_card_products(userInfo.id));
      dispatch(get_wishlist_products(userInfo.id));
    }
  }, [userInfo]);

  const selectLanguage = (lang) => {
    dispatch(setLanguageGlobal(lang));
    setShowLanguage(false);
  };

  return (
    <div className="w-full bg-white">
      <div className="w-white ">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img
                    className="h-[80px] my-3 rounded-xl w-[200px] object-cover"
                    src="https://down-bs-vn.img.susercontent.com/fd3039e6db1f0b7a44febfec19ae8e88_tn.webp"
                    alt=""
                  />
                </Link>
                <div
                  className={`justify-center items-center w-[45px]  h-[40px] text-white
                   hover:bg-[#059473]/80  bg-[#059473] rounded-xl cursor-pointer lg:hidden md-lg:flex xl:hidden hidden `}
                  onClick={() => setShowShidebar(false)}
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>

            <div className="md:lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      to={"/"}
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#059473]" : "text-slate-600"
                      } `}
                    >
                      <FormattedMessage
                        id="home-header.home"
                        // defaultMessage={"Home"}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shops"
                      className={`p-2 block ${
                        pathname === "/shops"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      } `}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/blog"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      } `}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      } `}
                    >
                      <FormattedMessage
                        id="home-header.about_us"
                        defaultMessage={"about us"}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      } `}
                    >
                      <FormattedMessage
                        id="home-header.contact_us"
                        defaultMessage={"contact us"}
                      />
                    </Link>
                  </li>
                </ul>
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <div
                      onClick={redirect_wishlists_page}
                      className="relative flex justify-center items-center cursor-pointer
                     w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-green-500">
                        <FaHeart />
                      </span>
                      {wishlist_count === 0 ? (
                        ""
                      ) : (
                        <div
                          className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white
                       flex justify-center items-center -top-[3px] -right-[5px] "
                        >
                          {wishlist_count}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={redirect_card_page}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-green-500">
                        <FaCartShopping />
                      </span>
                      {card_product_count !== 0 && (
                        <div
                          className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white
                       flex justify-center items-center -top-[3px] -right-[5px] "
                        >
                          {card_product_count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowShidebar(true)}
          className={`fixed duration-200 transition-all ${
            showShidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 `}
        ></div>

        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showShidebar ? "-left-[300px]" : "left-0 top-0"
          } overflow-y-auto bg-white h-screen py-6 px-8 `}
        >
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <img
                className="h-[80px] mt-3 rounded-xl w-[200px] object-cover"
                src="https://down-bs-vn.img.susercontent.com/fd3039e6db1f0b7a44febfec19ae8e88_tn.webp"
                alt=""
              />
            </Link>
            <div className="flex justify-start items-center gap-10">
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
                    !showShidebar && showLanguage ? "visible" : "invisible"
                  } absolute transition-all duration-200 ${
                    !showShidebar && showLanguage ? "top-[20px]" : "top-[26px]"
                  }  w-[120px] -left-7 rounded-xl text-white p-4 flex flex-col gap-3 bg-black`}
                >
                  <li
                    onClick={() => selectLanguage("vi")}
                    className={`w-fit ${
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
              {userInfo ? (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  to="/dashboard"
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>{userInfo.name} </span>
                </Link>
              ) : (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  to="/login"
                >
                  <span>
                    <FaLock />
                  </span>
                  <span>Login </span>
                </Link>
              )}
            </div>

            <ul className="flex flex-col justify-start items-start text-sm font-bold uppercase">
              <li>
                <Link
                  to={"/"}
                  className={`py-2 block ${
                    pathname === "/" ? "text-[#059473]" : "text-slate-600"
                  } `}
                >
                  <FormattedMessage
                    id="home-header.home"
                    defaultMessage={"Home"}
                  />
                </Link>
              </li>
              <li>
                <Link
                  to={"/shops"}
                  className={`py-2 block ${
                    pathname === "/shops" ? "text-[#059473]" : "text-slate-600"
                  } `}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/blog" ? "text-[#059473]" : "text-slate-600"
                  } `}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/about" ? "text-[#059473]" : "text-slate-600"
                  } `}
                >
                  <FormattedMessage
                    id="home-header.about_us"
                    defaultMessage={"about us"}
                  />
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/contact"
                      ? "text-[#059473]"
                      : "text-slate-600"
                  } `}
                >
                  <FormattedMessage
                    id="home-header.contact_us"
                    defaultMessage={"contact us"}
                  />
                </Link>
              </li>
            </ul>
            <div className="flex justify-start items-center gap-4 text-black">
              <a
                className="duration-200 w-[38px] h-[38px] hover:bg-blue-700 hover:text-white flex justify-center items-center bg-white rounded-full"
                href="#"
              >
                <FaFacebookF />
              </a>

              <a
                className="duration-200 w-[38px] h-[38px] hover:bg-slate-500 hover:text-white flex justify-center items-center bg-white rounded-full"
                href="#"
              >
                <FaTwitter />
              </a>
              <a
                className="duration-200 w-[38px] h-[38px] hover:bg-orange-700 hover:text-white flex justify-center items-center bg-white rounded-full"
                href="#"
              >
                <FaLinkedin />
              </a>
              <a
                className="duration-200 w-[38px] h-[38px] hover:bg-black hover:text-white flex justify-center items-center bg-white rounded-full"
                href="#"
              >
                <FaGithub />
              </a>
            </div>
            <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center ">
                <span>
                  <FaPhoneAlt />
                </span>
              </div>
              <div className="flex justify-end flex-col gap-1">
                <h2 className="text-sm font-medium text-slate-700">
                  +134343455
                </h2>
                <span className="text-xs">
                  <FormattedMessage
                    id="home-header.support"
                    defaultMessage={"Support 24/7"}
                  />
                </span>
              </div>
            </div>
            <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex justify-start items-center gap-2 text-sm">
                <span>
                  <MdEmail />
                </span>
                <span>support@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] lg:w-[90%] mx-auto mt-6 pb-6 ">
        <div className="flex w-full flex-wrap md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className={`
                duration-200
                ${
                  !categoryShow ? "rounded-t-xl" : "rounded-xl"
                }  h-[50px] bg-[#059473] text-white flex justify-center md-lg:justify-between md-lg:px-6 
                items-center gap-3 font-bold text-md cursor-pointer`}
              >
                <div className=" flex justify-center items-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>
                    <FormattedMessage
                      id="home-header.all_category"
                      defaultMessage={"All Category"}
                    />
                  </span>
                </div>
                <span className="pt-1 duration-500 transition-all">
                  {!categoryShow ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              <div
                className={`${
                  categoryShow ? "h-0" : "h-[300px]"
                } rounded-b-xl overflow-y-scroll transition-all md-lg:relative duration-500 absolute z-[99999] bg-[#dbf3ed] w-full border-x`}
              >
                <ul className="py-2 text-slate-600 font-medium  ">
                  {categorys.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px] h-[60px]"
                      >
                        <img
                          src={c.image}
                          className="w-[30px] h-[30px] rounded-full  object-cover"
                          alt=""
                        />
                        <div
                          onClick={() => setCategoryShow(!categoryShow)}
                          className=" w-full h-full hover:bg-green-400 rounded-xl duration-200 px-3"
                        >
                          <Link
                            to={`/products?category=${c.name}`}
                            className="text-sm  w-full h-full flex items-center justify-start"
                          >
                            {c.name}
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className=" w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full">
                <div className="flex border rounded-xl h-[50px] items-center relative gap-6">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-[150px] rounded-xl text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none"
                      name=""
                      id=""
                    >
                      <option value="">
                        <FormattedMessage
                          id="home-header.select_category"
                          defaultMessage={"Select Category"}
                        />
                      </option>
                      {categorys.map((c, i) => (
                        <option key={i} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    className="w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full"
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    placeholder={
                      locale === "vi"
                        ? "Bạn muốn tìm gì hôm nay?"
                        : "What do you want?"
                    }
                  />
                  <button
                    onClick={search}
                    className="bg-[#059473] rounded-xl right-0 absolute px-8 h-full font-semibold uppercase text-white"
                  >
                    <FormattedMessage
                      id="home-header.search"
                      defaultMessage={"search"}
                    />
                  </button>
                </div>
              </div>

              <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
                <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
                  <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center ">
                    <span>
                      <FaPhoneAlt />
                    </span>
                  </div>
                  <div className="flex justify-end flex-col gap-1">
                    <h2 className="text-md font-medium text-slate-700">
                      +1343-43233455
                    </h2>
                    <span className="text-sm">
                      <FormattedMessage
                        id="home-header.support"
                        defaultMessage={"support 24/7"}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
