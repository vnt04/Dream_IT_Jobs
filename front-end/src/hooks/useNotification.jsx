import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useNotification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errorHandler = (error) => {
    let errorMessage = "";
    if (error) {
      switch (error) {
        case "Firebase: Error (auth/invalid-credential).":
          errorMessage = "Sai email hoặc mật khẩu !";
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          errorMessage = "Địa chỉ email đã được sử dụng !";
          break;
        case "Firebase: Error (auth/account-exists-with-different-credential).":
          errorMessage = "Địa chỉ email đã được sử dụng !";
          break;
        case "Firebase: Error (auth/network-request-failed).":
          errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối của bạn.";
          break;
        case "Firebase: Error (auth/invalid-email).":
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
        navigate(from, { replace: true });
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
