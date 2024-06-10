import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import RatingTemp from "./RatingTemp";
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import PaginationConfig from "./PaginationConfig";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  customer_review,
  product_details,
  get_reviews,
  messageClear,
} from "../store/reducers/homeReducer";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

const Reviews = ({ product }) => {
  // console.log("product", product._id);
  const [perPage, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const { userInfo, locale } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    comment: "",
    star: 0,
  });
  const { successMessage, loader, rating_review, reviews, totalReview } =
    useSelector((state) => state.home);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
      dispatch(product_details(product._id));
      setState({
        comment: "",
        star: 0,
      });
      dispatch(messageClear());
    }
  }, [successMessage]);

  const [errors, setErrors] = useState({});

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
        [name]: "", // Clear the error when input is not empty
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ["comment", "star"];
    fields.forEach((field) => {
      if (!state[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required!`;
      }
    });
    return newErrors;
  };

  const handleRatingChange = (value) => {
    setState({ ...state, star: value });
    setErrors({ ...errors, star: "" });
    // console.log("star", state.star);
  };

  const save = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const obj = {
        name: userInfo.name,
        review: state.comment,
        rating: state.star,
        productId: product._id,
      };
      dispatch(customer_review(obj));
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (product._id)
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
  }, [product, pageNumber]);

  const calculateWidth = (sum) => {
    if (totalReview === 0) return "0%";
    return `${(sum / totalReview) * 100}%`;
  };

  return (
    <div className="mt-8">
      <div className="flex justify-around gap-10 md-lg:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div className="flex gap-3 items-end justify-center">
            <span className="text-6xl font-semibold">{product.rating}</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-3xl">
            <Rating ratings={product.rating} />
          </div>
          <p className="text-sm text-slate-600">
            {totalReview} <FormattedMessage id="details-body.reviews" />
          </p>
        </div>

        <div className="flex gap-3 flex-col py-4">
          {rating_review.map((review, index) => (
            <div key={index} className="flex justify-start items-center gap-5">
              <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={review.rating} />
              </div>
              <div className="w-[200px] h-[14px] rounded-xl bg-slate-200 relative">
                <div
                  className="h-full bg-[#Edbb0E] rounded-xl"
                  style={{ width: calculateWidth(review.sum) }}
                ></div>
              </div>
              <p className="text-sm text-slate-600 w-[0%]">{review.sum}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        <FormattedMessage id="details-body.product_review" />
        {totalReview}
      </h2>
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {reviews.map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={r.rating} />
              </div>
              <span className="text-slate-600">{r.date}</span>
            </div>
            <span className="text-slate-600 text-md">{r.name}</span>
            <p className="text-slate-600 text-sm">{r.review}</p>
          </div>
        ))}
        <div className="flex justify-end">
          {totalReview > 5 && (
            <PaginationConfig
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={totalReview}
              perPage={perPage}
              showItem={Math.floor(totalReview / 3)}
            />
          )}
        </div>
      </div>

      <div>
        {userInfo ? (
          <div className="flex flex-col gap-3">
            <div className="px-3 py-1 rounded-xl bg-blue-200 w-fit">
              <FormattedMessage id="details-body.text_warning" />
            </div>
            <form onSubmit={save}>
              <div className="flex gap-3 items-center mb-4">
                <div
                  className={`px-3 py-1 rounded-xl  w-fit ${
                    errors.star ? "bg-red-300" : "bg-yellow-300"
                  }`}
                >
                  <FormattedMessage id="details-body.choose_stars" />
                </div>
                <div className="flex items-center gap-1">
                  <RatingReact
                    name={"star"}
                    onChange={handleRatingChange}
                    initialRating={state.star}
                    emptySymbol={
                      <span
                        className={` text-4xl duration-200 ${
                          errors.star ? "text-red-500" : "text-[#Edbb0E]"
                        }`}
                      >
                        <CiStar />
                      </span>
                    }
                    fullSymbol={
                      <span className="text-[#Edbb0E] text-4xl">
                        <FaStar />
                      </span>
                    }
                  />
                  {errors.star && (
                    <span className="text-red-500 text-sm ml-3">
                      {errors.star}
                    </span>
                  )}
                </div>
              </div>

              <textarea
                onChange={inputHandle}
                value={state.comment}
                type="text"
                className={`duration-200 w-full px-3 py-2 border-[2px] ${
                  errors.comment
                    ? "border-red-500 placeholder-red-500"
                    : "border-slate-200"
                } outline-none focus:border-green-500 rounded-xl`}
                name="comment"
                id=""
                cols="30"
                rows="5"
                placeholder="Your comment!"
              ></textarea>
              {errors.comment && (
                <span className="text-red-500 text-sm">{errors.comment}</span>
              )}
              <div className="mt-2">
                <button
                  className={` py-2 px-5 w-[120px] transition-all duration-200 hover:bg-purple-600 bg-purple-700 text-white rounded-xl`}
                >
                  {loader === false ? (
                    <FormattedMessage id="details-body.comment" />
                  ) : (
                    <ScaleLoader
                      width={4}
                      height={20}
                      color="#36d7b7"
                      speedMultiplier={0.8}
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="py-1 px-5 bg-red-500 text-white rounded-sm"
            >
              Login First
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Reviews;
