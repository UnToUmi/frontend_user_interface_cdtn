import React, { useEffect } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { TbCurrencyDong } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_dashboard_index_data } from "../../store/reducers/dashboardReducer";
import { FormattedMessage } from "react-intl";

const Index = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo, locale } = useSelector((state) => state.auth);
  const { recentOrders, totalOrder, pendingOrder, cancelledOrder } =
    useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id));
  }, []);

  const redirect = (ord) => {
    navigate("/payment", {
      state: {
        price: ord.price,
        items: ord?.products.length,
        orderId: ord._id,
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="flex justify-center items-center p-5 bg-white rounded-xl gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>
              <FormattedMessage id="home-dashboard.orders" />
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-xl gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>
              <FormattedMessage id="home-dashboard.pending_orders" />
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-xl gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>
              <FormattedMessage id="home-dashboard.cancelled_orders" />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 mt-5 rounded-xl">
        <h2>
          <FormattedMessage id="home-dashboard.recent_orders" />
        </h2>
        <div className="pt-4">
          <div className="relative overflow-x-auto rounded-xl">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <FormattedMessage id="home-dashboard.order_id" />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <FormattedMessage id="home-dashboard.price" />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <FormattedMessage id="home-dashboard.payment_status" />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <FormattedMessage id="home-dashboard.order_status" />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <FormattedMessage id="home-dashboard.action" />
                  </th>
                </tr>
              </thead>
              <tbody className="relative">
                {recentOrders.length > 0 ? (
                  recentOrders.map((items, index) => (
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
    </div>
  );
};
export default Index;
