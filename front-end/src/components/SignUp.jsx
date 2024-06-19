import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function SignUp() {
  const { signUpWithGmail, createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleQuickLogin = () => {
    signUpWithGmail()
      .then((result) => {
        // eslint-disable-next-line no-unused-vars
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    const { fullName, email, password, confirmPassword } =
      event.target.elements;

    if (password.value !== confirmPassword.value) {
      alert("Mật khẩu không khớp!");
    } else {
      const userInfo = {
        email: email.value,
        password: password.value,
        role: "candidate",
        displayName: fullName.value,
      };
      createUser(userInfo)
        .then(() => {
          navigate('/login');
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="py-4 flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="w-[600px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2"
      >
        <h3 className="text-xl text-background font-semibold mb-2">
          Chào mừng bạn đến với Dream IT Jobs
        </h3>
        <h3 className=" mb-3 text-gray-500">
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội việc làm bạn
          mơ ước
        </h3>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Họ tên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            placeholder="Nhập họ tên"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="name@email.com"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Mật khẩu
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Xác nhận lại mật khẩu
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <div className="grid gap-5">
          <a
            className="text-end font-bold text-sm text-background hover:text-teal-400"
            href="#"
          >
            Quên mật khẩu?
          </a>

          <button
            className="bg-background text-white py-2 font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Đăng ký
          </button>
        </div>

        {/* social login */}
        <div className="mt-4 text-center w-full mx-auto">
          <p className="mb-4">Hoặc đăng nhập nhanh với</p>

          <div className="flex items-center justify-center gap-4 w-full mx-auto">
            <button
              className="bg-red-500 text-white flex items-center gap-2 py-2 px-6 font-bold rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleQuickLogin}
            >
              <FaGoogle /> Google
            </button>
            <button
              className="bg-gray-700 text-white flex items-center gap-2 py-2 px-6 font-bold rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              <FaGithub /> Github
            </button>
          </div>
        </div>
        <div className="mt-4 flex gap-2 justify-center">
          <h3>Bạn chưa có tài khoản?</h3>
          <Link
            className="font-semibold text-background hover:text-teal-400"
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
