/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";

const PostJobs = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/dang-bai",
        formData
      );
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  // console.log(watch("example"));

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Tên công việc</label>
              <input
                name="job_title"
                placeholder="Web Developer"
                id="job_title"
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Tên công ty</label>
              <input
                name="company"
                placeholder="Ex: Microsoft"
                id="company"
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Lương tối thiểu</label>
              <input
                name="min_salary"
                placeholder="ex: 1.000.000 "
                id="min_salary"
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Lương tối đa</label>
              <input
                name="max_salary"
                placeholder="ex: 100.000.000"
                id="max_salary"
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Yêu cầu kinh nghiệm</label>
              <select
                name="year_exp"
                id="year_exp"
                className="create-job-input"
              >
                <option value="">Kinh nghiệm thực tế</option>
                <option value="NoExperience">Không có</option>
                <option value="haftYear">Hơn 6 tháng</option>
                <option value="year">Hơn 1 năm</option>
                <option value="3year">Hơn 3 năm</option>
                <option value="5year">Hơn 5 năm</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Vị trí làm việc</label>
              <input
                name="address"
                placeholder="Ex: Hà Nội"
                id="address"
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Địa chỉ làm việc</label>
              <input
                name="location"
                placeholder="Ex: Tòa B1, chung cư CH1, khu dân cư Cityland"
                id="location"
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Cấp bậc</label>
              <select name="level" id="level" className="create-job-input">
                <option value="">Chọn cấp bậc</option>
                <option value="Internship">Thực tập sinh</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div className="">
            <label className="block mb-2 text-lg">Yêu cầu kỹ năng:</label>
            <CreatableSelect
              className="create-job-input py-4"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Logo Công ty</label>
              <input
                name="img"
                type="url"
                placeholder="Paste your image url"
                id="img"
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Hình thức làm việc</label>
              <select
                name="contract"
                id="contract"
                className="create-job-input"
              >
                <option value="">Chọn hình thức làm việc</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Mô tả công việc</label>
            <textarea
              name="decription"
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              id="decription"
              placeholder="job description"
              defaultValue={""}
            />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Người tuyển dụng</label>
            <input
              name="email"
              type="email"
              // value={user?.email}
              className="w-full pl-3 py-1.5 focus:outline-none"
              id="email"
              placeholder="your email"
            />
          </div>

          <button
            className="bg-background w-full text-white py-2 font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Đăng bài
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
