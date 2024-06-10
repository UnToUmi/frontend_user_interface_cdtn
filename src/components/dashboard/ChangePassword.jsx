import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  customer_change_password,
  messageClear,
} from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { FormattedMessage } from "react-intl";

const ChangePassword = () => {
  const { locale, userInfo, loader, successMessage, errorMessage } =
    useSelector((state) => state.auth);

  const [passwordType, setPasswordType] = useState({
    old_password: "password",
    new_password: "password",
    confirm_password: "password",
  });
  const [state, setState] = useState({
    confirm_password: "",
    old_password: "",
    new_password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const handleChangType = (field) => {
    setPasswordType({
      ...passwordType,
      [field]: passwordType[field] === "password" ? "text" : "password",
    });
  };
  const validateForm = () => {
    const newErrors = {};
    const fields = ["old_password", "confirm_password", "new_password"];
    fields.forEach((field) => {
      if (!state[field].trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required!`.replace(/_/g, " ");
      }
    });
    return newErrors;
  };

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });

    if (value.trim() === "") {
      setErrors({
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required!`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const save = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        userId: userInfo.id,
        confirm_password: state.confirm_password,
        old_password: state.old_password,
        new_password: state.new_password,
      };
      dispatch(customer_change_password(data));
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setState({
        confirm_password: "",
        new_password: "",
        old_password: "",
      });
      setPasswordType({
        confirm_password: "password",
        new_password: "password",
        old_password: "password",
      });
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="p-5 bg-white rounded-xl ">
      <h2 className="text-xl text-slate-600 pb-5">
        <FormattedMessage id="home-dashboard-change-password.change_password" />
      </h2>

      <form onSubmit={save} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 mb-2 relative">
          <label
            htmlFor="old_password"
            className={` ${
              errors.old_password ? "text-red-500" : "text-black"
            } `}
          >
            <FormattedMessage id="home-dashboard-change-password.old_password" />
            *
          </label>
          <input
            onChange={inputHandle}
            value={state.old_password}
            className={`duration-200 w-full px-3 py-2 border ${
              errors.old_password
                ? "border-red-500 placeholder-red-500"
                : "border-slate-200"
            } outline-none focus:border-green-500 rounded-xl`}
            type={passwordType.old_password}
            name="old_password"
            id="old_password"
            placeholder={
              locale === "vi"
                ? "Nhập mật khẩu cũ của bạn"
                : "Enter your old password"
            }
          />

          <div
            onClick={() => {
              handleChangType("old_password");
            }}
            className=" right-4 -translate-y-[50%] bottom-0  absolute cursor-pointer"
          >
            {passwordType.old_password === "password" ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        </div>
        {errors.old_password && (
          <span className="text-red-500 text-sm relative -top-4">
            {errors.old_password}
          </span>
        )}

        <div className="flex flex-col gap-1 mb-2 relative">
          <label
            className={` ${
              errors.new_password ? "text-red-500" : "text-black"
            } `}
            htmlFor="new_password"
          >
            <FormattedMessage id="home-dashboard-change-password.new_password" />
            *
          </label>
          <input
            onChange={inputHandle}
            value={state.new_password}
            className={`duration-200 w-full px-3 py-2 border ${
              errors.new_password
                ? "border-red-500 placeholder-red-500"
                : "border-slate-200"
            } outline-none focus:border-green-500 rounded-xl`}
            type={passwordType.new_password}
            name="new_password"
            id="new_password"
            placeholder={
              locale === "vi"
                ? "Nhập mật khẩu mới của bạn"
                : "Enter your new password"
            }
          />

          <div
            onClick={() => {
              handleChangType("new_password");
            }}
            className=" right-4 -translate-y-[50%] bottom-0  absolute cursor-pointer"
          >
            {passwordType.new_password === "password" ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        </div>
        {errors.new_password && (
          <span className="text-red-500 text-sm relative -top-4">
            {errors.new_password}
          </span>
        )}

        <div className="flex flex-col gap-1 mb-2 relative">
          <label
            className={` ${
              errors.confirm_password ? "text-red-500" : "text-black"
            } `}
            htmlFor="confirm_password"
          >
            <FormattedMessage id="home-dashboard-change-password.confirm_password" />
            *
          </label>
          <input
            onChange={inputHandle}
            value={state.confirm_password}
            className={`duration-200 w-full px-3 py-2 border ${
              errors.confirm_password
                ? "border-red-500 placeholder-red-500"
                : "border-slate-200"
            } outline-none focus:border-green-500 rounded-xl`}
            type={passwordType.confirm_password}
            name="confirm_password"
            id="confirm_password"
            placeholder={
              locale === "vi"
                ? "Nhập lại mật khẩu mới của bạn"
                : "Enter your confirm password"
            }
          />

          <div
            onClick={() => {
              handleChangType("confirm_password");
            }}
            className=" right-4 -translate-y-[50%] bottom-0  absolute cursor-pointer"
          >
            {passwordType.confirm_password === "password" ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        </div>
        {errors.confirm_password && (
          <span className="text-red-500 text-sm relative -top-4">
            {errors.confirm_password}
          </span>
        )}
        <div>
          <button className="px-8 w-[200px] h-[50px] py-2 bg-[#059473] duration-200 hover:bg-[#059473]/50 text-white rounded-xl">
            {loader ? (
              <ScaleLoader
                width={4}
                height={20}
                color="#36d7b7"
                speedMultiplier={0.8}
              />
            ) : (
              <FormattedMessage id="home-dashboard-change-password.update_password" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
