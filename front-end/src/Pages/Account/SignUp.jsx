import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithGithub,
  loginWithGoogle,
  signUpRequest,
} from "../../redux/actions/authActions";
import useNotification from "../../hooks/useNotification";

import InputTemplate from "../../components/InputTemplate";
import EnterEmail from "../../components/EnterEmail";
import EnterPassword from "../../components/EnterPassword";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

function SignUp() {
  const dispatch = useDispatch();
  const { checkConfirmPassword, errorHandler, successSignUp } =
    useNotification();
  const { loading, error, signUpSuccess } = useSelector((state) => state.auth);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    emailValidated: false,
    goodEmail: false,
    password: "",
    passwordValidated: false,
    goodPassword: false,
    confirmPassword: "",
    confirmPasswordValidated: false,
    goodConfirmPassword: false,
  });

  const handleSignUp = (event) => {
    event.preventDefault();
    const { fullName } = event.target.elements | "";

    setSignUpForm((preFormState) => ({
      ...preFormState,
      emailValidated: true,
      passwordValidated: true,
      confirmPasswordValidated: true,
    }));

    if (
      signUpForm.goodEmail &&
      signUpForm.goodPassword &&
      signUpForm.goodConfirmPassword
    ) {
      if (
        checkConfirmPassword(signUpForm.password, signUpForm.confirmPassword)
      ) {
        setSignUpForm((preFormState) => ({
          ...preFormState,
          emailValidated: false,
          passwordValidated: false,
          confirmPasswordValidated: false,
        }));
        dispatch(
          signUpRequest(signUpForm.email, signUpForm.password, fullName),
        );
      }
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
        noValidate
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
        <EnterEmail
          placeholder="name@gmail.com"
          onChange={(e) =>
            setSignUpForm((preFormState) => ({
              ...preFormState,
              email: e.target.value,
            }))
          }
          value={signUpForm.email}
          showErrorMessage={signUpForm.emailValidated}
          onGoodEmail={setSignUpForm}
        />
        <EnterPassword
          id="password"
          title="Mật khẩu"
          value={signUpForm.password}
          placeholder="Nhập mật khẩu"
          onChange={(e) =>
            setSignUpForm((preFormState) => ({
              ...preFormState,
              password: e.target.value,
            }))
          }
          showErrorMessage={signUpForm.passwordValidated}
          onGoodPassword={setSignUpForm}
        />
        <EnterPassword
          value={signUpForm.confirmPassword}
          id="confirmPassword"
          title="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
          onChange={(e) =>
            setSignUpForm((preFormState) => ({
              ...preFormState,
              confirmPassword: e.target.value,
            }))
          }
          showErrorMessage={signUpForm.confirmPasswordValidated}
          onGoodPassword={setSignUpForm}
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
