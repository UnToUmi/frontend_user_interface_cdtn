import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import TopHeader from "../components/TopHeader";
import { TbCurrencyDong } from "react-icons/tb";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_card_product,
  get_card_products,
  messageClear,
  quantity_dec,
  quantity_inc,
  setMessage,
} from "../store/reducers/cardReducer";
import toast from "react-hot-toast";
import { place_order } from "../store/reducers/orderReducer";
const Shipping = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [res, setRes] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    state: { items, products, shipping_fee, price, from },
  } = useLocation();
  // console.log("price", price);

  const { successMessage, errorMessage, card_products, buy_product_item } =
    useSelector((state) => state.card);
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  const { userInfo } = useSelector((state) => state.auth);

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });

    if (value.trim() === "") {
      setErrors({
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const increase = (quantity, stock, cart_id) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_inc(cart_id));
    } else if (temp > stock || (temp === stock) === 0) {
      dispatch(
        setMessage("You can not increase the product cart item anymore!")
      );
    }
  };

  const decrease = (quantity, cart_id) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_dec(cart_id));
    } else {
      dispatch(
        setMessage("You can not decrease the product cart item anymore!")
      );
    }
  };

  useEffect(() => {
    if (buy_product_item < 1 && items < 1) {
      navigate("/");
      dispatch(setMessage("You do not have any products in your cart!"));
    } else {
      dispatch(get_card_products(userInfo.id));
    }
  }, [buy_product_item, successMessage]);

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

  const validateForm = () => {
    const newErrors = {};
    const fields = [
      "name",
      "address",
      "phone",
      "post",
      "province",
      "city",
      "area",
    ];
    fields.forEach((field) => {
      if (!state[field].trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required!`;
      }
    });
    return newErrors;
  };

  const placeOrder = () => {
    dispatch(
      place_order({
        price: price,
        products: products,
        shipping_fee: shipping_fee,
        items: items,
        shippingInfo: state,
        userId: userInfo.id,
        navigate,
      })
    );
  };

  const save = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setRes(true);
    }
  };
  const OrderSummary = ({ from, items, price, shipping_fee, products }) => (
    <div className="w-[33%] md-lg:w-full">
      <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
        <div className="bg-white p-4 text-slate-600 flex flex-col gap-3 rounded-xl">
          <h2 className="text-xl font-bold">
            <FormattedMessage id="shipping-body.order_summary" />
          </h2>
          <div className="flex justify-between items-center">
            <span>
              <FormattedMessage id="shipping-body.items_total" />({items})
            </span>
            <div className="flex text-[#28D45C] items-center font-medium">
              {new Intl.NumberFormat("de-DE").format(price)}
              <TbCurrencyDong />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>
              <FormattedMessage id="shipping-body.delivery_fee" />
            </span>
            <div className="flex text-[#28D45C] items-center font-medium">
              {new Intl.NumberFormat("de-DE").format(shipping_fee)}
              <TbCurrencyDong />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>
              <FormattedMessage id="shipping-body.total_payment" />
            </span>
            <div className="flex text-[#28D45C] items-center font-medium">
              {new Intl.NumberFormat("de-DE").format(shipping_fee + price)}
              <TbCurrencyDong />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>
              <FormattedMessage id="shipping-body.total" />
            </span>
            <div className="flex text-[#28D45C] items-center font-medium">
              {new Intl.NumberFormat("de-DE").format(shipping_fee + price)}
              <TbCurrencyDong />
            </div>
          </div>
          <button
            onClick={placeOrder}
            disabled={!res}
            className={`duration-200 px-5 py-[6px] rounded-xl hover:bg-red-500/50 ${
              res ? "bg-red-500" : "bg-red-300 cursor-not-allowed"
            } text-sm text-white uppercase`}
          >
            <FormattedMessage id="shipping-body.place_order" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductList = ({
    productList,
    decrease,
    increase,
    delete_card_product,
    dispatch,
  }) =>
    productList.map((p, i) => (
      <div key={i} className="flex bg-white p-4 flex-col gap-2 rounded-xl">
        <div className="flex justify-start items-center">
          <h2 className="text-md text-slate-600 font-bold">{p.shopName}</h2>
        </div>
        {p.products.map((pt, j) => (
          <div key={j}>
            <div className="w-full flex flex-wrap py-3">
              <div className="flex sm:w-full gap-2 w-7/12">
                <div className="flex gap-2 justify-start items-center">
                  <img
                    className="w-[80px] h-[80px] object-cover rounded-xl"
                    src={pt.productInfo.images[0]}
                    alt=""
                  />
                  <div className="pr-4 text-slate-600">
                    <h2 className="text-md font-semibold">
                      {pt.productInfo.name}
                    </h2>
                    <span className="text-sm">
                      <FormattedMessage id="shipping-body.brand" />:{" "}
                      {pt.productInfo.brand}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3 relative">
                <div className="pl-4 sm:pl-0 relative border flex flex-col gap-2 items-center justify-center">
                  <div className="flex text-red-600 line-through items-center font-medium">
                    {new Intl.NumberFormat("de-DE").format(
                      pt.productInfo.price
                    )}
                    <TbCurrencyDong />
                  </div>
                  <div className="flex text-[#28D45C] items-center font-medium">
                    {new Intl.NumberFormat("de-DE").format(
                      pt.productInfo.price -
                        Math.floor(
                          (pt.productInfo.price * pt.productInfo.discount) / 100
                        )
                    )}
                    <TbCurrencyDong />
                  </div>
                  <p className="absolute -top-2 w-[36px] h-[36px] flex items-center justify-center -right-9 z-10 px-1 rounded-full bg-red-100 text-red-700 ">
                    -{pt.productInfo.discount}%
                  </p>
                </div>
                {!decrease && !increase && !delete_card_product ? (
                  <div className="absolute translate-x-1/2 right-[30%] bottom-1/2 translate-y-1/2">
                    Quantity: {pt.quantity}
                  </div>
                ) : (
                  <div className="flex gap-2 flex-col">
                    <div className="flex gap-2 h-[30px] justify-center items-center text-xl">
                      <div
                        onClick={() => {
                          decrease(pt.quantity, pt._id);
                        }}
                        className="px-3 duration-200 rounded-xl hover:bg-slate-300 bg-slate-200 cursor-pointer"
                      >
                        -
                      </div>
                      <div className="px-3">{pt.quantity}</div>
                      <div
                        onClick={() =>
                          increase(pt.quantity, pt.productInfo.stock, pt._id)
                        }
                        className="px-3 duration-200 rounded-xl hover:bg-slate-300 bg-slate-200 cursor-pointer"
                      >
                        +
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(delete_card_product(pt._id))}
                      className="px-5 duration-200 py-[3px] hover:bg-red-400 bg-red-500 text-white rounded-xl"
                    >
                      <FormattedMessage id="shipping-body.delete" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 relative left-1/2 -translate-x-1/2 w-[90%] border-b-[1px] border-black"></div>
          </div>
        ))}
      </div>
    ));

  return (
    <div>
      <TopHeader />

      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">
                <FormattedMessage id="header-page.shipping_page" />
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
                  <FormattedMessage id="header-page.shipping" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-xl">
                  <h2 className="text-slate-600 font-bold pb-3">
                    <FormattedMessage id="shipping-body.shipping_information" />
                  </h2>
                  {!res && (
                    <>
                      <form onSubmit={save}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label
                              htmlFor="name"
                              className={` ${
                                errors.name ? "text-red-500" : "text-black"
                              } `}
                            >
                              <FormattedMessage id="shipping-body.name" />*
                            </label>
                            <input
                              onChange={inputHandle}
                              value={state.name}
                              type="text"
                              className={`duration-200 w-full px-3 py-2 border ${
                                errors.name
                                  ? "border-red-500 placeholder-red-500"
                                  : "border-slate-200"
                              } outline-none focus:border-green-500 rounded-xl`}
                              name="name"
                              id="name"
                              placeholder="Enter your name"
                            />
                            {errors.name && (
                              <span className="text-red-500 text-sm">
                                {errors.name}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label
                              htmlFor="address"
                              className={` ${
                                errors.address ? "text-red-500" : "text-black"
                              } `}
                            >
                              <FormattedMessage id="shipping-body.address" />*
                            </label>
                            <input
                              onChange={inputHandle}
                              value={state.address}
                              type="text"
                              className={`duration-200 w-full px-3 py-2 border ${
                                errors.address
                                  ? "border-red-500 placeholder-red-500"
                                  : "border-slate-200"
                              } outline-none focus:border-green-500 rounded-xl`}
                              name="address"
                              id="address"
                              placeholder="Enter your address"
                            />
                            {errors.address && (
                              <span className="text-red-500 text-sm">
                                {errors.address}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label
                              htmlFor="phone"
                              className={` ${
                                errors.phone ? "text-red-500" : "text-black"
                              } `}
                            >
                              <FormattedMessage id="shipping-body.phone" />*
                            </label>
                            <input
                              onChange={inputHandle}
                              value={state.phone}
                              type="text"
                              className={`duration-200 w-full px-3 py-2 border ${
                                errors.phone
                                  ? "border-red-500 placeholder-red-500"
                                  : "border-slate-200"
                              } outline-none focus:border-green-500 rounded-xl`}
                              name="phone"
                              id="phone"
                              placeholder="Enter your phone number"
                            />
                            {errors.phone && (
                              <span className="text-red-500 text-sm">
                                {errors.phone}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label
                              htmlFor="post"
                              className={` ${
                                errors.post ? "text-red-500" : "text-black"
                              } `}
                            >
                              <FormattedMessage id="shipping-body.post" />*
                            </label>
                            <input
                              onChange={inputHandle}
                              value={state.post}
                              type="text"
                              className={`duration-200 w-full px-3 py-2 border ${
                                errors.post
                                  ? "border-red-500 placeholder-red-500"
                                  : "border-slate-200"
                              } outline-none focus:border-green-500 rounded-xl`}
                              name="post"
                              id="post"
                              placeholder="Enter your postal code"
                            />
                            {errors.post && (
                              <span className="text-red-500 text-sm">
                                {errors.post}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label
                              htmlFor="province"
                              className={` ${
                                errors.province ? "text-red-500" : "text-black"
                              } `}
                            >
                              <FormattedMessage id="shipping-body.province" />*
                            </label>
                            <input
                              onChange={inputHandle}
                              value={state.province}
                              type="text"
                              className={`duration-200 w-full px-3 py-2 border ${
                                errors.province
                                  ? "border-red-500 placeholder-red-500"
                                  : "border-slate-200"
                              } outline-none focus:border-green-500 rounded-xl`}
                              name="province"
                              id="province"
                              placeholder="Enter your province"
                            />
                            {errors.province && (
                              <span className="text-red-500 text-sm">
                                {errors.province}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label
                              htmlFor="city"
                              className={` ${
                                errors.city ? "text-red-500" : "text-black"
                              } `}
                            >
                              <FormattedMessage id="shipping-body.city" />*
                            </label>
                            <input
                              onChange={inputHandle}
                              value={state.city}
                              type="text"
                              className={`duration-200 w-full px-3 py-2 border ${
                                errors.city
                                  ? "border-red-500 placeholder-red-500"
                                  : "border-slate-200"
                              } outline-none focus:border-green-500 rounded-xl`}
                              name="city"
                              id="city"
                              placeholder="Enter your city"
                            />
                            {errors.city && (
                              <span className="text-red-500 text-sm">
                                {errors.city}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col md:gap-2 w-full gap-3 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label
                              htmlFor="area"
                              className={` ${
                                errors.area ? "text-red-500" : "text-black"
                              } `}
                            >
                              <FormattedMessage id="shipping-body.area" />*
                            </label>
                            <input
                              onChange={inputHandle}
                              value={state.area}
                              type="text"
                              className={`duration-200 w-full px-3 py-2 border ${
                                errors.area
                                  ? "border-red-500 placeholder-red-500"
                                  : "border-slate-200"
                              } outline-none focus:border-green-500 rounded-xl`}
                              name="area"
                              id="area"
                              placeholder="Enter your area"
                            />
                            {errors.area && (
                              <span className="text-red-500 text-sm">
                                {errors.area}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mt-7 mb-2 w-full">
                            <button className="duration-200 px-3 py-[6px] rounded-xl hover:bg-green-400  bg-green-500 text-white">
                              <FormattedMessage id="shipping-body.save_change" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-slate-600 font-semibold pb-2">
                        <FormattedMessage id="shipping-body.delivery_to" />{" "}
                        {state.name}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                          Home
                        </span>
                        <span>
                          {state.phone} - {state.area} - {state.address}
                          {" - "}
                          {state.province} - {state.city}
                        </span>

                        <span
                          onClick={() => setRes(false)}
                          className="font-medium  text-white ml-3 bg-red-400 rounded-md duration-200 px-2 py-1 hover:bg-red-500 cursor-pointer"
                        >
                          <FormattedMessage id="shipping-body.change" />
                        </span>
                      </p>
                      <p className="text-slate-600 text-sm">
                        Email to {userInfo?.email}
                      </p>
                    </div>
                  )}
                </div>

                {from === "cart" ? (
                  <ProductList
                    productList={products}
                    // decrease={decrease}
                    // increase={increase}
                    // delete_cart_product={delete_cart_product}
                    // dispatch={dispatch}
                  />
                ) : (
                  <ProductList
                    productList={products}
                    // decrease={decrease}
                    // increase={increase}
                    // delete_cart_product={delete_cart_product}
                    // dispatch={dispatch}
                  />
                )}
              </div>
            </div>
            {from === "cart" ? (
              <OrderSummary
                from="cart"
                price={price}
                products={products}
                shipping_fee={shipping_fee}
                items={items}
              />
            ) : (
              <OrderSummary
                from="buy_now"
                price={price}
                products={products}
                shipping_fee={shipping_fee}
                items={items}
              />
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Shipping;
