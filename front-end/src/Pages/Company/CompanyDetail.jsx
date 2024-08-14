import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const handleFollowCompany = () => {
    if (!user) {
      navigate("/login");
    }
  };
  const currentCompany = dataCompany.find(
    (company) => company._id === companyID,
  );
  const isMyCompany =
    dataRecruiter.find((re) => re.uid === user?.uid)?.company_id === companyID;

  const hasJobs = [];
  dataJobs.map((data) => {
    if (data.company._id === companyID) hasJobs.push(data);
  });

  const mockReviews = [
    {
      star: 5,
      goodReview:
        "Môi trường làm việc năng động, cơ hội phát triển bản thân cao.",
      badReview:
        "Cường độ công việc đôi khi khá cao, cần quản lý thời gian tốt.",
    },
    {
      star: 3,
      goodReview:
        "Đồng nghiệp thân thiện, dễ gần, hỗ trợ nhau trong công việc.",
      badReview: "Quy trình làm việc còn chậm, cần cải thiện tính hiệu quả.",
    },
    {
      star: 4,
      goodReview: "Chế độ đãi ngộ tốt, nhiều phúc lợi cho nhân viên.",
      badReview: "Khối lượng công việc nhiều, đôi khi cảm thấy quá tải.",
    },
    {
      star: 2,
      goodReview: "Linh hoạt về thời gian làm việc, có thể làm việc từ xa.",
      badReview: "Lương chưa thực sự cạnh tranh, cần cân nhắc tăng lương.",
    },
    {
      star: 4,
      goodReview:
        "Môi trường học hỏi và phát triển tốt cho các lập trình viên trẻ.",
      badReview: "Văn phòng ở xa trung tâm, không thuận tiện cho việc đi lại.",
    },
  ];
  const starAverage =
    mockReviews.reduce((accumulator, review) => accumulator + review.star, 0) /
    mockReviews.length;
  const percentStar = (starIndex, average) => {
    if (starIndex <= average) {
      return 100;
    } else if (starIndex - average > 1) {
      return 0;
    } else {
      return (average - (starIndex - 1)) * 100;
    }
  };
  return (
    <div className="">
      <div className="bg-primary">
        <div className="container">
          <div className="grid gap-4 py-4 md:flex">
            <div className="h-40 w-40">
              <img
                src={`/src/assets/img-company/${currentCompany?.logo}`}
                alt=""
                className="h-full w-full rounded shadow-2xl"
              />
            </div>
            <div className="space-y-2 text-white">
              <h3 className="text-2xl font-bold">{currentCompany?.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IoLocationOutline className="size-4 text-gray-700" />
                  {currentCompany?.location.join(" - ")}
                </div>
                <div className="flex items-center gap-2 underline">
                  <MdOutlineWorkHistory className="size-5 text-gray-700" />
                  {hasJobs?.length} việc làm đang tuyển dụng
                </div>
                <div className="flex items-center gap-3">
                  <FaBookmark className="size-4" />
                  {currentCompany?.follow} followers
                </div>
                <div className="flex items-center gap-2">
                  {starAverage}{" "}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="relative">
                      <div className="left-0 top-0 h-full w-full text-gray-300">
                        <FaStar size={16} />
                      </div>
                      <div
                        className="absolute left-0 top-0 h-full overflow-hidden"
                        style={{ width: `${percentStar(star, starAverage)}%` }}
                      >
                        <FaStar fill="#ffc107" size={16} />
                      </div>
                    </div>
                  ))}
                  <span>({mockReviews.length} đánh giá)</span>
                </div>
              </div>
              <div>
                {!isMyCompany ? (
                  <div className="flex gap-4 pb-4 pt-2">
                    <button className="rounded bg-red-600 px-12 py-2 font-bold text-white hover:bg-red-700">
                      Viết đánh giá
                    </button>
                    <button
                      onClick={handleFollowCompany}
                      className="rounded border bg-white px-12 py-2 font-bold text-red-600 hover:bg-gray-200"
                    >
                      Theo dõi
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link
                      to={`/cong-ty-IT/${companyID}/update`}
                      className="rounded bg-red-600 px-12 py-2 font-bold text-white hover:bg-red-700"
                    >
                      Cập nhật thông tin công ty
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f5f5f5]">
        <div className="container xl:grid xl:grid-cols-3 xl:gap-4">
          {/*  */}
          <div className="py-4 xl:col-span-2">
            <div className="content-company flex items-center gap-8 py-4 font-bold text-[#555]">
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
                <span className="rounded-2xl bg-gray-200 px-2 py-1">
                  {mockReviews.length}
                </span>
              </button>
            </div>
            {showInfo && (
              <>
                <div className="content-company">
                  <div className="content-company-header">Thông tin chung</div>
                  <div className="my-4 grid grid-cols-2 gap-2 md:grid-cols-3">
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

                <div className="content-company">
                  <div className="content-company-header">
                    Giới thiệu công ty
                  </div>
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
                  <div className="flex flex-wrap items-center gap-2 py-4">
                    {currentCompany?.tech_stack.map((tech, index) => (
                      <Tag key={index} name={tech} />
                    ))}
                  </div>
                </div>
                <div className="content-company">
                  <div className="content-company-header">Chế độ đãi ngộ</div>
                  <ul className="ml-6 mt-2 list-disc">
                    {currentCompany?.benefit.split("\n").map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className="content-company">
                  <div className="content-company-header">
                    Thông tin liên hệ
                  </div>
                  <div className="mb-2 grid">
                    <strong>Website</strong>
                    <a href={currentCompany?.website} className="">
                      {currentCompany?.website}
                    </a>
                  </div>
                  <div className="mb-2 grid">
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
            {showReview && (
              <Review
                listReviews={mockReviews}
                starAverage={starAverage}
                percentStar={percentStar}
              />
            )}
          </div>
          <div className="">
            <h1 className="py-6 text-xl font-bold lg:text-center">
              {hasJobs.length} việc làm đang tuyển dụng
            </h1>

            <div className="bg-white shadow-2xl">
              <JobCard jobsList={hasJobs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
