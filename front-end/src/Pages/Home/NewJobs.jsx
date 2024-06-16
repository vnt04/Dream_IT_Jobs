import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsFire } from "react-icons/bs";

function NewJobs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/job/read")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const newJobs = [...data].sort((a, b) => a - b).slice(0, 9);
  const rows = [];
  for (let i = 0; i < newJobs.length; i += 3) {
    rows.push(newJobs.slice(i, i + 3));
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div className="2xl:px-24 px-4 md:y-4 y-2 h-auto bg-white">
      <div className="flex justify-between py-4 items-center">
        <div className="flex items-center gap-2">
          <BsFire className="size-10 text-red-500" />
          <h1 className="text-xl font-bold lg:text-2xl">Công việc </h1>
          <h1 className="text-xl font-bold lg:text-2xl text-red-600">
            {" "}
            mới nhất
          </h1>
        </div>
        <Link to={"/viec-lam-it"} className="underline text-red-500">
          Xem tất cả
        </Link>
      </div>

      {rows.map((row, index) => (
        <div key={index} className="flex gap-4 py-4">
          {row.map((job, index) => (
            <div
              key={index}
              className="h-32 w-1/3 flex border-[2px] rounded-xl"
            >
              <div className="w-1/3">
                <img
                  src={`/src/assets/img-company/${job.img}`}
                  alt=""
                  className="w-full h-full p-5"
                />
              </div>
              <div className="">
                <Link
                  to={`/viec-lam-it/${job._id}`}
                  className="font-bold text-xl line-clamp-1 hover:text-background"
                >
                  {job.job_title}
                </Link>
                <div className="my-1">{job.company}</div>
                <span className="text-red-600">
                  {job.salary_range.min_salary == null
                    ? "Lên tới "
                    : formatCurrency(job.salary_range.min_salary) + " - "}{" "}
                </span>
                <span className="text-red-600">
                  {formatCurrency(job.salary_range.max_salary)}
                </span>
                <div className="flex gap-3 mt-1">
                  {job.tag.map((tag) => (
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
      ))}
    </div>
  );
}

export default NewJobs;
