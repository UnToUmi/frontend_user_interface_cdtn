import React from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { TbCurrencyDong } from "react-icons/tb";
import { Link } from "react-router-dom";

const ShopProducts = ({ styles, products }) => {
  // const limitedProducts = products.slice(0, 2);

  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-4 `}
    >
      {/* {limitedProducts.map((p, i) => ( */}
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex p-5 hover:shadow-xl transition-all duration-500 border-[2px] border-[#059473]/20 hover:border-[2px] hover:border-[#059473]  hover:-translate-y-3 ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded-xl`}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }
          >
            <img
              className=" h-full rounded-xl md:h-[270px] xs:h-[170px] w-full overflow-hidden bg-cover object-cover"
              src={p.images[0]}
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
                to={`/product/details/${p.slug}?_id=${p._id}`}
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
              className={`${
                styles === "grid"
                  ? "w-[60%] right-1/2 translate-x-1/2  top-1 border-[1px] border-[#059473]"
                  : "h-[140px] top-1/2 -translate-y-1/2 -left-1  border-[1px] border-[#059473]"
              } absolute  `}
            ></div>
            <h2 className="font-bold h-[50px]">
              {p.name.length > 15 ? p.name.slice(0, 45) + "..." : p.name}
            </h2>
            <div className="flex h-[20px] justify-between items-center">
              <div className=" flex text-[#28D45C] items-center mt-2 font-medium">
                {new Intl.NumberFormat("de-DE").format(p.price)}
                <TbCurrencyDong />
              </div>
              <div className="flex items-center ">
                <span className="md-lg:hidden relative -left-2">{`Rating: `}</span>
                <Rating ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
