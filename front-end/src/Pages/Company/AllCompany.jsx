/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { CiBookmark } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

function AllCompany() {
  const [activeSection, setActiveSection] = useState("#section-best-company");
  const { dataCompany, mostFollow, dataJobs } = useContext(DataContext);

  const getJobInCompany = (companyID) => {
    let number = 0;
    dataJobs.map((data) => {
      if (data.company._id === companyID) {
        number = number + 1;
      }
    });
    return number;
  };
  const hasJob = [];
  dataCompany.map((company) => {
    if (dataJobs.find((job) => job.company._id === company._id))
      hasJob.push(company);
  });

  const handleSetActive = (sectionId) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId.slice(1));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="py-4">
        <div className="flex text-sm lg:text-base">
          <a
            className={`menu-company ${activeSection === "#section-best-company" ? "menu-company-active" : ""}`}
            href="#section-best-company"
            onClick={(e) => {
              e.preventDefault();
              handleSetActive("#section-best-company");
            }}
          >
            Công ty nổi bật
          </a>
          <a
            className={`menu-company ${activeSection === "#section-best-follow-company" ? "menu-company-active" : ""}`}
            href="#section-best-follow-company"
            onClick={(e) => {
              e.preventDefault();
              handleSetActive("#section-best-follow-company");
            }}
          >
            Công ty được theo dõi nhiều
          </a>
          <a
            className={`menu-company ${activeSection === "#section-newJobs-company" ? "menu-company-active" : ""}`}
            href="#section-newJobs-company"
            onClick={(e) => {
              e.preventDefault();
              handleSetActive("#section-newJobs-company");
            }}
          >
            Công ty đang tuyển dụng
          </a>
        </div>
      </div>

      <section id="section-best-company">
        <span className="mb-4 text-center text-xl font-bold">
          Các công ty nổi bật
        </span>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dataCompany.map((data, index) => (
            <a
              href={`/cong-ty-IT/${data._id}`}
              key={index}
              className="h-[386px] rounded-xl border"
            >
              <div className="relative z-0 mb-4 h-44">
                <img
                  src={`/src/assets/img-company/${data.banner}`}
                  className="h-[90%] w-full rounded-tl-xl rounded-tr-xl object-cover"
                  alt="banner"
                />
                <div className="absolute bottom-0 left-4 h-28 w-28 rounded-md border border-gray-100">
                  <img
                    src={`/src/assets/img-company/${data.logo}`}
                    alt=""
                    className="h-full w-full border"
                  />
                </div>
              </div>

              <div className="px-4">
                <h3 className="text-left font-bold uppercase text-[#333]">
                  {data.name}
                </h3>
                <p className="line-clamp-5 pt-4 text-[#555]">
                  {data.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="pt-20" id="section-best-follow-company">
        <span className="text-xl font-bold">
          Các công ty được theo dõi nhiều
        </span>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mostFollow.map((data, index) => (
            <a
              href={`/cong-ty-IT/${data._id}`}
              key={index}
              className="h-[358px] rounded-xl border"
            >
              <div className="relative mb-2 h-60">
                <img
                  src={`/src/assets/img-company/${data.banner}`}
                  className="h-[90%] w-full rounded-tl-xl rounded-tr-xl object-cover"
                  alt="banner"
                />
                <div className="absolute bottom-0 left-4 h-20 w-20 rounded-md border border-gray-100">
                  <img
                    src={`/src/assets/img-company/${data.logo}`}
                    alt=""
                    className="h-full w-full border"
                  />
                </div>
              </div>

              <div className="space-y-2 px-4">
                <h3 className="line-clamp-2 text-left font-semibold uppercase text-[#333]">
                  {data.name}
                </h3>
                <h3 className="line-clamp-1 flex justify-between text-sm text-[#aaa]">
                  {data.location.join(" - ")}
                </h3>
                <div className="flex justify-between text-sm">
                  <h3 className="line-clamp-1 text-[#aaa]">{data.field}</h3>
                  <div className="flex items-center space-x-1 text-red-600">
                    <span className="text-sm">{data.follow}</span>
                    <CiBookmark className="size-4 cursor-pointer text-red-600 hover:text-red-800" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="pt-20" id="section-newJobs-company">
        <span className="text-xl font-bold">Các công ty đang tuyển dụng</span>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hasJob.map((data, index) => (
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
      </section>
    </div>
  );
}

export default AllCompany;
