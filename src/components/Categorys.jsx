import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FormattedMessage } from "react-intl";

const Categorys = () => {
  const { categorys } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute border-[2px] border-[#7F7F7F] hover:border-[2px] left-1 top-1/2 -translate-y-1/2 hover:bg-white hover:text-black duration-200  text-2xl bg-black/50 text-white rounded-full p-2"
      aria-label="Previous Slide"
    >
      <IoIosArrowBack />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute border-[2px] border-[#7F7F7F] right-1 top-1/2 -translate-y-1/2 hover:bg-white hover:text-black hover:border-[2px] duration-200  text-2xl bg-black/50 text-white rounded-full p-2"
      aria-label="Next Slide"
    >
      <IoIosArrowForward />
    </button>
  );

  return (
    <div className="w-[87%] mx-auto relative">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-3xl text-slate-600 font-bold relative pb-[35px]">
          <h2>
            <FormattedMessage id="home-body.top_category" />
          </h2>
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>

      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {categorys.map((c, i) => (
          <Link
            className="h-[185px] mr-1 border duration-200 hover:border[3px] hover:border-green-800 rounded-xl block"
            key={i}
            to={`/products?category=${c.name}`}
          >
            <div className="w-full h-full relative p-3">
              <img
                className="rounded-xl object-cover w-full h-full"
                src={c.image}
                alt=""
              />
              <div className="absolute bottom-4 w-full mx-auto font-bold left-0 flex justify-center items-center ">
                <span className="py-[2px] px-6 bg-[#3330305d] text-white rounded-xl">
                  {c.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;
