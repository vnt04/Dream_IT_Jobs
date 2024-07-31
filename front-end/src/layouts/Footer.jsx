import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";

function Footer() {
  return (
    <div className="container bg-gray-300">
      <div className="space-y-4 py-10 lg:grid lg:grid-cols-3 lg:gap-2">
        <div className="h-full space-y-2">
          <a href="/">
            <img
              src="/src/assets/logo_gray.jpg"
              alt="logo"
              className="h-20 w-40"
            />
          </a>
          <div>
            Địa chỉ: QTSC Building 1, Khu Công viên phần mềm Quang Trung, P. Tân
            Chánh Hiệp, Q.12, TP.HCM, Việt Nam
          </div>
          <div>Liên hệ: 028 6273 3496 - contact@dreamitjobs.vn</div>
          <div>
            <h1 className="font-bold">Chứng nhận bởi</h1>
            <img
              src="/src/assets/logo_bocongthuong.jpg"
              alt="logo"
              className="h-16 w-40 py-2"
            />
          </div>
        </div>
        <div className="max-md:space-y-4 md:grid md:grid-cols-4 md:gap-2 lg:col-span-2">
          <div className="h-full">
            <h1 className="font-bold">Về Dream IT Jobs</h1>
            <ul className="space-y-2 py-3">
              <li>Về chúng tôi</li>
              <li>Liên hệ</li>
              <li>Thỏa thuận sử dụng</li>
              <li>Cơ hội việc làm</li>
              <li>Quy định bảo mật</li>
              <li>
                Quy chế hoạt động của sàn giao dịch thương mại điện tử Dream IT
                Jobs{" "}
              </li>
              <li>Giải quyết khiếu nại</li>
            </ul>
          </div>
          <div className="h-full">
            <h1 className="font-bold">Ứng viên</h1>
            <ul className="space-y-2 py-3">
              <li>Tính lương Gross - Net</li>
              <li>Tạo CV</li>
              <li>Tìm kiếm công việc IT</li>
              <li>Trắc nghiệm tính cách</li>
            </ul>
          </div>
          <div className="h-full">
            <h1 className="font-bold">Nhà tuyển dụng</h1>
            <ul className="space-y-2 py-3">
              <li>Đăng việc làm IT</li>
              <li>Tìm kiếm nhân tài</li>
              <li>Báo cáo thị trường IT</li>
              <li>Tạo tài khoản</li>
            </ul>
          </div>
          <div className="h-full">
            <h1 className="mb-4 text-center font-bold">
              Theo dõi chúng tôi tại
            </h1>
            <div className="mb-4 flex justify-center gap-2">
              <FaSquareFacebook className="size-10" />
              <FaInstagramSquare className="size-10" />
              <IoLogoYoutube className="size-10" />
            </div>
            <div className="flex justify-center gap-2">
              <AiFillTikTok className="size-10" />
              <FaTwitterSquare className="size-10" />
            </div>
          </div>
        </div>
      </div>
      <h1 className="h-20 text-center">
        Copyright © CÔNG TY CỔ PHẦN APPLANCER / ĐKKD: 031 303 2338 - Cấp ngày:
        27/11/2014
      </h1>
    </div>
  );
}

export default Footer;
