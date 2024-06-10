import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import TopHeader from "../components/TopHeader";
import { FormattedMessage } from "react-intl";
import { user_reset } from "../store/reducers/authReducer";
import { reset_count } from "../store/reducers/cardReducer";
import api from "../api/api";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const { pathname } = useLocation();

  console.log("pathname", pathname);

  const [filterShow, setFilterShow] = useState(false);

  const [isMdLg, setIsMdLg] = useState(window.innerWidth >= 991);

  const handleResize = () => {
    setIsMdLg(window.innerWidth >= 991);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await api.get("/customer/logout");
      localStorage.removeItem("customerToken");
      dispatch(user_reset());
      dispatch(reset_count());
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <TopHeader />
      <Header />
      <div className="bg-slate-200 mt-5 relative ">
        <div className="left-10 top-2 z-50 absolute  w-[90%] mx-auto md-lg:visible invisible">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-green-500 rounded-md text-white"
            >
              <FaList />
            </button>
          </div>
        </div>

        <div className="z-40 ">
          <div className="py-5 z-40 flex w-[90%] mx-auto relative">
            <div
              className={`h-fit rounded-xl z-50 w-[20%] md-lg:absolute  ${
                filterShow && !isMdLg
                  ? "top-14 -left-4 border-[1px] border-slate-700 visible"
                  : !filterShow && !isMdLg
                  ? "top-14 -left-12 invisible"
                  : "md-lg:visible"
              } duration-300 transition-all w-[270px] ml-4 bg-white`}
            >
              <ul className="py-2 text-slate-600 px-4 flex flex-col gap-2">
                <li className="flex justify-start items-center gap-2 py-2 ">
                  <span className="text-xl">
                    <IoIosHome />
                  </span>
                  <Link
                    onClick={() => setFilterShow(!filterShow)}
                    to="/dashboard"
                    className={`block duration-200 hover:border-b-black pb-1 border-b-[1px]  ${
                      pathname === "/dashboard"
                        ? "border-b-black"
                        : "border-b-white"
                    }`}
                  >
                    <FormattedMessage id="home-dashboard.dashboard" />
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <FaBorderAll />
                  </span>
                  <Link
                    onClick={() => setFilterShow(!filterShow)}
                    to="/dashboard/my-orders"
                    className={`block duration-200 hover:border-b-black pb-1 border-b-[1px]  ${
                      pathname === "/dashboard/my-orders"
                        ? "border-b-black"
                        : "border-b-white"
                    }`}
                  >
                    <FormattedMessage id="home-dashboard-my-orders.my_orders" />
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <FaHeart />
                  </span>
                  <Link
                    onClick={() => setFilterShow(!filterShow)}
                    to="/dashboard/my-wishlist"
                    className={`block duration-200 hover:border-b-black pb-1 border-b-[1px] ${
                      pathname === "/dashboard/my-wishlist"
                        ? "border-b-black"
                        : "border-b-white"
                    }`}
                  >
                    <FormattedMessage id="home-dashboard-wishlist.wishlist" />
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <IoChatbubbleEllipsesSharp />
                  </span>
                  <Link
                    onClick={() => setFilterShow(!filterShow)}
                    to="/dashboard/chat"
                    className={`block duration-200 hover:border-b-black pb-1 border-b-[1px] ${
                      pathname === "/dashboard/chat"
                        ? "border-b-black"
                        : "border-b-white"
                    }`}
                  >
                    Chat
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <RiLockPasswordLine />
                  </span>
                  <Link
                    onClick={() => setFilterShow(!filterShow)}
                    to="/dashboard/change-password"
                    className={`block duration-200 hover:border-b-black pb-1 border-b-[1px]  ${
                      pathname === "/dashboard/change-password"
                        ? "border-b-black"
                        : "border-b-white"
                    }`}
                  >
                    <FormattedMessage id="home-dashboard-change-password.change_password" />
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <IoMdLogOut />
                  </span>
                  <Link
                    onClick={logout}
                    to="/dashboard"
                    className="block duration-200 hover:border-b-black pb-1 border-b-[1px] border-b-white"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-[80%] md-lg:w-full md-lg:mt-10">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Dashboard;
