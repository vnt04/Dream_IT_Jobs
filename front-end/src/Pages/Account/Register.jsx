import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;
    login(email.value, password.value)
      .then((result) => {
        // eslint-disable-next-line no-unused-vars
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="py-4 flex gap-4 justify-center">
      <form
        onSubmit={handleLogin}
        className="w-[600px] bg-white shadow-md rounded px-12 pt-12 pb-12 mb-4"
      >
        <h2 className="text-2xl text-primary font-semibold mb-2">
          Đăng nhập để tuyển dụng ngay
        </h2>
        <h3 className=" mb-6 text-gray-500">
          Liên kết tài khoản của bạn để tiếp tục sử dụng dịch vụ tuyển dụng của
          Dream IT Jobs
        </h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="name@email.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mật khẩu
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <h3 className=" mb-6 text-gray-500">
          Bằng việc đăng nhập, bạn đồng ý với{" "}
          <span className="font-bold "> Điều Khoản Sử Dụng</span> và
          <span className="font-bold "> Chính Sách Bảo Mật </span>
          của <span className="text-primary font-bold"> Dream IT Jobs</span>.
        </h3>
        <div className="grid gap-5">
          <a
            className="text-end font-bold text-sm text-primary hover:text-teal-400"
            href="#"
          >
            Quên mật khẩu?
          </a>
          <button
            className="btn-1"
            type="submit"
          >
            Đăng nhập
          </button>
        </div>
      </form>

      <form
        // onSubmit={handleLogin}
        className="w-[600px] bg-white shadow-md rounded px-12 pt-12 pb-12 mb-4"
      >
        <h2 className="text-2xl text-primary font-semibold mb-2">
          Đăng ký Tài khoản Nhà tuyển dụng
        </h2>
        <h3 className=" mb-6 text-gray-500">
          Tạo tài khoản ngay để tuyển dụng những lập trình viên hàng đầu
        </h3>
        <strong className="text-red-500">Thông tin đăng nhập</strong>
        <div className="mb-4 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Nhập email"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Số điện thoại
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type=""
            placeholder="Nhập số điện thoại"
          />
        </div>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Mật khẩu
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Xác nhận mật khẩu
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Vui lòng xác nhận mật khẩu"
        />

        <strong className="text-red-500">Thông tin công ty</strong>
        <div className="mb-4 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mã số thuế
          </label>
          <input
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id=""
            type=""
            placeholder="Nhập mã số thuế"
          />

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tên công ty đăng ký kinh doanh
          </label>
          <input
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id=""
            type=""
            placeholder="Nhập tên công ty đăng ký kinh doanh"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tên công ty hiển thị
          </label>
          <input
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id=""
            type=""
            placeholder="Nhập tên công ty của bạn"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Lĩnh vực công ty
          </label>
          <input
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id=""
            type=""
            placeholder="Nhập lĩnh vực công ty"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kỹ năng công ty
          </label>
          <input
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id=""
            type=""
            placeholder="Nhập kỹ năng công ty"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Trụ sở công ty
          </label>
          <input
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id=""
            type=""
            placeholder="Nhập trụ sở công ty"
          />
          <h3 className=" mb-6 text-gray-500">
            Tôi đã đọc và chấp thuận với
            <span className="font-bold "> Điều Khoản Sử Dụng</span> và
            <span className="font-bold "> Chính Sách Bảo Mật </span>
            của{" "}
            <span className="text-primary font-bold"> Dream IT Jobs</span>.
          </h3>
          <button
            className="w-full btn-1"
            type="submit"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
