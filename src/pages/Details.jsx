import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Rating from "../components/Rating";
import { FaHeart } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import TopHeader from "../components/TopHeader";
import { TbCurrencyDong } from "react-icons/tb";
import Reviews from "../components/Reviews";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_products,
  get_reviews,
  product_details,
  totalReview,
} from "../store/reducers/homeReducer";
import { FormattedMessage } from "react-intl";
import toast from "react-hot-toast";
import {
  add_to_card,
  add_to_wishlist,
  messageClear,
} from "../store/reducers/cardReducer";

const Details = () => {
  // const { slug } = useParams();
  // const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("_id");

  // console.log("productId", productId);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { product, loader, relatedProducts, moreProducts, totalReview } =
    useSelector((state) => state.home);
  // console.log("product", product);
  const { successMessage, errorMessage } = useSelector((state) => state.card);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = product?.description || "";
  const words = description.split(" ");
  const isLongDescription = words.length > 150;
  const truncatedDescription = words.slice(0, 150).join(" ") + "...";

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(product_details(productId));
  }, [productId]);

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setImage(product.images[0]);
    }
  }, [product.images]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const [quantity, setQuantity] = useState(1);
  const increase = () => {
    if (quantity >= product.stock) {
      toast.error("Out of Stock!");
    } else {
      setQuantity(quantity + 1);
    }
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.error("Product quantity must be greater than 0!");
    }
  };

  const add_wishlist = (product) => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0] || "",
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      navigate("/login");
      toast.error("You must login first!");
    }
  };

  const add_cart = () => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity,
          productId: product._id,
        })
      );
    } else {
      navigate("/login");
      toast.error("You must login first!");
    }
  };

  const [image, setImage] = useState("");
  // console.log("image", image);
  const discount = 20;
  const stock = 3;
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
  const [state, setState] = useState("reviews");

  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-1 top-1/2 -translate-y-1/2 hover:bg-white hover:text-black duration-200  text-2xl bg-black/50 text-white rounded-full p-2"
      aria-label="Previous Slide"
    >
      <IoIosArrowBack />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-white hover:text-black duration-200  text-2xl bg-black/50 text-white rounded-full p-2"
      aria-label="Next Slide"
    >
      <IoIosArrowForward />
    </button>
  );

  const handleLinkClick = (e, p) => {
    e.preventDefault();
    window.scrollTo({
      top: 430,
      behavior: "smooth",
    });
    setTimeout(() => {
      navigate(`/product/details/${p.slug}?_id=${p._id}`);
    }, 500);
  };

  const buyNow = () => {
    let price = 0;
    if (product.discount !== 0) {
      price =
        product.price - Math.floor((product.price * product.discount) / 100);
    } else {
      price = product.price;
    }

    const obj = [
      {
        sellerId: product.sellerId,
        shopName: product.shopName,
        price: quantity * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            quantity,
            productInfo: product,
          },
        ],
      },
    ];

    navigate("/shipping", {
      state: {
        from: "buy_now",
        products: obj,
        price: price * quantity,
        shipping_fee: 50,
        items: 1,
      },
    });
  };

  return (
    <div>
      <TopHeader />
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">
                <FormattedMessage id="header-page.product_details_page" />
              </h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link
                  to="/"
                  className="text-[30px] border-b-[2px] transition-all duration-200 border-transparent hover:border-b-[2px] hover:border-white "
                >
                  <FormattedMessage id="header-page.home" />
                </Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>
                  <FormattedMessage id="header-page.product_details" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-slate-100 py-5 mb-5">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex justify-start items-center gap-3 text-md text-slate-600 w-full">
              <Link
                to="/"
                className=" border-b-[2px] transition-all duration-200 border-transparent hover:border-b-[2px] hover:border-slate-600 "
              >
                <FormattedMessage id="header-page.home" />
              </Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <Link
                to={`/products?category=${product.category}`}
                className=" border-b-[2px] transition-all duration-200 border-transparent hover:border-b-[2px] hover:border-slate-600 "
              >
                {product.category}
              </Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <span>{product.name} </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="grid grid-rows-1 grid-cols-2 md-lg:grid-cols-1 gap-9 relative">
            <div>
              <div className="p-5 border rounded-xl">
                <img
                  className={`h-[600px] w-full object-cover rounded-xl`}
                  src={
                    image || (product.images ? product.images[0] : "No image")
                  }
                  alt=""
                />
              </div>
              <div className="py-3 overflow-hidden">
                {product.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                  >
                    {product.images.map((img, i) => {
                      // console.log("images", img);
                      return (
                        <div
                          className="ml-3"
                          key={i}
                          onClick={() => setImage(img)}
                        >
                          <img
                            className={`${
                              img === image
                                ? "border-green-600"
                                : "border-white"
                            } duration-200 h-[120px] cursor-pointer hover:border-green-600 border-[2px] p-1  bg-cover object-cover rounded-xl`}
                            src={img}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
            <div className="md-lg:invisible absolute border-l-[2px] translate-y-1/2 bottom-1/2 translate-x-1/2 right-1/2 border-green-700 w-[1px] h-[80%]"></div>

            <div className="flex flex-col gap-5">
              <div className="text-3xl text-slate-600 font-bold">
                <h3>{product.name} </h3>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Rating ratings={product.rating} />
                </div>
                <span className="text-green-500">
                  {`(${totalReview === 0 ? 0 : totalReview} `}
                  <FormattedMessage id="details-body.reviews" />
                  {")"}
                </span>
              </div>
              <div className="relative text-2xl text-black font-bold flex gap-3 border">
                {product.discount !== 0 ? (
                  <>
                    <FormattedMessage id="details-body.price" /> :
                    <div className=" flex text-[#28D45C] items-center   font-medium">
                      {new Intl.NumberFormat("de-DE").format(
                        product.price -
                          Math.floor((product.price * discount) / 100)
                      )}
                      <TbCurrencyDong />
                    </div>
                    <div className=" flex text-red-600 items-center line-through  font-medium">
                      {new Intl.NumberFormat("de-DE").format(product.price)}
                      <TbCurrencyDong />
                    </div>
                    <div className="text-lg flex items-center justify-center -left-4  -top-5 relative text-red-600">{`-${product.discount}%`}</div>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <h2>
                      <FormattedMessage id="details-body.price" />:{" "}
                    </h2>
                    <div className=" flex text-[#28D45C] items-center  font-medium">
                      {new Intl.NumberFormat("de-DE").format(product.price)}
                      <TbCurrencyDong />
                    </div>
                  </div>
                )}
              </div>
              <div className="text-slate-600 flex flex-col gap-3">
                <p>
                  {showFullDescription || !isLongDescription
                    ? description
                    : truncatedDescription}
                </p>
                {isLongDescription && (
                  <button
                    onClick={toggleDescription}
                    className="text-blue-500 hover:bg-blue-400 hover:text-white duration-200 px-3 py-2 w-full rounded-xl relative translate-x-1/2 right-1/2"
                  >
                    {showFullDescription ? "See Less" : "See More"}
                  </button>
                )}
                <p className="text-slate-600 py-1 font-bold">
                  Shop Name : {product.shopName}
                </p>
              </div>
              <div className="flex items-center justify-start gap-3 pb-10 border-b">
                {stock ? (
                  <>
                    <div className="flex gap-2  h-[50px] justify-center items-center text-xl">
                      <div
                        onClick={decrease}
                        className="flex h-full w-fit items-center justify-center px-4 duration-200 hover:bg-slate-300  rounded-xl bg-slate-200 cursor-pointer"
                      >
                        -
                      </div>
                      <div className="px-3">{quantity}</div>
                      <div
                        onClick={increase}
                        className="h-full w-fit flex items-center justify-center px-4 rounded-xl duration-200 hover:bg-slate-300 bg-slate-200 cursor-pointer"
                      >
                        +
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={add_cart}
                        className="px-8 py-3 h-[50px] cursor-pointer hover:bg-green-500 bg-green-600 duration-200 rounded-xl text-white"
                      >
                        <FormattedMessage id="details-body.add_to_cart" />
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  <div
                    onClick={() => add_wishlist(product)}
                    className="h-[50px] w-[50px] flex justify-center duration-200 rounded-xl items-center cursor-pointer hover:bg-pink-500  bg-pink-600 text-white"
                  >
                    <FaHeart />
                  </div>
                </div>
              </div>

              <div className="flex py-5 gap-5">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>
                    <FormattedMessage id="details-body.availability" />
                  </span>
                  <span>
                    <FormattedMessage id="details-body.share_on" />
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <span
                    className={`text-${product.stock ? "green" : "red"}-500`}
                  >
                    {product.stock ? (
                      <div className="flex gap-2">
                        <span>
                          <FormattedMessage id="details-body.in_stock" />
                        </span>
                        <span>
                          {new Intl.NumberFormat("de-DE").format(product.stock)}
                        </span>
                      </div>
                    ) : (
                      <FormattedMessage id="details-body.out_of_stock" />
                    )}
                  </span>

                  <ul className="flex justify-start items-center gap-3">
                    <li>
                      <a
                        className="duration-200 w-[38px] h-[38px] hover:bg-blue-700 hover:text-white flex justify-center items-center bg-blue-600 rounded-full"
                        href="#"
                      >
                        <FaFacebookF />
                      </a>
                    </li>

                    <li>
                      <a
                        className="duration-200 w-[38px] h-[38px] hover:bg-slate-500 hover:text-white flex justify-center items-center bg-slate-400 rounded-full"
                        href="#"
                      >
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a
                        className="duration-200 w-[38px] h-[38px] hover:bg-orange-700 hover:text-white flex justify-center items-center bg-orange-600 rounded-full"
                        href="#"
                      >
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a
                        className="duration-200 w-[38px] h-[38px] hover:bg-black hover:text-white flex justify-center items-center bg-slate-400 rounded-full"
                        href="#"
                      >
                        <FaGithub />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                {product.stock ? (
                  <button
                    onClick={() => buyNow()}
                    className="px-8 py-3 h-[50px] cursor-pointer hover:bg-blue-400 duration-200 bg-blue-500 text-white rounded-xl"
                  >
                    <FormattedMessage id="details-body.buy_now" />
                  </button>
                ) : (
                  ""
                )}
                <Link
                  to={`/dashboard/chat/${product.sellerId}`}
                  className="px-8 py-3 h-[50px] cursor-pointer rounded-xl duration-200 hover:bg-red-400 bg-red-500 text-white"
                >
                  <FormattedMessage id="details-body.chat_seller" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-5 w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 hover:text-white px-5 duration-300 hover:bg-[#059473]/80 ${
                      state === "reviews"
                        ? "bg-[#059473] text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-xl`}
                  >
                    <FormattedMessage id="details-body.reviews" />
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 hover:text-white px-5 duration-300 hover:bg-[#059473]/80 ${
                      state === "description"
                        ? "bg-[#059473] text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-xl`}
                  >
                    <FormattedMessage id="details-body.description" />
                  </button>
                </div>
                <div className="py-5">
                  {state === "reviews" ? (
                    <Reviews product={product} />
                  ) : (
                    <p className="py-5 text-slate-600">{product.description}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-2 text-slate-600 bg-slate-200 rounded-xl">
                  <div className="font-bold flex gap-2">
                    <span>
                      <FormattedMessage id="details-body.from" />
                    </span>
                    <span>{product.shopName}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-5 mt-3">
                  {moreProducts.map((p, i) => {
                    return (
                      <Link
                        onClick={(e) => handleLinkClick(e, p)}
                        to={`/product/details/${p.slug}?_id=${p._id}`}
                        className="flex flex-col border-[2px] p-4 rounded-xl hover:border-[2px] hover:-translate-y-1 duration-200 hover:shadow-xl hover:border-green-600"
                      >
                        <div className="relative h-[270px]">
                          <img
                            className="w-full h-full object-cover rounded-xl"
                            src={p.images[0]}
                            alt=""
                          />
                          {p.discount !== 0 && (
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-sm right-2 top-2">
                              {p.discount}%
                            </div>
                          )}
                        </div>
                        <h2 className="text-slate-600 py-1 font-bold">
                          {p.name}
                        </h2>
                        <div className="flex items-center justify-between">
                          <div className=" flex text-[#28D45C] items-center   font-medium">
                            {new Intl.NumberFormat("de-DE").format(p.price)}
                            <TbCurrencyDong />
                          </div>
                          <div className="flex items-center gap-1">
                            <Rating ratings={p.rating} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className=" w-fit text-2xl py-8 text-slate-600">
            <FormattedMessage id="details-body.related_product" />
            <div className="relative top-2 -translate-x-1/2 left-1/2 w-[80%] border-b-[2px] border-green-600"></div>
          </div>

          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {relatedProducts.map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link
                      onClick={(e) => handleLinkClick(e, p)}
                      to={`/product/details/${p.slug}?_id=${p._id}`}
                      className="flex flex-col gap-2 border-[2px] border-green-200 p-3  hover:border-green-600 duration-200 rounded-xl "
                    >
                      <div className="relative h-[270px]">
                        <div className="w-full h-full rounded-xl">
                          <img
                            className="w-full h-full object-cover rounded-xl"
                            src={p.images[0]}
                            alt=""
                          />
                          <div className="z-10 absolute h-full w-full top-0 left-0 hover:bg-[#000]  bg-transparent rounded-xl hover:opacity-50 transition-all duration-300"></div>
                        </div>
                        {p.discount > 0 ? (
                          <div className="flex  justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-sm right-2 top-2">
                            {p.discount}%
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div className="p-4 flex flex-col gap-1 h-[120px]">
                        <h2 className="text-slate-600 text-lg font-bold h-[60px]">
                          {p.name}
                        </h2>
                        <div className="flex justify-between items-center">
                          <div className=" flex text-[#28D45C] items-center   font-medium">
                            {new Intl.NumberFormat("de-DE").format(
                              (p.price * (100 - p.discount)) / 100
                            )}
                            <TbCurrencyDong />
                          </div>
                          <div className="flex justify-center items-center">
                            <Rating ratings={p.rating} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="w-full flex justify-center items-center py-8">
            <div className="custom_bullet justify-center gap-3 !w-auto"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Details;
