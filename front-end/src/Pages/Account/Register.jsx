import { useState } from "react";
import InputTemplate from "../../components/InputTemplate";
import CustomModal from "../../components/CustomModal";
import useLogin from "../../hooks/useLogin";
import useSignUp from "../../hooks/useSignUp";

function Register() {
  const { loginWithEmail } = useLogin();
  const { signUpRecruiter } = useSignUp();

  const [agreeRegister, setAgreeRegister] = useState(false);
  const [agreeLogin, setAgreeLogin] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showNoteLogin, setShowNoteLogin] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

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
      loginWithEmail(email.value, password.value);
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
        () => setShowPopUp(true)
      );
    }
  };
  return (
    <div className="py-4 flex gap-4 justify-center">
      {/* Form Login recruiter */}
      <form
        onSubmit={handleLogin}
        className="w-[600px] bg-white shadow-2xl rounded px-12 pt-6 pb-12 mb-4"
      >
        <h2 className="text-2xl text-primary font-semibold mb-2">
          Đăng nhập để tuyển dụng ngay
        </h2>
        <h3 className=" mb-6 text-gray-500">
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
          placeholder="******************"
        />
        <div className="flex gap-2 items-start mb-6">
          <input
            type="checkbox"
            checked={agreeLogin}
            onChange={() => {
              setAgreeLogin((pre) => !pre);
              setShowNoteLogin(false);
            }}
            className="mt-2"
          />
          <h3 className=" items-start text-gray-500">
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <span className="font-bold "> Điều Khoản Sử Dụng</span> và
            <span className="font-bold "> Chính Sách Bảo Mật </span>
            của <span className="text-primary font-bold"> Dream IT Jobs</span>.
          </h3>
        </div>
        {showNoteLogin && (
          <h1 className="py-2 text-red-500">
            Vui lòng đồng ý với điều khoản và chính sách bảo mật của chúng tôi
          </h1>
        )}
        <div className="grid gap-5">
          <a
            className="text-end font-bold text-sm text-primary hover:text-teal-400"
            href="#"
          >
            Quên mật khẩu?
          </a>
          <button className="btn-1" type="submit">
            Đăng nhập
          </button>
        </div>
      </form>
      {/* Form register recruiter */}
      <form
        onSubmit={handleRegister}
        className="w-[600px] bg-white shadow-2xl rounded px-12 pt-6 pb-6 mb-4"
      >
        <h2 className="text-2xl text-primary font-semibold mb-2">
          Đăng ký Tài khoản Nhà tuyển dụng
        </h2>
        <h3 className=" mb-6 text-gray-500">
          Tạo tài khoản ngay để tuyển dụng những lập trình viên hàng đầu
        </h3>
        <div className="flex gap-1 justify-between">
          <div className="w-2/3">
            <InputTemplate
              title="Tên công ty"
              name="company"
              type="text"
              placeholder="Ví dụ: TMA Solution"
            />
          </div>
          <InputTemplate
            title="Mã số thuế"
            name="mst"
            type="text"
            placeholder="Ví dụ:0101778572"
          />
        </div>
        <div className="flex gap-1 justify-between">
          <div className="w-2/3">
            <InputTemplate
              title="Họ và tên"
              name="displayName"
              type=""
              placeholder="Nguyễn Văn A"
            />
          </div>
          <InputTemplate
            title="Vị trí hiện tại"
            name="position"
            type=""
            placeholder="Ví dụ: HR Specialist"
          />
        </div>
        <div className="flex justify-between">
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
        <div className="flex gap-2 items-baseline">
          <input
            type="checkbox"
            checked={agreeRegister}
            onChange={() => {
              setAgreeRegister((pre) => !pre);
              setShowNote(false);
            }}
            className="mt-2"
          />
          <h3 className=" mb-2 text-gray-500">
            Tôi đã đọc và chấp thuận với
            <span className="font-bold "> Điều Khoản Sử Dụng</span> và
            <span className="font-bold "> Chính Sách Bảo Mật </span>
            của <span className="text-primary font-bold"> Dream IT Jobs</span>.
          </h3>
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
        <button className="w-full btn-1" type="submit">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;
