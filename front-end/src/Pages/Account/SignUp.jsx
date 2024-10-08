import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithGithub,
  loginWithGoogle,
  signUpRequest,
} from "../../redux/actions/authActions";
import useNotification from "../../hooks/useNotification";

import InputTemplate from "../../components/InputTemplate";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";

function SignUp() {
  const dispatch = useDispatch();
  const { checkConfirmPassword, errorHandler, successSignUp } =
    useNotification();
  const { loading, error, signUpSuccess } = useSelector((state) => state.auth);

  const handleSignUp = (event) => {
    event.preventDefault();
    const { fullName, email, password, confirmPassword } =
      event.target.elements;
    if (checkConfirmPassword(password.value, confirmPassword.value)) {
      dispatch(signUpRequest(email.value, password.value, fullName.value));
    }
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      errorHandler(error);
    }
    if (signUpSuccess) {
      successSignUp("tranvannghiep@gmail.com");
    }
  }, [error, errorHandler, successSignUp, signUpSuccess]);
  return (
    <div className="flex items-center justify-center py-4">
      <form
        onSubmit={handleSignUp}
        className="mb-2 w-[600px] rounded bg-white px-8 pb-8 pt-8 shadow-2xl"
      >
        <h3 className="mb-2 text-xl font-semibold text-primary">
          Chào mừng bạn đến với Dream IT Jobs
        </h3>
        <h3 className="mb-3 text-gray-500">
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội việc làm bạn
          mơ ước
        </h3>
        <InputTemplate
          title="Họ tên"
          id="fullName"
          type="text"
          placeholder="Nhập họ tên"
        />
        <InputTemplate
          title="Email"
          id="email"
          type="email"
          placeholder="name@gmail.com"
        />
        <InputTemplate
          title="Mật khẩu"
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
        />
        <InputTemplate
          title="Xác nhận lại mật khẩu"
          id="confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
        />

        <button type="submit" className="btn-1 mt-4 w-full" disabled={loading}>
          {loading ? (
            <ClipLoader color="#ffffff" loading={loading} size={20} />
          ) : (
            <span>Đăng kí</span>
          )}
        </button>

        {/* social login */}
        <div className="mx-auto mt-4 w-full text-center">
          <p className="mb-4">Hoặc đăng nhập nhanh với</p>

          <div className="mx-auto flex w-full items-center justify-center gap-4">
            <button
              className="focus:shadow-outline flex items-center gap-2 rounded bg-red-500 px-6 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
              type="button"
              onClick={() => dispatch(loginWithGoogle())}
            >
              <FaGoogle /> Google
            </button>
            <button
              className="focus:shadow-outline flex items-center gap-2 rounded bg-gray-700 px-6 py-2 font-bold text-white hover:bg-gray-600 focus:outline-none"
              onClick={() => dispatch(loginWithGithub())}
              type="button"
            >
              <FaGithub /> Github
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <h3>Bạn đã có tài khoản?</h3>
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

export default SignUp;
