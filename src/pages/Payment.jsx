import React, { useState } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useLocation } from "react-router-dom";
import Stripe from "../components/Stripe";
import TopHeader from "../components/TopHeader";
import { TbCurrencyDong } from "react-icons/tb";

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <div>
      <TopHeader />
      <Header />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 ">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[20%] rounded-l-xl hover:bg-slate-200 duration-200  cursor-pointer py-8 px-12 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                    } `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/stripe.png"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-600">Stripe</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-[20%] rounded-r-xl hover:bg-slate-200 duration-200 cursor-pointer py-8 px-12 ${
                      paymentMethod === "cod" ? "bg-white" : "bg-slate-100"
                    } `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/cod.jpg"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-600">COD</span>
                  </div>
                </div>

                {paymentMethod === "stripe" && (
                  <div className="mt-3">
                    <Stripe orderId={orderId} price={price} />
                  </div>
                )}
                {paymentMethod === "cod" && (
                  <div className="w-full px-4 py-8 bg-white shadow-sm mt-3 rounded-xl">
                    <button className="px-10 py-[6px] rounded-xl hover:bg-green-500 duration-200  bg-green-600 text-white">
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-5/12 md:w-full ">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3 rounded-xl">
                  <h2 className="font-bold text-lg">Order Summary </h2>
                  <div className="flex justify-between items-center">
                    <span>{items} Items and Shipping Fee Included </span>
                    <div className=" flex text-[#28D45C] items-center   font-medium">
                      {new Intl.NumberFormat("de-DE").format(price)}
                      <TbCurrencyDong />
                    </div>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount </span>
                    <span className="text-lg text-green-600">
                      <div className=" flex text-[#28D45C] items-center   font-medium">
                        {new Intl.NumberFormat("de-DE").format(price)}
                        <TbCurrencyDong />
                      </div>
                    </span>
                  </div>
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

export default Payment;
