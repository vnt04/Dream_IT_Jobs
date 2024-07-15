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
        calculateDayNumber(a.time_created) - calculateDayNumber(b.time_created)
    );
  }
  if (highestSalary) {
    filterData.sort((a, b) => b.max_salary - a.max_salary);
  }

  return (
    <div className="container bg-[#f5f5f5] ">
      <h1 className="font-semibold py-2">
        Tìm thấy{" "}
        <span className="font-bold text-primary"> {currentData.length} </span>{" "}
        công việc phù hợp với bạn
      </h1>

      <div className="flex mb-3">
        <h1 className="w-1/6 text-gray-500">Ưu tiên hiển thị:</h1>
        <div className="w-1/6 flex items-center gap-2">
          <input
            type="radio"
            checked={newest}
            onClick={() => setNewest(!newest)}
            onChange={() => {}}
          />
          <span>Tin mới nhất</span>
        </div>
        <div className="w-1/6 flex items-center gap-2">
          <input
            type="radio"
            checked={highestSalary}
            onClick={() => setHighestSalary(!highestSalary)}
            onChange={() => {}}
          />
          <span>Lương cao nhất</span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-2/3">
          {filterData.map((jobData) => (
            <div
              key={jobData._id}
              className="h-48 flex mb-5 rounded-xl bg-white hover:bg-teal-100"
            >
              <div className="w-[30%] h-2/3">
                <img
                  src={`/src/assets/img-company/${jobData.company.logo}`}
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
                <div className="my-1 text-[16px]">{jobData.company.name}</div>
                <span className="text-red-600">
                  {jobData.min_salary == null
                    ? "Lên tới "
                    : formatCurrency(jobData.min_salary) + " - "}{" "}
                </span>
                <span className="text-red-600">
                  {formatCurrency(jobData.max_salary)}
                </span>
                <div>
                  {jobData.location} - {jobData.job_type}
                </div>
                <hr className="mt-2 w-full bg-gray-300 hover:bg-gray-500" />
                <div className="py-2 flex justify-between">
                  <div className="flex gap-3 mt-1">
                    {jobData.tech_stack.map((tag, index) => (
                      <Tag key={index} name={tag} />
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
        <div className="w-1/3 h-[840px]  bg-white">
          <div className="py-2 items-center font-bold text-xl text-center text-white bg-primary ">
            Việc làm nổi bật
          </div>
          <JobCard jobCard={HighlightJobs} />
        </div>
      </div>
    </div>
  );
}

export default ListJobs;
