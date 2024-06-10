import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbCurrencyDong } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get_orders } from "../../store/reducers/orderReducer";
import { FormattedMessage } from "react-intl";

const Orders = () => {
  const [state, setState] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setState("-- Order Status --");
  }, []);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { myOrders } = useSelector((state) => state.order);
  const { userInfo, locale } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(
      get_orders({ status: state, customerId: userInfo.id, locale: locale })
    );
  }, [state]);

  const redirect = (ord) => {
    let items = 0;
    for (let i = 0; i < ord.length; i++) {
      items = ord.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: ord.price,
        items,
        orderId: ord._id,
      },
    });
  };

  // console.log("myOrders", myOrders);

  const stateMappings = {
    vi: {
      placed: "Đã giao",
      pending: "Đang chờ",
      cancelled: "Đã hủy",
      warehouse: "Trong kho",
      "-- Order Status --": "-- Trạng thái --",
    },
    en: {
      "Đã giao": "placed",
      "Đang chờ": "pending",
      "Đã hủy": "cancelled",
      "Trong kho": "warehouse",
      "-- Trạng thái --": "-- Order Status --",
    },
  };

  useEffect(() => {
    const localeMappings = stateMappings[locale];
    if (localeMappings && localeMappings[state]) {
      setState(localeMappings[state]);
    }
  }, [state, locale]);

  return (
    <div className="bg-white p-4 rounded-xl md-lg::mt-10">
      <div className="flex  justify-between items-center mb-4 ">
        <h2 className="text-2xl font-semibold text-slate-700">
          <FormattedMessage id="home-dashboard-my-orders.my_orders" />
        </h2>
        <div
          onClick={() => setShow(!show)}
          className={`${
            show ? "border-green-600" : "border-slate-400"
          } w-[200px] relative border-[1px] rounded-xl  flex gap-2 justify-between cursor-pointer  px-3 py-2 `}
        >
          <div className=" ">{state}</div>
          <div className="relative translate-y-[20%] top-1/2 duration-200">
            {!show ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
          {show && (
            <div
              className={`z-50 absolute left-0 right-0  top-full bg-slate-300 rounded-xl overflow-hidden transition-all ${
                show ? "h-fit" : "h-0"
              }`}
            >
              <div className="flex flex-col py-2">
                <div
                  onClick={() => setState("-- Order Status --")}
                  className="py-1 px-3 hover:bg-slate-100 duration-200 rounded-xl"
                >
                  <FormattedMessage id="home-dashboard-my-orders.all" />
                </div>
                <div
                  onClick={() => setState("placed")}
                  className="py-1 px-3 hover:bg-slate-100 duration-200 rounded-xl"
                >
                  <FormattedMessage id="home-dashboard-my-orders.placed" />
                </div>
                <div
                  onClick={() => setState("pending")}
                  className="py-1 px-3 hover:bg-slate-100 duration-200 rounded-xl"
                >
                  <FormattedMessage id="home-dashboard-my-orders.pending" />
                </div>
                <div
                  onClick={() => setState("cancelled")}
                  className="py-1 px-3 hover:bg-slate-100 duration-200 rounded-xl"
                >
                  <FormattedMessage id="home-dashboard-my-orders.cancelled" />
                </div>
                <div
                  onClick={() => setState("warehouse")}
                  className="py-1 px-3 hover:bg-slate-100 duration-200 rounded-xl"
                >
                  <FormattedMessage id="home-dashboard-my-orders.warehouse" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <div className="relative overflow-x-auto rounded-xl">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <FormattedMessage id="home-dashboard-my-orders.order_id" />
                </th>
                <th scope="col" className="px-6 py-3">
                  <FormattedMessage id="home-dashboard-my-orders.price" />
                </th>
                <th scope="col" className="px-6 py-3">
                  <FormattedMessage id="home-dashboard-my-orders.payment_status" />
                </th>
                <th scope="col" className="px-6 py-3">
                  <FormattedMessage id="home-dashboard-my-orders.order_status" />
                </th>
                <th scope="col" className="px-6 py-3">
                  <FormattedMessage id="home-dashboard-my-orders.action" />
                </th>
              </tr>
            </thead>
            <tbody className="relative">
              {myOrders.length > 0 ? (
                myOrders.map((items, index) => (
                  <tr className="bg-white border-b">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      #{items._id}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <div className=" flex text-[#28D45C] items-center mt-2 font-medium">
                        {new Intl.NumberFormat("de-DE").format(items.price)}
                        <TbCurrencyDong />
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {items.payment_status}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {items.delivery_status}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <Link to={`/dashboard/order/details/${items._id}`}>
                        <span className="bg-green-200 text-green-800 hover:text-green-600 text-md font-semibold duration-200 mr-2 px-3 py-[2px] rounded">
                          <FormattedMessage id="home-dashboard-my-orders.view" />
                        </span>
                      </Link>

                      {items.payment_status !== "paid" && (
                        <span
                          onClick={() => redirect(items)}
                          className="cursor-pointer bg-green-200 text-green-800 hover:text-green-600 text-md duration-200 font-semibold mr-2 px-3 py-[2px] rounded"
                        >
                          <FormattedMessage id="home-dashboard-my-orders.pay_now" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap relative -right-1/2 -translate-x-1/2"
                  >
                    {locale === "vi" ? "Không có dữ liệu" : "No data"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
