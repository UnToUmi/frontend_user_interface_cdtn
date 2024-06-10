import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbCurrencyDong } from "react-icons/tb";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_card,
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import toast from "react-hot-toast";
import { FormattedMessage } from "react-intl";

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { successMessage, errorMessage } = useSelector((state) => state.card);

  const add_product_to_cart = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
      toast.error("You must login first!");
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
          image: product.images[0],
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
    <div className="w-[85%] border-[1px] border-black flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>
            <FormattedMessage id="home-body.feature_products" />
          </h2>
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="border-[2px] rounded-xl group transition-all duration-500  hover:border-green-600 hover:shadow-xl hover:-translate-y-3"
          >
            <div className="relative flex justify-center items-center overflow-hidden p-3">
              {p.discount > 0 ? (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs right-2 top-2">
                  {p.discount}%
                </div>
              ) : (
                <div></div>
              )}

              <img
                className=" sm:w-full rounded-xl h-[240px] object-cover bg-cover "
                src={p.images[0]}
                alt=""
              />
              <ul className=" flex transition-all duration-700 -bottom-20 justify-center items-center gap-2 absolute w-full group-hover:bottom-5">
                <li
                  onClick={() => add_wishlist(p)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-pink-600 hover:text-white hover:rotate-[720deg] duration-400 transition-all"
                >
                  <FaRegHeart />
                </li>
                <Link
                  to={`/product/details/${p.slug}?_id=${p._id}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] duration-400 transition-all"
                >
                  <FaEye />
                </Link>
                <li
                  onClick={() => add_product_to_cart(p._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] duration-400 transition-all"
                >
                  <RiShoppingCartLine />
                </li>
              </ul>
            </div>
            <div className="w-full relative flex flex-col h-fit  py-3 text-slate-600 px-5">
              <div className="absolute  w-[60%] right-1/2 translate-x-1/2  top-1 border-[1px] border-[#059473]"></div>
              <h2 className="font-bold h-[50px]">
                {p.name.length > 15 ? p.name.slice(0, 50) + "..." : p.name}
              </h2>
              <div className="flex justify-between items-center">
                <div className=" flex text-[#28D45C] items-center mt-2 font-medium">
                  {new Intl.NumberFormat("de-DE").format(
                    (p.price * (100 - p.discount)) / 100
                  )}
                  <TbCurrencyDong />
                </div>
                <div className="flex items-center">
                  <span className="relative -left-2">{`Rating: `}</span>
                  <Rating ratings={p.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
