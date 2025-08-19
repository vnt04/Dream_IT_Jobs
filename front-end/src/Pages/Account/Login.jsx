import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loginRequest,
  loginWithGithub,
  resetState,
} from "../../redux/actions/authActions";
import useNotification from "../../hooks/useNotification";

import { FaGithub, FaGoogle } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import EnterEmail from "../../components/EnterEmail";
import EnterPassword from "../../components/EnterPassword";
import apiEndpoint from "../../api";

function Login() {
  const [formState, setFormState] = useState({
    email: "",
    emailValidated: false,
    goodEmail: false,
    password: "",
    passwordValidated: false,
    goodPassword: false,
  });

  const dispatch = useDispatch();
  const { user, loading, error, loginSuccess } = useSelector(
    (state) => state.auth,
  );
  const { errorHandler, successLogin } = useNotification();

  const handleLogin = (event) => {
    event.preventDefault();
    setFormState((preFormState) => ({
      ...preFormState,
      emailValidated: true,
      passwordValidated: true,
    }));
    if (formState.goodEmail && formState.goodPassword) {
      setFormState((preFormState) => ({
        ...preFormState,
        emailValidated: false,
        passwordValidated: false,
      }));
      dispatch(loginRequest(formState.email, formState.password));
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      localStorage.setItem("current-user", JSON.stringify(user));
      successLogin();
    } else {
      localStorage.removeItem("current-user");
    }
    if (error) {
      errorHandler(error);
      dispatch(resetState());
    }
  }, [error, loginSuccess]);

  return (
    <div className="flex items-center justify-center py-4">
      <form
        type="submit"
        className="mb-4 max-w-[600px] rounded bg-white px-12 pb-12 pt-12 shadow-2xl"
        noValidate
      >
        <h3 className="mb-2 text-xl font-semibold text-primary">
          Chào mừng bạn đã quay trở lại
        </h3>
        <h3 className="mb-6 text-gray-500">
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội việc làm bạn
          mơ ước
        </h3>
        {/* Email login */}
        <EnterEmail
          placeholder="name@gmail.com"
          onChange={(e) =>
            setFormState((preFormState) => ({
              ...preFormState,
              email: e.target.value,
            }))
          }
          value={formState.email}
          showErrorMessage={formState.emailValidated}
          onGoodEmail={setFormState}
        />

        {/* Password login */}
        <EnterPassword
          value={formState.password}
          id="password"
          title="Mật khẩu"
          placeholder="•••••••••••••••••••••"
          onChange={(e) =>
            setFormState((preFormState) => ({
              ...preFormState,
              password: e.target.value,
            }))
          }
          showErrorMessage={formState.passwordValidated}
          onGoodPassword={setFormState}
        />

        <div className="mb-8 flex justify-end">
          <Link
            className="text-sm font-bold text-primary hover:text-teal-400"
            to={"/password"}
          >
            Quên mật khẩu?
          </Link>
        </div>
        <button
          onClick={handleLogin}
          className="btn-1 w-full"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" loading={loading} size={25} />
          ) : (
            <span>Đăng nhập</span>
          )}
        </button>

        {/* social login */}
        <div className="mx-auto mt-8 w-full text-center">
          <p className="mb-4">Hoặc đăng nhập nhanh với</p>

          <div className="mx-auto flex w-full items-center justify-center gap-4">
            <button
              className="focus:shadow-outline flex items-center gap-2 rounded bg-red-500 px-6 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
              onClick={() => (window.location.href = apiEndpoint.google_login)}
              type="button"
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
        <div className="mt-4 text-center sm:flex sm:justify-center sm:space-x-2">
          <h3>Bạn chưa có tài khoản?</h3>
          <Link
            className="font-semibold text-primary hover:text-teal-400"
            to={"/sign-up"}
          >
            Đăng kí ngay
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
