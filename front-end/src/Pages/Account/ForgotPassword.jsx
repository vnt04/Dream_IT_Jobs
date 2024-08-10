import { useContext } from "react";
import InputTemplate from "../../components/InputTemplate";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePassword = (e) => {
    e.preventDefault();
    const { email } = e.target.elements;
    resetPassword(email.value);
    toast.success("Đã gửi yêu cầu. Vui lòng kiểm tra email!", {
      position: "top-center",
      autoClose: 1500,
      onClose: () => navigate("/login"),
    });
  };

  return (
    <div className="flex items-center justify-center py-4">
      <form
        onSubmit={handlePassword}
        className="mb-4 min-w-[400px] max-w-[600px] space-y-8 rounded bg-white px-12 pb-12 pt-12 shadow-2xl"
      >
        <h3 className="mb-2 text-xl font-semibold text-primary">
          Welcome to Dream IT Jobs
        </h3>
        <InputTemplate
          title="Email"
          name="email"
          type="email"
          placeholder="name@gmail.com"
        />
        <button type="submit" className="btn-1 w-full">
          Đặt lại mật khẩu
        </button>

        <div className="mt-4 text-center sm:flex sm:justify-center sm:space-x-2">
          <h3>Hoặc?</h3>
          <Link
            className="font-semibold text-primary hover:text-teal-400"
            to={"/login"}
          >
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
