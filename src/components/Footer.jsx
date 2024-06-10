import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FormattedMessage } from "react-intl";

const Footer = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );

  return (
    <footer className="bg-[#f3f6fa]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b border-[#059473] py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-[190px] h-[70px] bg-cover object-cover rounded-xl"
              src="https://down-bs-vn.img.susercontent.com/fd3039e6db1f0b7a44febfec19ae8e88_tn.webp"
              alt="logo"
            />
            <ul className="flex font-semibold flex-col gap-2 text-slate-600">
              <li>
                <FormattedMessage id="home-footer.address" />: Ha Noi, Viet Nam
              </li>
              <li>
                {" "}
                <FormattedMessage id="home-footer.phone" /> : 0389059365
              </li>
              <li>Email : support@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2">Usefull Links </h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-600 text-sm font-semibold">
                  <li>
                    <Link>About Us </Link>
                  </li>
                  <li>
                    <Link>About Our Shop </Link>
                  </li>
                  <li>
                    <Link>Delivery Information </Link>
                  </li>
                  <li>
                    <Link>Privacy Policy </Link>
                  </li>
                  <li>
                    <Link>Blogs </Link>
                  </li>
                </ul>

                <ul className="flex flex-col gap-2 text-slate-600 text-sm font-semibold">
                  <li>
                    <Link>Our Service </Link>
                  </li>
                  <li>
                    <Link>Company Profile</Link>
                  </li>
                  <li>
                    <Link>Delivery Information </Link>
                  </li>
                  <li>
                    <Link>Privacy Policy </Link>
                  </li>
                  <li>
                    <Link>Blogs </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Join Our Shop</h2>
            <span>
              Get Email updates about tour latest and shop specials offers
            </span>
            <div className="h-[50px] w-full bg-white  rounded-xl border relative">
              <input
                className="h-full bg-transparent w-full px-4 outline-0"
                type="text"
                placeholder="Enter Your Email"
              />
              <button className="h-full absolute right-0 rounded-xl bg-[#059473] text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>
            <ul className="flex justify-start items-center gap-3">
              <li>
                <a
                  className="duration-200 w-[38px] h-[38px] hover:bg-blue-700 hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaFacebookF />
                </a>
              </li>

              <li>
                <a
                  className="duration-200 w-[38px] h-[38px] hover:bg-slate-500 hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  className="duration-200 w-[38px] h-[38px] hover:bg-orange-700 hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  className="duration-200 w-[38px] h-[38px] hover:bg-black hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>
          <FormattedMessage id="home-footer.copyright" />
        </span>
      </div>

      <div className="hidden fixed md-lg:block w-[50px] h-[110px] bottom-3 right-2 bg-white rounded-full p-2">
        <div className="w-full h-full flex gap-3 flex-col justify-center items-center">
          <div
            onClick={() => navigate(userInfo ? "/card" : "/login")}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-green-500">
              <FaCartShopping />
            </span>
            {card_product_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {card_product_count}
              </div>
            )}
          </div>

          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-green-500">
              <FaHeart />
            </span>
            {wishlist_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
