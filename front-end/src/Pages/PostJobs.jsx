import { useContext, useState } from "react";
import axios from "axios";
import Select from "react-select";
import InputTemplate from "../components/InputTemplate";
import {
  locationOption,
  yearExperience,
  levelOptions,
  techStack,
  jobTypeOptions,
  contractTypeOptions,
} from "../resources/defaultData";
import { DataContext } from "../context/DataProvider";
import { AuthContext } from "../context/AuthProvider";
import CustomModal from "../components/CustomModal"; // Import CustomModal

const customStyle = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #d1d5db",
    boxShadow: state.isFocused ? "#d1d5db" : "none",
    "&:hover": {
      border: "2px solid #d1d5db",
    },
    height: "40px",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#33afa9"
      : state.isFocused
        ? "#b9f7f4"
        : null,
    color: state.isSelected ? "white" : "black",
    padding: 10,
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const PostJobs = () => {
  const { dataRecruiter, dataCompany } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [selectedTech, setSelectedTech] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState(null); // State to store form data

  const recruiter = dataRecruiter.find((hr) => hr?.uid === user?.uid);
  const companyID = recruiter?.company_id;
  const company = dataCompany.find((com) => com._id === companyID);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const techStackValues = selectedTech.map((tech) => tech.value);
    formData.append("tech_stack", JSON.stringify(techStackValues));
    formData.append("company", companyID);

    const jsonFormData = JSON.stringify(Object.fromEntries(formData.entries()));
    setFormData(jsonFormData); // Store form data in state
    setShowModal(true); // Show modal
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/job/dang-bai",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Response from server:", response.data);
      setShowModal(false); // Hide modal
      window.location.assign("/viec-lam-IT");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-2xl bg-[#f5f5f5] px-4 xl:px-24">
      {/* form */}
      <div className="px-4 pt-10 lg:px-16">
        <form
          onSubmit={handleSubmit}
          className="mb-2 w-full rounded bg-white px-8 pb-8 pt-4 shadow-2xl"
        >
          {/* 1st row */}
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <InputTemplate
                title="Tên công việc"
                placeholder="Ex: Tuyển dụng Fresher Java"
                type="text"
                id="job_title"
                name="job_title"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <InputTemplate title="Tên công ty" value={company?.name} />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="w-full lg:w-1/2">
              <InputTemplate
                title="Lương tối thiểu"
                placeholder="Ex: 1.000.000"
                type="number"
                id="min_salary"
                name="min_salary"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Yêu cầu kinh nghiệm
              </label>
              <Select
                styles={customStyle}
                options={yearExperience}
                placeholder="Chọn số năm kinh nghiệm"
                id="year_exp"
                name="year_exp"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="w-full lg:w-1/2">
              <InputTemplate
                title="Lương tối đa"
                placeholder="Ex: 10.000.000"
                type="number"
                id="max_salary"
                name="max_salary"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Loại hợp đồng
              </label>
              <Select
                styles={customStyle}
                options={contractTypeOptions}
                placeholder="Chọn loại hợp đồng"
                id="contract"
                name="contract"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="w-full lg:w-1/2">
              <InputTemplate
                title="Địa chỉ cụ thể"
                placeholder="Ex: Đường D1, Đ. D1, Phường Tân Phú, Quận 9, Hồ Chí Minh"
                type="text"
                id="address"
                name="address"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Cấp bậc
              </label>
              <Select
                styles={customStyle}
                options={levelOptions}
                placeholder="Chọn cấp bậc"
                id="level"
                name="level"
              />
            </div>
          </div>

          {/* 5th row */}
          <div className="create-job-flex">
            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Địa điểm làm việc
              </label>
              <Select
                styles={customStyle}
                options={locationOption}
                placeholder="Chọn địa điểm làm việc"
                id="location"
                name="location"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Hình thức làm việc
              </label>
              <Select
                styles={customStyle}
                options={jobTypeOptions}
                placeholder="Chọn hình thức làm việc"
                id="job_type"
                name="job_type"
              />
            </div>
          </div>
          {/* 6th row */}
          <div className="">
            <label className="my-2 block text-sm font-bold text-gray-700">
              Yêu cầu kỹ năng
            </label>
            <Select
              styles={customStyle}
              options={techStack}
              value={selectedTech}
              onChange={setSelectedTech}
              placeholder="Chọn các kỹ năng liên quan"
              isMulti
            />
          </div>

          {/* 7th row */}
          <div className="w-full">
            <h1 className="mt-4 font-bold">Mô tả công việc</h1>
            <label className="my-1 block text-sm font-bold text-gray-700">
              Trách nhiệm công việc
            </label>
            <InputTemplate
              isTextArea
              rows={6}
              type="text"
              id="mission"
              name="mission"
            />
            <label className="my-1 block text-sm font-bold text-gray-700">
              Kỹ năng và chuyên môn
            </label>
            <InputTemplate
              isTextArea
              rows={6}
              type="text"
              id="requirement"
              name="requirement"
            />
            <label className="my-1 block text-sm font-bold text-gray-700">
              Quyền lợi
            </label>
            <InputTemplate
              isTextArea
              rows={6}
              type="text"
              id="benefit"
              name="benefit"
            />
          </div>

          <button className="btn-1 w-full" type="submit">
            Đăng bài
          </button>
        </form>
      </div>
      <CustomModal
        title="Xác nhận đăng bài"
        body="Bạn sẽ phải sử dụng 1 credit cho bài đăng của công việc này!"
        show={showModal}
        handleClose={() => setShowModal(false)}
        footerActions={[
          {
            label: "Hủy",
            variant: "secondary",
            onClick: () => setShowModal(false),
          },
          {
            label: "Xác nhận",
            variant: "primary",
            onClick: handleConfirm,
          },
        ]}
      />
    </div>
  );
};

export default PostJobs;
