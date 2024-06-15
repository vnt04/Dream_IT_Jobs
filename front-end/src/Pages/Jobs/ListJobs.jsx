import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

function ListJobs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/job/read")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const HighlightJobs = [...data]
    .sort((a, b) => b.viewed - a.viewed)
    .slice(0, 5);
  const formatCurrency = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const calculateDaysAgo = (timeCreated) => {
    return formatDistanceToNow(new Date(timeCreated), {
      addSuffix: true,
      locale: vi,
    });
  };
  return (
    <div className="2xl:px-24 px-4 bg-[#f5f5f5] ">
      <h1 className="font-semibold py-2">
        Tìm thấy{" "}
        <span className="font-bold text-background"> {data.length} </span> công
        việc phù hợp với bạn
      </h1>

      <div className="flex mb-3">
        <h1 className="w-1/6 text-gray-500">Ưu tiên hiển thị:</h1>
        <div className="w-1/6 flex items-center gap-2">
          <MdRadioButtonUnchecked />
          <span>Tin mới nhất</span>
        </div>
        <div className="w-1/6 flex items-center gap-2">
          <MdRadioButtonUnchecked />
          <span>Cần tuyển gấp</span>
        </div>
        <div className="w-1/6 flex items-center gap-2">
          <MdRadioButtonUnchecked />
          <span>Lương cao nhất</span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-2/3">
          {data.map((jobData) => (
            <div
              key={jobData._id}
              className="h-48 flex mb-5 rounded-xl bg-white hover:bg-teal-100"
            >
              <div className="w-[30%] h-2/3">
                <img
                  src={`./src/assets/img-company/${jobData.img}`}
                  alt=""
                  className="w-full h-full px-14 py-5"
                />
              </div>
              <div className="py-2 w-[60%]">
                <Link
                  to={`/viec-lam-it/${jobData._id}`}
                  className="font-bold text-xl text-teal-600"
                >
                  {jobData.job_title}
                </Link>
                <div className="my-1 text-[16px]">{jobData.company}</div>
                <span className="text-red-600">
                  {jobData.salary_range.min_salary == null
                    ? "Lên tới "
                    : formatCurrency(jobData.salary_range.min_salary) +
                      " - "}{" "}
                </span>
                <span className="text-red-600">
                  {formatCurrency(jobData.salary_range.max_salary)}
                </span>
                <div>
                  {jobData.address} - {jobData.type_job}
                </div>
                <hr className="mt-2 w-full bg-gray-300 hover:bg-gray-500" />
                <div className="py-2 flex justify-between">
                  <div className="flex gap-3 mt-1">
                    {jobData.tag.map((tag) => (
                      <button
                        key={tag}
                        className="px-1 rounded text-[#1047b2] border bg-blue-100 hover:border-blue-600"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className="text-sm flex items-center">
                    Đăng {calculateDaysAgo(jobData.time_created)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/3 h-[685px]  bg-white">
          <div className="py-2 items-center font-bold text-xl text-center text-white bg-background ">
            Việc làm nổi bật
          </div>
          <div>
            {HighlightJobs.map((jobData) => (
              <div
                key={jobData._id}
                className="h-32 flex border-y-[1px] py-5 cursor-pointer "
              >
                <div className="w-1/3">
                  <img
                    src={`./src/assets/img-company/${jobData.img}`}
                    alt=""
                    className="w-full h-full p-5"
                  />
                </div>
                <div>
                  <Link
                    to={`/viec-lam-it/${jobData._id}`}
                    className="font-bold text-xl line-clamp-1 hover:text-background"
                  >
                    {jobData.job_title}
                  </Link>
                  <div className="my-1">{jobData.company}</div>
                  <div className="flex gap-3 mt-1">
                    {jobData.tag.map((tag) => (
                      <button
                        key={tag}
                        className="px-1 rounded text-[#1047b2] border bg-blue-100 hover:border-blue-600"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListJobs;
