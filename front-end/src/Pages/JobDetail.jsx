import { Link, useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegMoneyBillAlt, FaShareAlt } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

function JobDetail() {
  const { jobID } = useParams();
  const [detail, setDetail] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/read/${jobID}`)
      .then((response) => setDetail(response.data))
      .catch((error) => console.log(error));
  }, [jobID]);
  
  const formatCurrency = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const minSalary = detail.salary_range?.min_salary;
  const maxSalary = detail.salary_range?.max_salary;
  return (
    <div className="2xl:px-24 px-4 py-4 flex gap-4 bg-[#f5f5f5]">
      <div className="w-2/3">
        <div className="h-40 flex mb-4 bg-white">
          <div className=" w-11/12 h-full flex items-center gap-2">
            <div className="w-1/3 h-full">
              <img
                src={`/src/assets/img-company/${detail.img}`}
                alt=""
                className="w-full h-full p-5"
              />
            </div>
            <div className="w-2/3">
              <div className="font-bold text-xl">{detail.job_title}</div>
              <div className="my-1 font-bold text-gray-400 ">
                {detail.company}
              </div>
              <div className="flex items-center gap-2">
                <FaLocationDot />
                <p>{detail.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaRegMoneyBillAlt />
                <span className="text-red-600">
                  {minSalary == null
                    ? "Lên tới "
                    : formatCurrency(minSalary) + " - "}
                </span>
                <span className="text-red-600">
                  {maxSalary != null ? formatCurrency(maxSalary) : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/12 grid items-center p-2 bg-white">
            <CiBookmark className="size-7" />
            <FaShareAlt className="size-6" />
          </div>
        </div>
        <div className="p-4 mb-4 bg-white">
          <div className="mb-4 flex items-center gap-4">
            <div className="h-8 w-1 bg-background"></div>
            <h1 className="font-bold text-xl">Mô tả công việc</h1>
          </div>
          <div className="h-auto bottom-1 mb-4">
            <strong className="mb-2 ">Trách nhiệm công việc</strong>
            <div className="mb-2">
              <strong>Develop part</strong>
              <p>
                Participating in software development projects for financial
                institutions and Korean partners. Customers are financial
                institutions (including banks, financial companies …) Join in
                development process for all digital products at InfoPlus such as
                develop new features, improvement, detect and fix bugs. Work
                with team leader, manager to synchronize about the solution and
                complete assigned tasks. You can suggest the other solution if
                it is better. Develop and design scalable RESTful API Write the
                clean code, easy to reuse and extends Troubleshoot, test and
                maintain the core product software and databases to ensure
                strong optimization and functionality.
              </p>
              <strong>Training part:</strong>
              <p>Learning new technology, create seminar</p>
            </div>
          </div>
          <div className="h-auto mb-4">
            <strong className="mb-2 ">Trách nhiệm công việc</strong>
            <div className="mb-2">
              <strong>Develop part</strong>
              <p>
                Participating in software development projects for financial
                institutions and Korean partners. Customers are financial
                institutions (including banks, financial companies …) Join in
                development process for all digital products at InfoPlus such as
                develop new features, improvement, detect and fix bugs. Work
                with team leader, manager to synchronize about the solution and
                complete assigned tasks. You can suggest the other solution if
                it is better. Develop and design scalable RESTful API Write the
                clean code, easy to reuse and extends Troubleshoot, test and
                maintain the core product software and databases to ensure
                strong optimization and functionality.
              </p>
              <strong>Training part:</strong>
              <p>Learning new technology, create seminar</p>
            </div>
          </div>
          <div>Phúc lợi dành cho bạn</div>
        </div>

        <div className="mb-4 bg-white">Về Công Ty</div>
        <div className="bg-white">Việc làm tại FPT</div>
      </div>
      <div className="w-1/3">
        <div className="w-full h-auto mb-6">
          <button className="mb-4 w-full font-bold text-xl p-3 border rounded bg-background text-white hover:bg-teal-600">
            Ứng tuyển ngay
          </button>
          <button className=" w-full font-bold text-xl p-3 border border-background rounded bg-white text-background hover:bg-gray-200">
            Tạo CV để ứng tuyển
          </button>
        </div>
        <div className="p-4 bg-white mb-1">
          <h1 className="font-bold text-xl text-gray-500">Thông tin chung </h1>
        </div>
        <div className="p-4 bg-white">
          <div className="mb-4">
            <h1 className="font-bold ">Năm kinh nghiệm tối thiểu</h1>
            <Link>{detail.year_exp}</Link>
          </div>
          <div className="mb-4">
            <h1 className="font-bold">Cấp bậc</h1>
            {detail.level?.map((lv) => (
              <Link key={lv}>{lv}</Link>
            ))}
          </div>
          <div className="mb-4">
            <h1 className="font-bold">Loại hình</h1>
            <Link>{detail.type_job}</Link>
          </div>
          <div className="mb-4">
            <h1 className="font-bold">Loại hợp đồng</h1>
            <Link>{detail.contract}</Link>
          </div>
          <div>
            <h1 className="font-bold mb-2">Các công nghệ sử dụng</h1>
            <div className="flex gap-2">
              {detail.tech_stack?.map((ts) => (
                <button
                  className="px-1 rounded text-[#1047b2] border bg-blue-100 hover:border-blue-600"
                  key={ts}
                >
                  {ts}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
