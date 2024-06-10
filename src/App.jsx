import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { get_category } from "./store/reducers/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";
import OrderDetails from "./components/dashboard/OrderDetails";
import Chat from "./components/dashboard/Chat";
import ConfirmOrder from "./pages/ConfirmOrder";
import { useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../src/translations/en.json";
import vi from "../src/translations/vi.json";
import flattenMessages from "./utils/flattenMessages";

const messages = {
  en: flattenMessages(en),
  vi: flattenMessages(vi),
};
function App() {
  // const navigate = useNavigate();

  const [language, setLanguage] = useState("");
  const { locale } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
  }, []);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  // const customerToken = localStorage.getItem("customerToken");
  // if (!customerToken) {
  //   navigate("/login");
  // }
  // console.log("customerToken", customerToken);

  return (
    <BrowserRouter>
      <IntlProvider locale={language} messages={messages[language]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/card" element={<Card />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/products?" element={<CategoryShop />} />
          <Route path="/products/search?" element={<SearchProducts />} />
          <Route path="/product/details/:slug" element={<Details />} />
          <Route path="/order/confirm?" element={<ConfirmOrder />} />

          <Route path="/dashboard" element={<ProtectUser />}>
            <Route path="" element={<Dashboard />}>
              <Route path="" element={<Index />} />
              <Route path="my-orders" element={<Orders />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="my-wishlist" element={<Wishlist />} />
              <Route path="order/details/:orderId" element={<OrderDetails />} />
              <Route path="chat" element={<Chat />} />
              <Route path="chat/:sellerId" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
