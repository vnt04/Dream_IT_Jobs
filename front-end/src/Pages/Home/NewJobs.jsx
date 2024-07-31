import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Tag from "../../components/Tag";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { formatCurrency, calculateDaysAgo } from "../../utils";
import { BsFire } from "react-icons/bs";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { PiMoneyWavy } from "react-icons/pi";

function NewJobs() {
  const { newJobs } = useContext(DataContext);
  return (
    <div className="container bg-white">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <BsFire className="size-6 text-red-500 md:size-8" />
          <h1 className="font-bold md:text-xl">Công việc </h1>
          <h1 className="font-bold text-red-600 md:text-xl"> mới nhất</h1>
        </div>
        <a
          href={"/viec-lam-IT"}
          className="text-sm font-semibold text-red-400 underline hover:text-red-600 md:text-base"
        >
          Xem tất cả
        </a>
      </div>

      {/* List new jobs */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {newJobs?.map((job, index) => (
          <div key={index} className="h-44 w-full rounded-xl border-[2px] p-2">
            <div className="flex h-2/3 w-full space-x-2">
              <a className="w-1/3" href={`/cong-ty-IT/${job.company._id}`}>
                <img
                  src={`/src/assets/img-company/${job.company.logo}`}
                  alt={job.company.name}
                  title={job.company.name}
                  className="h-full w-full object-contain"
                />
              </a>
              <div className="w-2/3 space-y-1 overflow-hidden">
                <a
                  href={`/viec-lam-it/${job._id}`}
                  title={job.job_title}
                  className="line-clamp-1 font-bold hover:text-primary"
                >
                  {job.job_title}
                </a>
                <Link to={`/cong-ty-IT/${job.company._id}`}>
                  <h4
                    title={job.company.name}
                    className="line-clamp-1 font-semibold text-[#666] hover:text-[#aaa]"
                  >
                    {job.company.name}
                  </h4>
                </Link>
                <div className="flex items-center space-x-1 overflow-hidden whitespace-nowrap">
                  <PiMoneyWavy className="size-5" />
                  <span className="text-red-600">
                    {job.min_salary == null
                      ? "Lên tới "
                      : formatCurrency(job.min_salary) + " - "}{" "}
                  </span>
                  <span className="text-red-600">
                    {formatCurrency(job.max_salary)}
                  </span>
                </div>
                <h4 className="line-clamp-1 flex items-center space-x-2 text-[#666]">
                  <CiLocationOn className="size-4" />
                  {job.location}
                </h4>
              </div>
            </div>
            <hr />
            <div className="h-1/3 space-y-1 py-2">
              <div className="flex justify-start space-x-3 overflow-hidden whitespace-nowrap">
                {job.tech_stack.map((tag, index) => (
                  <Tag key={index} name={tag} />
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 px-2 text-sm text-[#555]">
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
    </div>
  );
}

export default NewJobs;
