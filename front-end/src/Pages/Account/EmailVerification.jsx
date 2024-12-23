import { useEffect, useState } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useLocation } from "react-router-dom";
import userApi from "../../api/userApi";

function EmailVerification() {
  const [isVerified, setIsVerified] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const emailToken = params.get("emailToken");

  useEffect(() => {
    const checkVerified = async () => {
      try {
        const response = await userApi.isVerifiedEmail(email);
        setIsVerified(response);
        if (response) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handle = async () => {
      try {
        await userApi.verifyEmail(emailToken);
        setIsVerified(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };

    if (email) {
      checkVerified();
    }
    if (emailToken) {
      handle();
    }
  }, []);

  return (
    <>
      {!isVerified ? (
        <div className="flex w-full flex-col items-center py-20 text-center">
          <MdOutlineMarkEmailRead size={100} color="red" />
          <b className="text-2xl text-red-600">
            Xác minh địa chỉ email {email}
          </b>
          <span>Chúng tôi đã gửi một email xác thực đến email của bạn.</span>
          <span>
            Vui lòng xác minh email để có thể đăng nhập và sử dụng dịch vụ của{" "}
            <span className="font-bold text-primary">Dream IT Jobs</span>.
          </span>
          <span>
            Nếu không nhìn thấy email này, bạn có thể kiểm tra cả trong phần thư
            Spam hoặc thư rác.
          </span>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center py-20 text-center">
          <MdOutlineMarkEmailRead size={100} color="green" />
          <h1 className="text-2xl">Email của bạn đã xác thực thành công...</h1>
        </div>
      )}
    </>
  );
}

export default EmailVerification;
