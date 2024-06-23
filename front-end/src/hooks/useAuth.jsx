/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleAuthError = (error) => {
    let errorMessage = "";
    console.log(error.code);
    if (error.code) {
      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "Sai email hoặc mật khẩu !";
          break;
        case "auth/email-already-in-use":
          errorMessage = "Địa chỉ email đã được sử dụng !";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage = "Địa chỉ email đã được sử dụng !";
          break;
        case "auth/network-request-failed":
          errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối của bạn.";
          break;
        case "auth/invalid-email":
          errorMessage = "Địa chỉ email không tồn tại !";
          break;
        default:
          errorMessage = "Có lỗi xảy ra! Vui lòng thử lại!";
      }
    }
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const successLogin = () => {
    toast.success("Đăng nhập thành công!", {
      autoClose: 1000,
      position: "top-center",
      onClose: () => {
        navigate(from, { replace: true });
      },
    });
  };
  const successSignUp = () => {
    toast.success("Đăng kí tài khoản thành công!", {
      autoClose: 1500,
      position: "top-center",
      onClose: () => {
        navigate("/login");
      },
    });
  };
  const checkConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp", {
        autoClose: 1000,
        position: "top-center",
      });
      return false;
    }
    return true;
  };
  const successLogout = () => {
    toast.error("Đăng xuất thành công!", {
      autoClose: 1000,
      position: "top-right",
      onClose: () => {
        navigate(from, { replace: true });
      },
    });
  };
  return {
    handleAuthError,
    successLogin,
    successSignUp,
    checkConfirmPassword,
    successLogout,
  };
};

export default useAuth;
