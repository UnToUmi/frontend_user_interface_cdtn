import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { TbCurrencyDong } from "react-icons/tb";
import TopHeader from "../components/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_card_product,
  get_card_products,
  messageClear,
  quantity_inc,
  quantity_dec,
  setMessage,
} from "../store/reducers/cardReducer";
import { FormattedMessage } from "react-intl";
import toast from "react-hot-toast";
const Card = () => {
  const navigate = useNavigate();
  const {
    card_products,
    successMessage,
    price,
    buy_product_item,
    shipping_fee,
    card_product_count,
    outofstock_products,
    errorMessage,
  } = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        from: "cart",
        products: card_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
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
    dispatch(get_card_products(userInfo.id));
  }, [card_product_count, successMessage]);

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

  return (
    <div>
      <TopHeader />
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">
                <FormattedMessage id="header-page.cart_page" />
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
                  <FormattedMessage id="header-page.cart" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 relative">
          {card_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-green-500/20 p-4 rounded-xl ">
                      <h2 className="text-md text-green-500 font-semibold">
                        <FormattedMessage id="cart-body.stock_products" />:{" "}
                        {buy_product_item}
                      </h2>
                    </div>
                    {card_products.map((p, i) => (
                      <div className="flex bg-white p-4 flex-col gap-2 rounded-xl">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 font-bold">
                            {p.shopName}
                          </h2>
                        </div>
                        {p.products.map((p, i) => (
                          <div className="w-full">
                            <div className="w-full flex flex-wrap ">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px] object-cover rounded-xl"
                                    src={p.productInfo.images[0]}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md font-semibold">
                                      {p.productInfo.name}
                                    </h2>
                                    <span className="text-sm">
                                      {p.productInfo.brand}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0 relative w-fit px-2 border flex flex-col gap-2 items-center justify-center">
                                  <div className=" flex text-red-600 line-through items-center  font-medium">
                                    {new Intl.NumberFormat("de-DE").format(
                                      p.productInfo.price
                                    )}
                                    <TbCurrencyDong />
                                  </div>

                                  <div className=" flex text-[#28D45C] items-center  font-medium">
                                    {new Intl.NumberFormat("de-DE").format(
                                      p.productInfo.price -
                                        Math.floor(
                                          (p.productInfo.price *
                                            p.productInfo.discount) /
                                            100
                                        )
                                    )}
                                    <TbCurrencyDong />
                                  </div>

                                  <p className="absolute -top-2 w-[36px] h-[36px] flex items-center justify-center -right-9 z-10 px-1 rounded-full bg-red-100 text-red-700 ">
                                    -{p.productInfo.discount}%
                                  </p>
                                </div>

                                <div className="flex gap-2 flex-col">
                                  <div className="flex gap-2  h-[30px] justify-center items-center text-xl">
                                    <div
                                      onClick={() =>
                                        decrease(p.quantity, p._id)
                                      }
                                      className="px-3 duration-200 hover:bg-slate-300  rounded-xl bg-slate-200 cursor-pointer"
                                    >
                                      -
                                    </div>
                                    <div className="px-3">{p.quantity}</div>
                                    <div
                                      onClick={() =>
                                        increase(
                                          p.quantity,
                                          p.productInfo.stock,
                                          p._id
                                        )
                                      }
                                      className="px-3 rounded-xl duration-200 hover:bg-slate-300 bg-slate-200 cursor-pointer"
                                    >
                                      +
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      dispatch(delete_card_product(p._id))
                                    }
                                    className="hover:bg-red-400 duration-200 px-5 py-[3px] bg-red-500 text-white rounded-xl"
                                  >
                                    <FormattedMessage id="cart-body.delete" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            {card_product_count > 1 && (
                              <div className="mt-3 mb-3 relative left-1/2 -translate-x-1/2 w-[100%] border-b-[1px] border-black"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                    {outofstock_products.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-red-500/20 p-4 rounded-xl">
                          <h2 className="text-md text-red-500 font-semibold">
                            <FormattedMessage id="cart-body.out_of_stock" />:{" "}
                            {outofstock_products.length}
                          </h2>
                        </div>
                        <div className="bg-white p-4 rounded-xl">
                          {outofstock_products.map((p, i) => (
                            <div>
                              <div className="w-full flex flex-wrap py-3">
                                <div className="flex sm:w-full gap-2 w-7/12">
                                  <div className="flex gap-2 justify-start items-center">
                                    <img
                                      className="w-[80px] h-[80px] object-cover rounded-xl"
                                      src={p.products[0].images[0]}
                                      alt=""
                                    />
                                    <div className="pr-4 text-slate-600">
                                      <h2 className="text-md font-semibold">
                                        {p.products[0].name}
                                      </h2>
                                      <span className="text-sm">
                                        <FormattedMessage id="cart-body.brand" />
                                        : {p.products[0].brand}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                  <div className="pl-4 sm:pl-0 relative w-fit px-2 border flex flex-col gap-2 items-center justify-center">
                                    <div className=" flex text-red-600 line-through items-center  font-medium">
                                      {new Intl.NumberFormat("de-DE").format(
                                        p.products[0].price
                                      )}
                                      <TbCurrencyDong />
                                    </div>

                                    <div className=" flex text-[#28D45C] items-center  font-medium">
                                      {new Intl.NumberFormat("de-DE").format(
                                        p.products[0].price -
                                          Math.floor(
                                            (p.products[0].price *
                                              p.products[0].discount) /
                                              100
                                          )
                                      )}
                                      <TbCurrencyDong />
                                    </div>

                                    <p className="absolute -top-2 w-[36px] h-[36px] flex items-center justify-center -right-9 z-10 px-1 rounded-full bg-red-100 text-red-700 ">
                                      -{p.products[0].discount}%
                                    </p>
                                  </div>
                                  <div className="flex gap-2 flex-col">
                                    <div className="flex gap-2  h-[30px] justify-center items-center text-xl">
                                      <div
                                        onClick={() =>
                                          decrease(p.quantity, p._id)
                                        }
                                        className="px-3 duration-200 rounded-xl hover:bg-slate-300 bg-slate-200 cursor-pointer"
                                      >
                                        -
                                      </div>
                                      <div className="px-3">{p.quantity}</div>
                                      <div
                                        onClick={() =>
                                          increase(
                                            p.quantity,
                                            p.products[0].stock,
                                            p._id
                                          )
                                        }
                                        className="px-3 duration-200 rounded-xl hover:bg-slate-300 bg-slate-200 cursor-pointer"
                                      >
                                        +
                                      </div>
                                    </div>
                                    <button
                                      onClick={() =>
                                        dispatch(delete_card_product(p._id))
                                      }
                                      className="px-5 duration-200 py-[3px] hover:bg-red-400 bg-red-500 text-white rounded-xl"
                                    >
                                      <FormattedMessage id="cart-body.delete" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {outofstock_products.length > 1 && (
                                <div className="mt-3 mb-3 relative left-1/2 -translate-x-1/2 w-[100%] border-b-[1px] border-black"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-white p-4 text-slate-600 flex flex-col gap-3 rounded-xl">
                      <h2 className="text-xl font-bold">
                        <FormattedMessage id="cart-body.order_summary" />
                      </h2>
                      <div className="flex justify-between items-center">
                        <span>
                          {buy_product_item}{" "}
                          <FormattedMessage id="cart-body.items" />{" "}
                        </span>
                        <div className=" flex text-[#28D45C] items-center  font-medium">
                          {new Intl.NumberFormat("de-DE").format(price)}
                          <TbCurrencyDong />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          <FormattedMessage id="cart-body.shipping_fee" />{" "}
                        </span>
                        <div className=" flex text-[#28D45C] items-center  font-medium">
                          {new Intl.NumberFormat("de-DE").format(shipping_fee)}
                          <TbCurrencyDong />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full rounded-xl px-3 py-2 border border-slate-200 outline-0  focus:border-green-500 "
                          type="text"
                          placeholder="Input Voucher Coupon"
                        />
                        <button className="duration-200 hover:bg-[#059473]/70 px-5 py-[1px] bg-[#059473] text-white rounded-xl uppercase text-sm">
                          <FormattedMessage id="cart-body.apply" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>
                          <FormattedMessage id="cart-body.total" />
                        </span>
                        <div className=" flex text-[#28D45C] items-center  font-medium">
                          {new Intl.NumberFormat("de-DE").format(
                            price + shipping_fee
                          )}
                          <TbCurrencyDong />
                        </div>
                      </div>
                      <button
                        onClick={redirect}
                        className=" duration-200 px-5 py-[6px] rounded-xl hover:bg-red-400 bg-red-500 text-sm text-white uppercase "
                      >
                        <FormattedMessage id="cart-body.process_to_checkout" />{" "}
                        ({buy_product_item})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full gap-3 ">
              <div className="text-red-600 absolute right-1/2 translate-x-1/2 top-0 translate-y-1/2">
                {`You do not have any products in your cart :(( ! Please add some
                product at homepage!`}
              </div>
              <Link
                className="md-lg:bottom-[10%] bottom-[30%] cursor-pointer hover:bg-[#059473]/80 duration-200 absolute right-1/2 translate-x-1/2  px-4 rounded-xl py-1 bg-[#059473] text-white"
                to="/shops"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Card;
