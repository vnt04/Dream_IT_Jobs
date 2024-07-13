import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import Tag from "../../components/Tag";
import JobCard from "../../components/JobCard";
import { DataContext } from "../../context/DataProvider";
import { AuthContext } from "../../context/AuthProvider";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineWorkHistory } from "react-icons/md";
import { FaStar, FaBookmark } from "react-icons/fa";
import Review from "./Review";

function CompanyDetail() {
  const [showInfo, setShowInfo] = useState(true);
  const [showReview, setShowReview] = useState(false);

  const { companyID } = useParams();
  const { dataJobs, dataCompany, dataRecruiter } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const currentCompany = dataCompany.find(
    (company) => company._id === companyID
  );
  const isMyCompany =
    dataRecruiter.find((re) => re.uid === user?.uid)?.companyID === companyID;

  const currentJob = [...dataJobs].slice(0, 5);

  return (
    <div className="bg-primary">
      <div className="container h-56 w-full flex ">
        <div className="h-full flex items-center gap-4">
          <div className="w-40 h-40">
            <img
              src={`/src/assets/img-company/${currentCompany?.logo}`}
              alt=""
              className="rounded shadow-2xl"
            />
          </div>
          <div className="text-white">
            <h3 className="font-bold text-3xl">{currentCompany?.name}</h3>
            <div className="mb-5 mt-4 flex gap-10 items-center">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-gray-700 size-4" />
                {currentCompany?.location.join(" - ")}
              </div>
              <div className="flex items-center gap-2 underline">
                <MdOutlineWorkHistory className="text-gray-700 size-5" />5 việc
                làm đang tuyển dụng
              </div>
              <div className="flex items-center gap-2">
                4.9{" "}
                <div className="flex gap-0.5 text-yellow-400">
                  <FaStar /> <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span>(1324 đánh giá)</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBookmark />
                {currentCompany?.follow} followers
              </div>
            </div>
            {!isMyCompany ? (
              <div className="flex gap-4">
                <button className="py-2 px-12 font-bold rounded bg-red-600 hover:bg-red-700">
                  Viết đánh giá
                </button>
                <button className="py-2 px-12 font-bold border rounded bg-white text-red-600 hover:bg-gray-200">
                  Theo dõi
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to={`/cong-ty-IT/${companyID}/update`}
                  className="py-2 px-12 font-bold rounded bg-red-600 hover:bg-red-700"
                >
                  Cập nhật thông tin công ty
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container flex gap-4 bg-[#f5f5f5] ">
        <div className="w-2/3">
          <div className="h-20 content-company text-[#555] font-bold flex items-center gap-8">
            <button
              onClick={() => {
                setShowInfo(true);
                setShowReview(false);
              }}
              className={`${showInfo ? "company-detail-active" : ""}`}
            >
              Giới thiệu
            </button>
            <button
              onClick={() => {
                setShowInfo(false);
                setShowReview(true);
              }}
              className={`${showReview ? "company-detail-active" : ""}`}
            >
              Đánh giá{" "}
              <span className="bg-gray-200 px-2 py-1 rounded-2xl">1324</span>
            </button>
          </div>
          {showInfo && (
            <>
              <div className="h-52 content-company">
                <div className="content-company-header">Thông tin chung</div>
                <div className="my-4">
                  <div className="grid grid-cols-3 mb-4">
                    <div>
                      <div className="content-company-label">
                        Mô hình công ty
                      </div>
                      <div className="content-company-info">
                        {currentCompany?.model}
                      </div>
                    </div>
                    <div>
                      <div className="content-company-label">
                        Lĩnh vực công ty
                      </div>
                      <div className="content-company-info">
                        {currentCompany?.field}
                      </div>
                    </div>
                    <div>
                      <div className="content-company-label">
                        Quy mô công ty
                      </div>
                      <div className="content-company-info">
                        {currentCompany?.scale} nhân viên
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div>
                      <div className="content-company-label">Quốc gia</div>
                      <div className="content-company-info">
                        {currentCompany?.nation}
                      </div>
                    </div>
                    <div>
                      <div className="content-company-label">
                        Thời gian làm việc
                      </div>
                      <div className="content-company-info">
                        {currentCompany?.work_time}
                      </div>
                    </div>
                    <div>
                      <div className="content-company-label">
                        Làm việc ngoài giờ
                      </div>
                      <div className="content-company-info">
                        {currentCompany?.over_time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-auto content-company">
                <div className="content-company-header">Giới thiệu công ty</div>
                <p className="py-4">
                  {currentCompany?.description
                    .split("\n")
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                </p>
              </div>

              <div className="content-company">
                <div className="content-company-header">Chuyên môn</div>
                <div className="flex items-center gap-4 py-4">
                  {currentCompany?.tech_stack.map((tech, index) => (
                    <Tag key={index} name={tech} />
                  ))}
                </div>
              </div>

              <div className="content-company">
                <div className="content-company-header">Chế độ đãi ngộ</div>
                <ul className="list-disc mt-2 ml-6">
                  {currentCompany?.benefit.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="content-company">
                <div className="content-company-header">Thông tin liên hệ</div>
                <div className="grid mb-2">
                  <strong>Website</strong>
                  <a href={currentCompany?.website} className="">
                    {currentCompany?.website}
                  </a>
                </div>
                <div className="grid mb-2">
                  <strong>Địa điểm</strong>
                  {currentCompany?.address.map((add, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <IoLocationOutline />
                      {add}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {showReview && <Review />}
        </div>
        <div className="w-1/3 h-auto">
          <div className="max-h-14 mb-7">
            <h1 className="text-2xl text-center font-bold py-6">
              5 việc làm đang tuyển dụng
            </h1>
          </div>
          <div className="bg-white">
            <JobCard jobCard={currentJob} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
