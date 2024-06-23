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
      confirmPassword.value
    );
  };
  return (
    <div className="py-4 flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="w-[600px] bg-white shadow-2xl rounded px-8 pt-8 pb-8 mb-2"
      >
        <h3 className="text-xl text-primary font-semibold mb-2">
          Chào mừng bạn đến với Dream IT Jobs
        </h3>
        <h3 className=" mb-3 text-gray-500">
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

        <button type="submit" className="w-full mt-4 btn-1 ">
          Đăng ký
        </button>

        {/* social login */}
        <div className="mt-4 text-center w-full mx-auto">
          <p className="mb-4">Hoặc đăng nhập nhanh với</p>

          <div className="flex items-center justify-center gap-4 w-full mx-auto">
            <button
              className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-2 py-2 px-6 font-bold rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={loginWithGoogle}
            >
              <FaGoogle /> Google
            </button>
            <button
              className="bg-gray-700 text-white hover:bg-gray-600 flex items-center gap-2 py-2 px-6 font-bold rounded focus:outline-none focus:shadow-outline"
              onClick={loginWithGithub}
              type="button"
            >
              <FaGithub /> Github
            </button>
          </div>
        </div>
        <div className="mt-4 flex gap-2 justify-center">
          <h3>Bạn chưa có tài khoản?</h3>
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
