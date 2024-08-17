import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/actions/authActions";

import InputTemplate from "../../components/InputTemplate";
import CustomModal from "../../components/CustomModal";
import useSignUp from "../../hooks/useSignUp";

function Register() {
  const [agreeRegister, setAgreeRegister] = useState(false);
  const [agreeLogin, setAgreeLogin] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showNoteLogin, setShowNoteLogin] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.authReducer);
  const { signUpRecruiter } = useSignUp();

  const handleClose = () => {
    setShowPopUp(false);
    window.location.href = "";
  };

  const footerActions = [
    {
      variant: "secondary",
      label: "Đóng",
      onClick: handleClose,
    },
    {
      variant: "primary",
      label: "Tôi đã hiểu",
      onClick: handleClose,
    },
  ];

  const handleLogin = (event) => {
    event.preventDefault();
    if (!agreeLogin) {
      setShowNoteLogin((pre) => !pre);
    } else {
      const { email, password } = event.target.elements;
      dispatch(loginRequest(email.value, password.value));
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (!agreeRegister) {
      setShowNote((pre) => !pre);
    } else {
      const {
        email,
        password,
        confirmPassword,
        company,
        mst,
        phone,
        displayName,
        position,
      } = event.target.elements;
      signUpRecruiter(
        email.value,
        password.value,
        confirmPassword.value,
        company.value,
        phone.value,
        displayName.value,
        position.value,
        mst.value,
        () => setShowPopUp(true),
      );
    }
  };
  return (
    <div className="flex space-x-2 py-4 max-lg:flex-col max-lg:items-center lg:flex lg:justify-center">
      {/* Form Login recruiter */}
      <form
        onSubmit={handleLogin}
        className="mb-4 max-w-[600px] rounded bg-white px-12 pb-12 pt-6 shadow-2xl"
      >
        <h2 className="mb-2 text-2xl font-semibold text-primary">
          Đăng nhập để tuyển dụng ngay
        </h2>
        <h3 className="mb-6 text-gray-500">
          Liên kết tài khoản của bạn để tiếp tục sử dụng dịch vụ tuyển dụng của
          Dream IT Jobs
        </h3>
        <InputTemplate
          title="Email"
          type="email"
          name="email"
          placeholder="name@gmail.com"
        />
        <InputTemplate
          title="Mật khẩu"
          type="password"
          name="password"
          placeholder="•••••••••••••••••••••"
        />
        <div className="mb-6 flex items-start gap-2">
          <input
            type="checkbox"
            checked={agreeLogin}
            id="agree-to-login"
            onChange={() => {
              setAgreeLogin((pre) => !pre);
              setShowNoteLogin(false);
            }}
            className="mt-1.5 checked:accent-primary"
          />
          <label htmlFor="agree-to-login" className="items-start text-gray-500">
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <span className="font-bold"> Điều Khoản Sử Dụng</span> và
            <span className="font-bold"> Chính Sách Bảo Mật </span>
            của <span className="font-bold text-primary"> Dream IT Jobs</span>.
          </label>
        </div>
        {showNoteLogin && (
          <h1 className="py-2 text-red-500">
            Vui lòng đồng ý với điều khoản và chính sách bảo mật của chúng tôi
          </h1>
        )}
        <div className="grid gap-5">
          <Link
            className="text-end text-sm font-bold text-primary hover:text-teal-400"
            to={"/password"}
          >
            Quên mật khẩu?
          </Link>
          <button className="btn-1" type="submit">
            Đăng nhập
          </button>
        </div>
      </form>
      {/* Form register recruiter */}
      <form
        onSubmit={handleRegister}
        className="mb-4 max-w-[600px] rounded bg-white px-12 pb-6 pt-6 shadow-2xl"
      >
        <h2 className="mb-2 text-2xl font-semibold text-primary">
          Đăng ký Tài khoản Nhà tuyển dụng
        </h2>
        <h3 className="mb-6 text-gray-500">
          Tạo tài khoản ngay để tuyển dụng những lập trình viên hàng đầu
        </h3>
        <div className="">
          <InputTemplate
            title="Tên công ty"
            name="company"
            type="text"
            placeholder="Ví dụ: TMA Solution"
          />
          <InputTemplate
            title="Mã số thuế"
            name="mst"
            type="text"
            placeholder="Ví dụ:0101778572"
          />

          <InputTemplate
            title="Họ và tên"
            name="displayName"
            type=""
            placeholder="Nguyễn Văn A"
          />
          <InputTemplate
            title="Vị trí hiện tại"
            name="position"
            type=""
            placeholder="Ví dụ: HR Specialist"
          />

          <InputTemplate
            title="Email ( vui lòng sử dụng email công ty)"
            name="email"
            type="email"
            placeholder="Ví dụ: hr@gmail.com"
          />
          <InputTemplate
            title="Số điện thoại"
            name="phone"
            placeholder="Ví dụ: 0915701619"
          />
        </div>
        <InputTemplate
          title="Mật khẩu"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
        />
        <InputTemplate
          title="Xác nhận lại mật khẩu"
          name="confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
        />
        <div className="flex items-baseline gap-2">
          <input
            type="checkbox"
            id="agree-to-register"
            checked={agreeRegister}
            onChange={() => {
              setAgreeRegister((pre) => !pre);
              setShowNote(false);
            }}
            className="mt-1.5 checked:accent-primary"
          />
          <label htmlFor="agree-to-register" className="mb-2 text-gray-500">
            Tôi đã đọc và chấp thuận với
            <span className="font-bold"> Điều Khoản Sử Dụng</span> và
            <span className="font-bold"> Chính Sách Bảo Mật </span>
            của <span className="font-bold text-primary"> Dream IT Jobs</span>.
          </label>
        </div>
        {showNote && (
          <h1 className="py-2 text-red-500">
            Vui lòng đồng ý với điều khoản và chính sách bảo mật của chúng tôi
          </h1>
        )}
        <CustomModal
          show={showPopUp}
          handleClose={handleClose}
          title="Đăng ký thành công"
          body="Cảm ơn bạn đã đăng kí tuyển dụng với Dream IT Jobs. 
          Bộ phận CSKH của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!"
          footerActions={footerActions}
        />
        <button className="btn-1 w-full" type="submit">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;
