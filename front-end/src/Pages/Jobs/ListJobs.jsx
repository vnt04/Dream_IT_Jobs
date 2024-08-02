/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Tag from "../../components/Tag";
import { DataContext } from "../../context/DataProvider";
import {
  calculateDaysAgo,
  formatCurrency,
  calculateDayNumber,
} from "../../utils";
import JobCard from "../../components/JobCard";

function ListJobs({ resultSearch, showResult }) {
  const { dataJobs } = useContext(DataContext);
  const [newest, setNewest] = useState(false);
  const [highestSalary, setHighestSalary] = useState(false);

  const HighlightJobs = [...dataJobs]
    .sort((a, b) => b.viewed - a.viewed)
    .slice(0, 5);

  const currentData = showResult ? resultSearch : dataJobs;
  const filterData = [...currentData];
  if (newest) {
    filterData.sort(
      (a, b) =>
        calculateDayNumber(a.time_created) - calculateDayNumber(b.time_created),
    );
  }
  if (highestSalary) {
    filterData.sort((a, b) => b.max_salary - a.max_salary);
  }

  return (
    <div className="container">
      <div className="py-2 font-semibold">
        Tìm thấy{" "}
        <span className="font-bold text-primary"> {currentData.length} </span>{" "}
        công việc phù hợp với bạn
      </div>
      <div className="flex items-center space-x-4">
        <h1 className="text-gray-500">Ưu tiên hiển thị:</h1>
        <div className="flex items-center space-x-1">
          <input
            type="radio"
            id="new"
            checked={newest}
            onClick={() => setNewest(!newest)}
            onChange={() => {}}
          />
          <label htmlFor="new">Tin mới nhất</label>
        </div>
        <div className="flex items-center space-x-1">
          <input
            type="radio"
            id="salary"
            checked={highestSalary}
            onClick={() => setHighestSalary(!highestSalary)}
            onChange={() => {}}
          />
          <label htmlFor="salary">Lương cao nhất</label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 py-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          {filterData.map((jobData) => (
            <div
              key={jobData._id}
              className="flex h-48 max-w-5xl space-x-2 rounded-xl bg-white hover:bg-teal-100"
            >
              <div className="h-2/3 w-1/4">
                <img
                  src={`/src/assets/img-company/${jobData.company.logo}`}
                  title={jobData.company.name}
                  className="h-full w-full rounded-xl object-contain p-2"
                />
              </div>
              <div className="w-3/4 space-y-1 overflow-hidden py-2">
                <Link
                  to={`/viec-lam-it/${jobData._id}`}
                  title={jobData.job_title}
                  className="line-clamp-1 font-bold hover:text-primary"
                >
                  {jobData.job_title}
                </Link>
                <Link to={`/cong-ty-IT/${jobData.company._id}`}>
                  <h4
                    title={jobData.company.name}
                    className="line-clamp-1 font-semibold text-[#666] hover:text-[#aaa]"
                  >
                    {jobData.company.name}
                  </h4>
                </Link>
                <div className="flex items-center space-x-1 overflow-hidden whitespace-nowrap">
                  <span className="text-red-600">
                    {jobData.min_salary == null
                      ? "Lên tới "
                      : formatCurrency(jobData.min_salary) + " - "}{" "}
                  </span>
                  <span className="text-red-600">
                    {formatCurrency(jobData.max_salary)}
                  </span>
                </div>
                <div>
                  {jobData.location} - {jobData.job_type}
                </div>
                <hr />
                <div className="space-y-2 py-2 md:flex md:items-center md:justify-between">
                  <div className="flex justify-start space-x-3 overflow-hidden whitespace-nowrap">
                    {jobData.tech_stack.map((tag, index) => (
                      <Tag key={index} name={tag} />
                    ))}
                  </div>
                  <div className="mr-2 text-end text-sm">
                    Đăng {calculateDaysAgo(jobData.time_created)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <div className="items-center bg-primary py-2 text-center text-xl font-bold text-white">
            Việc làm nổi bật
          </div>
          <JobCard jobCard={HighlightJobs} />
        </div>
      </div>
    </div>
  );
}

export default ListJobs;
