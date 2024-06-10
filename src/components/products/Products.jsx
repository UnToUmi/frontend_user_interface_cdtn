import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbCurrencyDong } from "react-icons/tb";

const Products = ({ title, products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex  relative justify-between items-center">
        <div className="text-xl w-fit font-bold text-slate-600">
          {title}
          <div className=" absolute left-3 top-[70%] w-[40%] h-[2px] bg-[#059473] mt-4"></div>
        </div>
        <div className="flex justify-center items-center gap-3 text-slate-600">
          <button
            onClick={() => previous()}
            className="w-[30px] rounded-lg hover:bg-slate-200 h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] hover:bg-slate-200 rounded-lg flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex p-2 gap-8 flex-col-reverse ">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div key={i} className="flex flex-col relative justify-start gap-2">
              {p.map((pl, j) => (
                <Link
                  key={j}
                  className="flex duration-200 border-[2px]  border-white p-2 rounded-xl hover:border-green-600 justify-start items-start"
                  to={`/product/details/${pl.slug}?_id=${pl._id}`}
                >
                  <img
                    className="w-[110px] h-[110px] bg-cover object-cover rounded-xl"
                    src={pl.images[0]}
                    alt=""
                  />
                  {pl.discount > 0 ? (
                    <div className="flex justify-center items-center absolute text-white w-[28px] h-[28px] rounded-full bg-red-500 font-semibold text-xs">
                      {pl.discount}%
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                    <h2 className="font-sans h-[50px]">
                      {pl.name.length > 10
                        ? pl.name.slice(0, 25) + "..."
                        : pl.name}
                    </h2>
                    <div className=" flex text-[#28D45C] items-center mt-2 font-medium">
                      {new Intl.NumberFormat("de-DE").format(
                        (pl.price * (100 - pl.discount)) / 100
                      )}
                      <TbCurrencyDong />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Products;
