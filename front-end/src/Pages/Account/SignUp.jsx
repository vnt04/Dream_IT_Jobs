import { Link } from "react-router-dom";
import InputTemplate from "../../components/InputTemplate";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import useLogin from "../../hooks/useLogin";
import useSignUp from "../../hooks/useSignUp";

function SignUp() {
  const { loginWithGoogle, loginWithGithub } = useLogin();
  const { signUpCandidate } = useSignUp();
  const handleSignUp = (event) => {
    event.preventDefault();
    const { fullName, email, password, confirmPassword } =
      event.target.elements;
    signUpCandidate(
      fullName.value,
      email.value,
      password.value,
      confirmPassword.value,
    );
  };
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

        <button type="submit" className="btn-1 mt-4 w-full">
          Đăng ký
        </button>

        {/* social login */}
        <div className="mx-auto mt-4 w-full text-center">
          <p className="mb-4">Hoặc đăng nhập nhanh với</p>

          <div className="mx-auto flex w-full items-center justify-center gap-4">
            <button
              className="focus:shadow-outline flex items-center gap-2 rounded bg-red-500 px-6 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
              type="button"
              onClick={loginWithGoogle}
            >
              <FaGoogle /> Google
            </button>
            <button
              className="focus:shadow-outline flex items-center gap-2 rounded bg-gray-700 px-6 py-2 font-bold text-white hover:bg-gray-600 focus:outline-none"
              onClick={loginWithGithub}
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
