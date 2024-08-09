import { Link } from "react-router-dom";
import InputTemplate from "../../components/InputTemplate";
import useLogin from "../../hooks/useLogin";
import { FaGithub, FaGoogle } from "react-icons/fa6";

function Login() {
  const { loginWithGoogle, loginWithGithub, loginWithEmail } = useLogin();
  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    loginWithEmail(email.value, password.value);
  };
  
  return (
    <div className="flex items-center justify-center py-4">
      <form
        onSubmit={handleLogin}
        className="mb-4 max-w-[600px] rounded bg-white px-12 pb-12 pt-12 shadow-2xl"
      >
        <h3 className="mb-2 text-xl font-semibold text-primary">
          Chào mừng bạn đã quay trở lại
        </h3>
        <h3 className="mb-6 text-gray-500">
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội việc làm bạn
          mơ ước
        </h3>
        <InputTemplate
          title="Email"
          name="email"
          type="email"
          placeholder="name@gmail.com"
        />
        <InputTemplate
          title="Mật khẩu"
          name="password"
          type="password"
          placeholder="•••••••••••••••••••••"
        />
        <a
          className="mb-8 flex justify-end text-sm font-bold text-primary hover:text-teal-400"
          href="#"
        >
          Quên mật khẩu?
        </a>

        <button type="submit" className="btn-1 w-full">
          Đăng nhập
        </button>
        {/* social login */}
        <div className="mx-auto mt-8 w-full text-center">
          <p className="mb-4">Hoặc đăng nhập nhanh với</p>

          <div className="mx-auto flex w-full items-center justify-center gap-4">
            <button
              className="focus:shadow-outline flex items-center gap-2 rounded bg-red-500 px-6 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
              onClick={loginWithGoogle}
              type="button"
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
        <div className="mt-4 text-center sm:flex sm:space-x-2 sm:justify-center">
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
