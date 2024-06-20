import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import InputTemplate from "../../components/InputTemplate";

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
        className="w-[600px] bg-white shadow-2xl rounded px-12 pt-12 pb-12 mb-4"
      >
        <h2 className="text-2xl text-primary font-semibold mb-2">
          Đăng nhập để tuyển dụng ngay
        </h2>
        <h3 className=" mb-6 text-gray-500">
          Liên kết tài khoản của bạn để tiếp tục sử dụng dịch vụ tuyển dụng của
          Dream IT Jobs
        </h3>
        <InputTemplate
          title="Email"
          type="email"
          name="email"
          placeholder="name@gmail.com"
        />
        <InputTemplate
          title="Password"
          type="password"
          name="password"
          placeholder="******************"
        />
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
          <button className="btn-1" type="submit">
            Đăng nhập
          </button>
        </div>
      </form>

      <form
        // onSubmit={handleLogin}
        className="w-[600px] bg-white shadow-2xl rounded px-12 pt-12 pb-12 mb-4"
      >
        <h2 className="text-2xl text-primary font-semibold mb-2">
          Đăng ký Tài khoản Nhà tuyển dụng
        </h2>
        <h3 className=" mb-6 text-gray-500">
          Tạo tài khoản ngay để tuyển dụng những lập trình viên hàng đầu
        </h3>
        <strong className="text-red-500">Thông tin đăng nhập</strong>
        <InputTemplate
          title="Email"
          id="email"
          type="email"
          placeholder="Nhập email"
        />
        <InputTemplate
          title="Số điện thoại"
          id="phone"
          placeholder="Nhập số điện thoai"
        />

        <InputTemplate
          title="Mật khẩu"
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
        />
        <InputTemplate
          title="Xác nhận lại mật khẩu"
          id="password"
          type="password"
          placeholder="Vui lòng xác nhận mật khẩu"
        />

        <strong className="text-red-500">Thông tin công ty</strong>
        <div className="mb-4 mt-2">
          <InputTemplate
            title="Mã số thuế"
            id=""
            type=""
            placeholder="Nhập mã số thuế"
          />

          <InputTemplate
            title="Tên công ty"
            id=""
            type=""
            placeholder="Nhập tên công ty đăng ký kinh doanh"
          />
          <InputTemplate
            title="Tên công ty hiển thị"
            id=""
            type=""
            placeholder="Nhập tên công ty của bạn"
          />
          <InputTemplate
            title="Lĩnh vực"
            id=""
            type=""
            placeholder="Nhập lĩnh vực của công ty "
          />
          <InputTemplate
            title="Kỹ năng"
            id=""
            type=""
            placeholder="Nhập kỹ năng công ty"
          />

          <InputTemplate
            title="Trụ sở công ty"
            id=""
            type=""
            placeholder="Nhập trụ sở công ty"
          />
          <h3 className=" mb-6 text-gray-500">
            Tôi đã đọc và chấp thuận với
            <span className="font-bold "> Điều Khoản Sử Dụng</span> và
            <span className="font-bold "> Chính Sách Bảo Mật </span>
            của <span className="text-primary font-bold"> Dream IT Jobs</span>.
          </h3>
          <button className="w-full btn-1" type="submit">
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
