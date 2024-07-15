/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { CiBookmark } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

function AllCompany({ resultSearch }) {
  const [activeSection, setActiveSection] = useState("#section-best-company");
  const { dataCompany, mostFollow, dataJobs } = useContext(DataContext);

  const rowData = [];
  for (let i = 0; i < dataCompany?.length; i += 3) {
    rowData.push(dataCompany.slice(i, i + 3));
  }

  const rowMostFollow = [];
  for (let i = 0; i < mostFollow.length; i += 4) {
    rowMostFollow.push(mostFollow.slice(i, i + 4));
  }

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
  console.log(hasJob);
  const rowHasJob = [];
  for (let i = 0; i < hasJob.length; i += 4) {
    rowHasJob.push(hasJob.slice(i, i + 4));
  }

  const handleSetActive = (sectionId) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId.slice(1));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {resultSearch?.length <= 0 && (
        <div>
          <div className="py-6 ">
            <div className="flex">
              <a
                className={`menu-company ${activeSection === "#section-best-company" ? "menu-company-active" : ""}`}
                href="#section-best-company"
                onClick={(e) => {
                  e.preventDefault();
                  handleSetActive("#section-best-company");
                }}
              >
                Các công ty nổi bật
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
                Các công ty đang tuyển dụng
              </a>
            </div>
          </div>

          <section id="section-best-company">
            <span className="text-[20px] text-center font-bold">
              Các công ty nổi bật
            </span>
            {rowData.map((row, index) => (
              <div key={index} className="flex gap-4 mb-2">
                {row.map((data, index) => (
                  <a
                    href={`/cong-ty-IT/${data._id}`}
                    key={index}
                    className="mt-2 w-1/3 h-[400px] rounded-xl border"
                  >
                    <div className="h-44 relative z-0 mb-4">
                      <img
                        src={`/src/assets/img-company/${data.banner}`}
                        className="h-[90%] w-full rounded-tl-xl rounded-tr-xl"
                        alt="banner"
                      />
                      <div className="absolute bottom-0 h-28 w-28 left-4 rounded-md border border-gray-100">
                        <img
                          src={`/src/assets/img-company/${data.logo}`}
                          alt=""
                          className="w-full h-full border"
                        />
                      </div>
                    </div>

                    <div className="px-4">
                      <h3 className="text-[#333] text-left font-bold uppercase">
                        {data.name}
                      </h3>
                      <p className="text-[#555] pt-4 line-clamp-5">
                        {data.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </section>

          <section className="pt-20" id="section-best-follow-company">
            <span className="text-[20px] text-center font-bold ">
              Các công ty được theo dõi nhiều
            </span>
            {rowMostFollow.map((row, index) => (
              <div key={index} className="flex gap-4 mb-2">
                {row.map((data, index) => (
                  <a
                    href={`/cong-ty-IT/${data._id}`}
                    key={index}
                    className="mt-2 w-1/4 h-[358px] rounded-xl border"
                  >
                    <div className="h-60 relative mb-2">
                      <img
                        src={`/src/assets/img-company/${data.banner}`}
                        className="h-[90%] w-full rounded-tl-xl rounded-tr-xl"
                        alt="banner"
                      />
                      <div className="absolute bottom-0 h-20 w-20 left-4 rounded-md border border-gray-100">
                        <img
                          src={`/src/assets/img-company/${data.logo}`}
                          alt=""
                          className="w-full h-full border"
                        />
                      </div>
                    </div>

                    <div className="px-4">
                      <h3 className="text-[#333] text-left font-semibold uppercase">
                        {data.name}
                      </h3>
                      <div className="flex justify-between py-1">
                        <h3 className="text-[#aaa]">{data.location}</h3>
                      </div>
                      <div className="flex justify-between ">
                        <h3 className="text-[#aaa]">{data.field}</h3>
                        <div className=" flex items-center gap-1 text-red-600">
                          <span className="text-sm">{data.follow}</span>
                          <CiBookmark className="size-4 text-red-600 cursor-pointer hover:text-red-800" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </section>

          <section className="pt-20" id="section-newJobs-company">
            <span className="text-[20px] text-center font-bold ">
              Các công ty đang tuyển dụng
            </span>
            {rowHasJob.map((row, index) => (
              <div key={index} className="flex gap-4 mb-2">
                {row.map((data, index) => (
                  <a
                    href={`/cong-ty-IT/${data._id}`}
                    key={index}
                    className="mt-2 w-[30%] h-[358px] rounded-xl border"
                  >
                    <div className="h-60 relative mb-2">
                      <img
                        src={`/src/assets/img-company/${data.banner}`}
                        className="h-[90%] w-full rounded-tl-xl rounded-tr-xl"
                        alt="banner"
                      />
                      <div className="absolute bottom-0 h-20 w-20 left-4 rounded-md border border-gray-100">
                        <img
                          src={`/src/assets/img-company/${data.logo}`}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="px-4">
                      <h3 className="text-[#333] text-left font-semibold uppercase">
                        {data.name}
                      </h3>
                      <div className="flex justify-between py-1">
                        <h3 className="text-[#aaa]">{data.location}</h3>
                        <div className=" flex items-center gap-1">
                          <span className="text-[#aaa]">{data.follow}</span>
                          <CiBookmark className="size-6 text-[#aaa]" />
                        </div>
                      </div>
                      <div className="flex justify-between ">
                        <h3 className="text-[#aaa] line-clamp-1">
                          {data.field}
                        </h3>
                        <div className=" flex items-center gap-1 underline text-red-600">
                          <span>{getJobInCompany(data._id)} việc làm</span>
                          <FaLongArrowAltRight className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}

export default AllCompany;
