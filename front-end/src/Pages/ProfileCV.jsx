import { useNavigate } from "react-router-dom";
import CVTemplate from "../components/CVTemplate";
import { templateCV } from "../resources/defaultData";

function ProfileCV() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="py-4 text-center lg:py-8">
        <h1 className="text-xl font-bold">
          Tạo CV Online chuyên nghiệp dành cho lập trình viên
        </h1>
        <h4 className="">
          Xây dựng hồ sơ của bạn với công cụ tạo CV online và chuẩn hóa CV của
          <span className="font-semibold text-primary"> Dream IT Jobs</span>
        </h4>
      </div>
      <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-3 md:gap-8">
        <div className="space-y-4 lg:space-y-8">
          <div className="space-y-2 rounded-xl border bg-gray-100 p-3">
            <b>Tạo CV</b>
            <h4 className="text-sm">
              Dễ dàng tạo cho mình một CV chuyên nghiệp của lập trình viên.
            </h4>
            <button
              onClick={() => navigate("/blank")}
              className="w-full rounded-xl border border-primary p-2 text-primary hover:bg-gray-200"
            >
              Khám phá ngay &gt;
            </button>
          </div>
          <div className="space-y-2 rounded-xl border bg-gray-100 p-3">
            <b>Chuẩn hóa CV</b>
            <h4 className="text-sm">
              Nhanh chóng chuyển đổi CV có sẵn của bạn thành một CV chuẩn nhất
              của lập trình viên.
            </h4>
            <button
              onClick={() => navigate("/blank")}
              className="w-full rounded-xl border border-primary p-2 text-primary hover:bg-gray-200"
            >
              Khám phá ngay &gt;
            </button>
          </div>
        </div>
        <div className="w-full shadow-2xl md:col-span-2">
          <img
            src="src/assets/profile_page.jpg"
            alt=""
            className="mx-auto h-auto max-w-full bg-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-3 lg:gap-8">
        {[
          {
            title: "Cấu trúc CV chuẩn - Dành riêng cho lập trình viên",
            text: "Chọn lọc các thông tin tiêu chuẩn và cấu trúc thống nhất giúp Nhà tuyển dụng dễ dàng đánh giá kinh nghiệm và Tech stack của bạn",
          },
          {
            title: "Các mẫu CV IT được chọn lọc kỹ càng",
            text: "Dựa trên hơn 1.000 mẫu CV Developer nổi bật trên thế giới, ứng tuyển thành công các vị trí tại các tập đoàn công nghệ lớn Microsoft, Google, Amazon…",
          },
          {
            title: "Quản lý CV online và ứng tuyển dễ dàng",
            text: "Đồng bộ quản lý CV của bạn trên tất cả các thiết bị, ứng tuyển dễ dàng chỉ với một click",
          },
        ].map((item) => (
          <div key={item.title} className="text-center">
            <b>{item.title}</b>
            <div>{item.text}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <a href="/blank" className="btn-1">
          Tạo CV ngay{" "}
        </a>
      </div>
      <div>
        <div>
          <div className="py-4">
            <h1 className="text-xl font-bold text-primary">
              Danh sách mẫu CV{" "}
            </h1>
            <h4>
              Danh sách các mẫu CV hiện có trên{" "}
              <span className="font-bold text-primary">Dream IT Jobs</span>{" "}
            </h4>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 py-8">
            {templateCV.map((template, index) => (
              <CVTemplate key={index} template={template} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCV;
