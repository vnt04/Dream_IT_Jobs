import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useLocation } from "react-router-dom";

function EmailVerification() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  return (
    <div className="flex w-full flex-col items-center py-20 text-center">
      <MdOutlineMarkEmailRead size={100} />
      <b className="text-2xl">Xác minh địa chỉ email của bạn</b>
      <span>
        Chúng tôi đã gửi một email xác thực đến <b>{email}.</b>
      </span>
      <span>
        Vui lòng xác minh email để có thể đăng nhập và sử dụng dịch vụ của{" "}
        <span className="font-bold text-primary">Dream IT Jobs</span>.
      </span>
      <span>
        Nếu không nhìn thấy email này, bạn có thể kiểm tra cả trong phần thư
        Spam hoặc thư rác.
      </span>
    </div>
  );
}

export default EmailVerification;
