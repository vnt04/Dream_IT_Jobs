import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Tag from "../../components/Tag";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { formatCurrency, getRows, calculateDaysAgo } from "../../utils";
import { BsFire } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

function NewJobs() {
  const { newJobs } = useContext(DataContext);

  const rows = getRows(newJobs, 3);
  return (
    <div className="container h-auto bg-white">
      <div className="flex justify-between py-4 items-center">
        <div className="flex items-center gap-2">
          <BsFire className="size-10 text-red-500" />
          <h1 className="text-xl font-bold lg:text-2xl">Công việc </h1>
          <h1 className="text-xl font-bold lg:text-2xl text-red-600">
            {" "}
            mới nhất
          </h1>
        </div>
        <Link
          to={"/viec-lam-it"}
          className="underline text-red-400 hover:text-red-600"
        >
          Xem tất cả
        </Link>
      </div>

      {rows.map((row, index) => (
        <div key={index} className="flex gap-4 py-2">
          {row.map((job, index) => (
            <div
              key={index}
              className="h-40 w-1/3 py-2 flex border-[2px] rounded-xl"
            >
              <div className="w-1/3">
                <Link to={"/cong-ty-IT"}>
                  <img
                    src={`/src/assets/img-company/${job.img}`}
                    alt=""
                    className="w-full h-full p-5 hover-zoom:hover"
                  />
                </Link>
              </div>
              <div className="w-2/3">
                <Link
                  to={`/viec-lam-it/${job._id}`}
                  className="font-bold text-xl line-clamp-1 hover:text-primary"
                >
                  {job.job_title}
                </Link>
                <Link to={"/cong-ty-IT"}>
                  <h4 className="my-1 font-semibold text-[#666] hover:text-[#aaa]">
                    {job.company}
                  </h4>
                </Link>
                <span className="text-red-600">
                  {job.salary_range.min_salary == null
                    ? "Lên tới "
                    : formatCurrency(job.salary_range.min_salary) + " - "}{" "}
                </span>
                <span className="text-red-600">
                  {formatCurrency(job.salary_range.max_salary)}
                </span>
                <div className="flex gap-3 mt-1">
                  {job.tag.map((tag, index) => (
                    <Tag key={index} name={tag} />
                  ))}
                </div>
                <div className="flex items-center gap-2 justify-end text-sm text-[#555] px-2 my-3 ">
                  {calculateDaysAgo(job.time_created)}
                  <CiHeart
                    data-tooltip-id="save-job"
                    data-tooltip-content="Lưu công việc này"
                    className="size-5 cursor-pointer hover:text-red-500"
                  />
                  <Tooltip id="save-job" className="rounded-xl" />
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
