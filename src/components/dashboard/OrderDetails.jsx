import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_order_details } from "../../store/reducers/orderReducer";
import { TbCurrencyDong } from "react-icons/tb";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { myOrder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_order_details(orderId));
  }, [orderId]);

  return (
    <div className="bg-white p-5 rounded-xl">
      <h2 className="text-slate-600 mb-4 font-semibold">
        #{myOrder._id} , <span className="pl-1">{myOrder.date}</span>{" "}
      </h2>
      <div className="flex gap-3 ">
        <div className="w-[45%] flex flex-col gap-3">
          <h2 className="text-slate-600 font-semibold font-sans">
            Deliver To : {myOrder.shippingInfo?.name}{" "}
          </h2>
          <p>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-2 rounded">
              Home
            </span>
            <span className="text-slate-600 text-sm">
              {myOrder.shippingInfo?.address}
              {" - "}
              {myOrder.shippingInfo?.province}
              {" - "}
              {myOrder.shippingInfo?.city}
            </span>
          </p>
          <p className="text-slate-600 text-md font-semibold">
            Email To {userInfo.email}
          </p>
        </div>

        <div className="text-slate-600 w-[55%] flex flex-col gap-3">
          <h2 className="font-mono flex items-center">
            Price:{" "}
            <div className=" flex text-[#28D45C] mx-2 items-center font-medium">
              {new Intl.NumberFormat("de-DE").format(myOrder.price)}
              <TbCurrencyDong />
            </div>
            Included Shipping Fee
          </h2>
          <p className="font-mono">
            Payment Status:{" "}
            <span
              className={`py-[1px] text-xs px-3 ${
                myOrder.payment_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } rounded-md`}
            >
              {myOrder.payment_status}
            </span>
          </p>

          <p className="font-mono">
            Order Status :
            <span
              className={`py-[1px] text-xs px-3 ${
                myOrder.delivery_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } rounded-md`}
            >
              {myOrder.delivery_status}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-slate-600 text-lg pb-2 font-sans font-bold">
          Order Products
        </h2>
        <div className="flex gap-5 flex-col">
          {myOrder.products?.map((p, i) => (
            <div key={i} className="">
              <div className=" flex gap-5 justify-start items-center text-slate-600">
                <div className="flex w-[70%] gap-2">
                  <img className="w-[55px] h-[55px]" src={p.images[0]} alt="" />
                  <div className="flex text-sm flex-col justify-start items-start">
                    <Link> {p.name} </Link>
                    <p>
                      <span>Brand : {p.brand}</span>
                    </p>
                    <p>
                      <span>Quantity : {p.quantity}</span>
                    </p>
                  </div>
                </div>

                <div className="pl-4 flex w-[30%] flex-col items-start">
                  <h2 className="text-md text-green-800">
                    <div
                      className=" flex text-[#28D45C] 
                     items-center font-medium"
                    >
                      {new Intl.NumberFormat("de-DE").format(
                        p.price - Math.floor((p.price * p.discount) / 100)
                      )}
                      <TbCurrencyDong />
                    </div>
                  </h2>
                  <p className="line-through">
                    <div
                      className=" flex text-red-400 line-through
                     items-center font-medium"
                    >
                      {new Intl.NumberFormat("de-DE").format(p.price)}
                      <TbCurrencyDong />
                    </div>
                  </p>
                  <p className="text-red-400">-{p.discount}%</p>
                </div>
              </div>
              {myOrder.products.length > 1 && (
                <div className="border-b-[2px] w-full my-3"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
