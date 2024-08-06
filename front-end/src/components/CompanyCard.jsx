/* eslint-disable react/prop-types */
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

function CompanyCard({ companyList }) {
  const { dataJobs } = useContext(DataContext);
  const getJobInCompany = (company_id) => {
    return dataJobs.filter((job) => company_id === job.company._id).length;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {companyList.map((data, index) => (
        <a
          href={`/cong-ty-IT/${data._id}`}
          key={index}
          className="mt-2 h-[358px] rounded-xl border"
        >
          <div className="relative mb-2 h-60">
            <img
              src={`/src/assets/img-company/${data.banner}`}
              className="h-[90%] w-full rounded-tl-xl rounded-tr-xl object-cover"
              alt="banner"
            />
            <div className="absolute bottom-0 left-4 h-20 w-20 rounded-md border border-gray-100">
              <img src={`/src/assets/img-company/${data.logo}`} alt="" />
            </div>
          </div>

          <div className="space-y-2 px-4">
            <h3 className="text-left font-semibold uppercase text-[#333]">
              {data.name}
            </h3>
            <div className="flex justify-between space-x-1 text-sm">
              <h3 className="line-clamp-1 text-[#aaa]">
                {data.location.join(" - ")}
              </h3>
              <div className="flex items-center space-x-1">
                <span className="text-[#aaa]">{data.follow}</span>
                <CiBookmark className="size-5 text-[#aaa]" />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-1 text-sm text-red-600 underline">
              <span>{getJobInCompany(data._id)} việc làm</span>
              <FaLongArrowAltRight className="mt-1" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default CompanyCard;
