/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const EnterPassword = ({
  placeholder,
  value,
  onChange,
  onGoodPassword,
  showErrorMessage,
}) => {
  const isValid = value?.length > 7;
  const validationStyle = value
    ? isValid
      ? "border-green-600 "
      : "border-red-600"
    : " ";
  const [type, setType] = useState("password");
  const handleShowPassword = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  let errorMessage;
  if (!value) {
    errorMessage = "Thông tin này bắt buộc.";
  } else if (!isValid) {
    errorMessage = "Mật khẩu phải có ít nhất 8 kí tự.";
  } else {
    errorMessage = "";
  }

  useEffect(() => {
    onGoodPassword((preState) => ({ ...preState, goodPassword: isValid }));
  }, [isValid, onGoodPassword]);

  return (
    <div className="mb-3">
      <label className="label-input-style">Mật khẩu</label>

      <div className="relative">
        <input
          className={`input-style ${validationStyle}`}
          title="Password"
          id="password"
          name="password"
          type={type}
          placeholder={placeholder}
          required
          onChange={onChange}
          value={value}
        />
        <button
          type="button"
          onClick={handleShowPassword}
          className="absolute right-0 top-[25%] mr-3 text-[18px]"
        >
          {type === "text" ? <LuEye /> : <LuEyeOff />}
        </button>
      </div>

      {showErrorMessage && errorMessage && (
        <div className="my-3 text-sm text-red-600">
          <span>* {errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default EnterPassword;
