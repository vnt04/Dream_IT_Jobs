/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJobs } from "../../redux/actions/jobActions";
import Tag from "../../components/Tag";
import {
  calculateDaysAgo,
  formatCurrency,
  calculateDayNumber,
} from "../../utils/index";
import JobCard from "../../components/JobCard";
import axios from "axios";
import apiEndpoint from "../../api";
import { RingLoader } from "react-spinners";

function ListJobs() {
  const dispatch = useDispatch();
  const { dataJobs, loading } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const [resultSearch, setResultSearch] = useState(dataJobs);
  const [newest, setNewest] = useState(false);
  const [highestSalary, setHighestSalary] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const techQuery = query.getAll("tech").join(" , ");

  const HighlightJobs = [...dataJobs]
    .sort((a, b) => b.viewed - a.viewed)
    .slice(0, 5);

  const filterData = location.search ? [...resultSearch] : dataJobs;
  if (newest) {
    filterData.sort(
      (a, b) =>
        calculateDayNumber(a.time_created) - calculateDayNumber(b.time_created),
    );
  }
  if (highestSalary) {
    filterData.sort((a, b) => b.max_salary - a.max_salary);
  }

  useEffect(() => {
    if (location.search.slice(1)) {
      // setLoading(true);
      axios
        .get(`${apiEndpoint.search_job}?${location.search.slice(1)}`)
        .then((response) => {
          setResultSearch(response.data);
          setTimeout(() => {
            // setLoading(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          // setLoading(false);
        });
    }
  }, [location.search]);

  return (
    <div className="container">
      <div className="py-2 font-semibold">
        Tìm thấy{" "}
        <span className="font-bold text-primary"> {filterData.length} </span>{" "}
        công việc phù hợp với bạn{" "}
        <span className="font-bold text-primary">{techQuery}</span>
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
          {loading ? (
            <div className="flex justify-center">
              <RingLoader color="#33afa9" loading={loading} size={50} />
            </div>
          ) : (
            filterData.map((jobData) => (
              <div
                key={jobData._id}
                className="flex h-48 space-x-2 rounded-xl bg-white hover:bg-teal-100"
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
            ))
          )}
        </div>
        <div className="">
          <div className="items-center bg-primary py-2 text-center text-xl font-bold text-white">
            Việc làm nổi bật
          </div>
          <JobCard jobsList={HighlightJobs} />
        </div>
      </div>
    </div>
  );
}

export default ListJobs;
