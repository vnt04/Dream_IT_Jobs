import { useEffect } from "react";

/* eslint-disable react/prop-types */
const EnterEmail = ({
  placeholder,
  value,
  onChange,
  showErrorMessage,
  onGoodEmail,
}) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(value);
  //   Write code to validator email here
  const validationStyle = value
    ? isValid
      ? "border-green-600 "
      : "border-red-600"
    : " ";

  let errorMessage;
  if (!value) {
    errorMessage = "Thông tin này bắt buộc.";
  } else if (!isValid) {
    errorMessage = "Email không hợp lệ.";
  } else {
    errorMessage = "";
  }

  // update status of email is valid or inValid to Parent Component
  useEffect(() => {
    onGoodEmail((preState) => ({ ...preState, goodEmail: isValid }));
  }, [isValid, onGoodEmail]);

  return (
    <div className="mb-3">
      <label className="label-input-style">Email</label>

      <input
        className={`input-style ${validationStyle} `}
        title="Email"
        id="email"
        name="email"
        type="email"
        placeholder={placeholder}
        required
        onChange={onChange}
        value={value}
      />

      {showErrorMessage && errorMessage && (
        <div className="my-3 text-sm text-red-600">
          <span>* {errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default EnterEmail;
