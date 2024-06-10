import React, { useEffect, useState } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { TbCurrencyDong } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  remove_wishlist,
} from "../../store/reducers/cardReducer";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [isMdLg, setIsMdLg] = useState(window.innerWidth < 768);
  const { wishlist, successMessage } = useSelector((state) => state.card);
  const handleResize = () => {
    setIsMdLg(window.innerWidth < 768);
  };
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRemoveWishlist = (wishlistId, userId) => {
    const data = { userId, wishlistId };
    dispatch(remove_wishlist(data));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  return (
    <div
      className={` ${
        wishlist.length > 0
          ? "grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          : ""
      } w-full  gap-6 relative`}
    >
      {wishlist.length > 0 ? (
        wishlist.map((p, i) => (
          <div
            key={i}
            className={`group flex relative p-5 hover:shadow-xl transition-all duration-500 border-[2px] border-[#059473]/20 hover:border-[2px] hover:border-[#059473]  hover:-translate-y-3 flex-col justify-start items-start 
           w-full gap-4 bg-white  rounded-xl`}
          >
            <div
              onClick={() => {
                handleRemoveWishlist(p._id, userInfo.id);
              }}
              className="hidden  group-hover:right-2  group-hover:flex hover:bg-red-400 duration-200 cursor-pointer transition-all absolute top-2  text-white items-center justify-center z-10 w-5 h-5 rounded-full bg-red-500 "
            >
              <span className="absolute z-20 cursor-pointer -top-[4px] right-[6px] text-white">
                x
              </span>
            </div>

            <div
              className={
                "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
              }
            >
              <img
                className=" h-full rounded-xl md:h-[270px] xs:h-[170px] w-full overflow-hidden bg-cover object-cover"
                src={p.image}
                alt=""
              />

              {p.discount > 0 ? (
                <div className="absolute flex items-center justify-center z-50 w-[40px] h-[40px] bg-red-500 text-white top-1 right-1 rounded-full">
                  -{p.discount}%
                </div>
              ) : (
                <div></div>
              )}

              <ul className=" flex transition-all duration-700 -bottom-20 justify-center items-center gap-2 absolute w-full group-hover:bottom-5">
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-pink-600 hover:text-white hover:rotate-[720deg] duration-400 transition-all">
                  <FaRegHeart />
                </li>
                <Link
                  to={`/product/details/${p.slug}?_id=${p.productId}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] duration-400 transition-all"
                >
                  <FaEye />
                </Link>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] duration-400 transition-all">
                  <RiShoppingCartLine />
                </li>
              </ul>
            </div>

            <div className="w-full relative flex flex-col h-fit py-3 text-slate-600 px-2">
              <div
                className={`
                  w-[60%] right-1/2 translate-x-1/2  top-1 border-[1px] border-[#059473] absolute  `}
              ></div>
              <h2 className="font-bold h-[50px] overflow-hidden">{p.name} </h2>
              <div className="flex h-[20px] justify-between items-center w-full gap-5 mt-3">
                <div className=" flex text-[#28D45C] items-center  font-medium w-[40%]">
                  {new Intl.NumberFormat("de-DE").format(p.price)}
                  <TbCurrencyDong />
                </div>
                <div className="flex items-center w-[60%] ">
                  {isMdLg && (
                    <span className="relative -left-2">{`Rating: `}</span>
                  )}

                  <Rating ratings={p.rating} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="absolute text-red-600 translate-x-1/2 right-1/2 translate-y-10 md-lg:-translate-y-10">
          Your wishlist is empty! Please add some product which you like it
          <Link
            className="md-lg:-bottom-8 -bottom-10 cursor-pointer hover:bg-[#059473]/80 duration-200 absolute right-1/2 translate-x-1/2  px-4 rounded-xl py-1 bg-[#059473] text-white"
            to="/"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
