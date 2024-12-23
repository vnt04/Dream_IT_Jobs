import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useNotification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const errorHandler = (error) => {
    let errorMessage = "";
    if (error) {
      switch (error) {
        case "Wrong Password.":
          errorMessage = "Sai mật khẩu !";
          break;
        case "Email exists.":
          errorMessage = "Địa chỉ email đã được sử dụng !";
          break;
        case "Invalid Email":
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
        window.location.href = from;
      },
    });
  };

  const successSignUp = (email) => {
    toast.success("Đăng kí tài khoản thành công!", {
      autoClose: 1000,
      position: "top-center",
      onClose: () => {
        navigate(`/verify-email?email=${email}`);
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
    toast.success("Đăng xuất thành công!", {
      autoClose: 1000,
      position: "top-right",
      onClose: () => {
        window.location.href = from;
      },
    });
  };

  return {
    errorHandler,
    successLogin,
    successSignUp,
    checkConfirmPassword,
    successLogout,
  };
};

export default useNotification;
