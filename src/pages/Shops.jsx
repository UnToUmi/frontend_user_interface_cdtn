import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import TopHeader from "../components/TopHeader";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Products from "../components/products/Products";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ShopProducts from "../components/products/ShopProducts";
import PaginationConfig from "../components/PaginationConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  price_range_product,
  query_products,
} from "../store/reducers/homeReducer";
import { TbCurrencyDong } from "react-icons/tb";
import { FormattedMessage } from "react-intl";

const Shops = () => {
  const [filter, setFilter] = useState(true);
  const [rating, setRating] = useState("");
  const [styles, setStyles] = useState("grid");
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  const {
    products,
    categorys,
    priceRange,
    latest_product,
    totalProduct,
    parPage,
  } = useSelector((state) => state.home);

  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high],
  });

  const [sortPrice, setSortPrice] = useState("");
  const [category, setCategory] = useState("");
  const queryCategory = (e, value) => {
    if (e.target.checked) {
      setCategory(value);
      console.log("setCategory", category);
    } else {
      setCategory("");
    }
  };

  const resetRating = () => {
    setRating("");
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        category,
        rating: "",
        sortPrice,
        pageNumber,
      })
    );
  };

  //useEffect function

  useEffect(() => {
    const query = {
      low: state.values[0],
      high: state.values[1],
      category,
      rating,
      sortPrice,
      pageNumber,
    };
    dispatch(query_products(query));
  }, [
    state.values[0],
    state.values[1],
    category,
    rating,
    sortPrice,
    pageNumber,
  ]);

  useEffect(() => {
    dispatch(price_range_product());
  }, []);

  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);

  return (
    <div className="relative w-full">
      <TopHeader />
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover object-cover  bg-no-repeat relative bg-left'>
        <div className="absolute left-0 right-0 top-0 h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full absolute right-1/2 translate-x-1/2 ">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shop Page </h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link
                  to="/"
                  className="text-[30px] border-b-[2px] transition-all duration-200 border-transparent hover:border-b-[2px] hover:border-white "
                >
                  Home
                </Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Shop </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className={`hidden md:block  ${!filter ? "mb-6" : "mb-0"} `}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-[#059473] hover:bg-[#059473]/80 rounded-xl text-white"
            >
              <FormattedMessage id="shops-body.filter_products" />
            </button>
          </div>

          <div className="w-full flex flex-wrap">
            <div
              className={`w-3/12 border-r-[2px] md:border-b-[2px] md:border-r-[0px] border-[#059473]   md-lg:w-4/12 duration-200 transition-all  md:w-full pr-8 ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              } `}
            >
              <h2 className="text-3xl font-bold mb-3 text-slate-600">
                <FormattedMessage id="shops-body.categories" />
              </h2>
              <div className="py-2">
                {categorys.map((c, i) => (
                  <div
                    key={i}
                    className="cursor-pointer w-full flex justify-start duration-200 items-center gap-3 py-1 hover:bg-green-300 px-3 rounded-xl h-12"
                  >
                    <input
                      checked={category === c.name ? true : false}
                      onChange={(e) => queryCategory(e, c.name)}
                      type="checkbox"
                      id={c.name}
                    />

                    <label
                      className="text-slate-600 block w-full cursor-pointer "
                      htmlFor={c.name}
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="py-2 flex flex-col gap-5">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  <FormattedMessage id="shops-body.price" />
                </h2>

                <Range
                  step={5}
                  min={priceRange.low}
                  max={priceRange.high}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] bg-slate-200 rounded-full ml-2 cursor-pointer"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                      {...props}
                    />
                  )}
                />
              </div>
              <span className="text-[#059473]/70 ml-2 duration-200 flex justify-start gap-1 items-center w-full font-bold text-lg">
                {new Intl.NumberFormat("de-DE").format(state.values[0])}
                <TbCurrencyDong /> -
                {new Intl.NumberFormat("de-DE").format(state.values[1])}
                <TbCurrencyDong />
              </span>

              <div className="py-3 flex flex-col gap-4">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  <FormattedMessage id="shops-body.rating" />
                </h2>
                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => setRating(5)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(4)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(3)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(2)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(1)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  <div
                    onClick={resetRating}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-5 flex flex-col gap-4 md:hidden">
                <Products title="Latest Product" products={latest_product} />
              </div>
            </div>

            <div className=" relative w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-3 rounded-xl flex justify-between items-start border">
                  <h2 className="text-lg font-medium text-slate-600 relative translate-y-[20%] bottom-0">
                    ({totalProduct}){" "}
                    <FormattedMessage id="shops-body.products" />
                  </h2>
                  <div className="flex justify-center items-center gap-3">
                    <select
                      className="p-2 px-3 border rounded-xl outline-0 text-slate-600 font-semibold"
                      name=""
                      id=""
                      onChange={(e) => setSortPrice(e.target.value)}
                    >
                      <option value="">
                        <FormattedMessage id="shops-body.sort_by" />
                      </option>
                      <option value="low-to-high">
                        <FormattedMessage id="shops-body.low_high" />
                      </option>
                      <option value="high-to-low">
                        <FormattedMessage id="shops-body.high_low" />
                      </option>
                    </select>
                    <div className="flex justify-center items-start gap-4 md-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm duration-200 `}
                      >
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2 ${
                          styles === "list" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm duration-200 `}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pb-8">
                  <ShopProducts products={products} styles={styles} />
                </div>
                <div className="mt-4 absolute  right-1/2 translate-x-1/2">
                  {totalProduct > parPage && (
                    <PaginationConfig
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProduct}
                      perPage={parPage}
                      showItem={Math.floor(totalProduct / parPage)}
                      // showItem={9}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shops;
