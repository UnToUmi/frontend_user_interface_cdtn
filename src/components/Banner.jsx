import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { get_banners } from "../store/reducers/homeReducer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Banner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.home);

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

  useEffect(() => {
    dispatch(get_banners());
  }, []);

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
      className="absolute border-[2px] border-[#7F7F7F] hover:border-[2px] right-1 top-1/2 -translate-y-1/2 hover:bg-white hover:text-black duration-200  text-2xl bg-black/50 text-white rounded-full p-2"
      aria-label="Next Slide"
    >
      <IoIosArrowForward />
    </button>
  );

  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="my-8">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
              >
                {banners.length > 0 &&
                  banners.map((b, i) => (
                    <Link
                      key={i}
                      to={`product/details/${b.link}?_id=${b.productId}`}
                    >
                      <img
                        src={b.banner}
                        className="rounded-xl object-cover overflow-hidden bg-cover w-full h-[500px]"
                        alt=""
                      />
                    </Link>
                  ))}
                {/* {[1, 2, 3, 4, 5, 6].map((img, i) => (
                  <Link key={i} to="#">
                    <img
                      className="rounded-xl object-cover overflow-hidden bg-cover w-full h-[500px]"
                      src="https://down-bs-vn.img.susercontent.com/fd3039e6db1f0b7a44febfec19ae8e88_tn.webp"
                      alt=""
                    />
                  </Link>
                ))} */}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
