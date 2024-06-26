/* eslint-disable react/prop-types */
import Dropdown from "../../components/DropDown";
import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";
import axios from "axios";
import apiEndpoint from "../../api";
import { FaSearch } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaFilterCircleXmark } from "react-icons/fa6";

const locationOption = [
  { value: "Tất cả địa điểm", label: "Tất cả địa điểm" },
  { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
];

const levelOptions = [
  { value: "Tất cả cấp bậc", label: "Tất cả cấp bậc" },
  { value: "Intern", label: "Intern" },
  { value: "Fresher", label: "Fresher" },
  { value: "Junior", label: "Junior" },
  { value: "Middle", label: "Middle" },
  { value: "Senior", label: "Senior" },
  { value: "Tech Lead", label: "Tech Lead" },
];

const jobTypeOptions = [
  { value: "In Office", label: "In Office" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Remote", label: "Remote" },
  { value: "Oversea", label: "Oversea" },
];

const contractTypeOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Freelancer", label: "Freelancer" },
  { value: "Part-time", label: "Part-time" },
];

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function Search({ setResultSearch, setShowResult }) {
  const [tags, setTags] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(locationOption[0]);
  const [selectedLevel, setSelectedLevel] = useState(levelOptions[0]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [selectedContractType, setSelectedContractType] = useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteFilter = () => {
    setSelectedLocation(locationOption[0]);
    setSelectedLevel(levelOptions[0]);
    setSelectedJobType([]);
    setSelectedContractType([]);
  };

  const handleSearch = () => {
    axios
      .get(apiEndpoint.search_job, {
        params: {
          tags: JSON.stringify(tags),
          selectedLocation: JSON.stringify(selectedLocation),
          selectedLevel: JSON.stringify(selectedLevel),
          selectedJobType: JSON.stringify(selectedJobType),
          selectedContractType: JSON.stringify(selectedContractType),
        },
      })
      .then((response) => {
        setResultSearch(response.data);
        setShowResult(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="container h-auto bg-gradient-to-r from-[#206763] to-[#93efeb]">
        <div className="grid gap-4 m-2 text-white">
          <h1 className="font-bold text-3xl">Việc làm IT</h1>
          <h2 className="font-bold">Việc làm IT xịn dành cho Developer chất</h2>
          <div className="flex gap-4 my-2">
            {["Backend", "Frontend", "Tester", "Business Analyst"].map(
              (role, index) => (
                <div
                  key={index}
                  className="flex items-center gap-0.5 font-semibold rounded-xl px-1 bg-white text-[#2a8782]"
                >
                  <IoCheckmarkCircle />
                  {role}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex items-center gap-2 h-14 border-[2px] border-primary rounded bg-white">
          <div className="pl-3 flex-1 lg:text-base">
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              delimiters={delimiters}
              placeholder="Tìm kiếm công việc mơ ước của bạn ..."
              inputFieldPosition="inline"
              autocomplete
              classNames={{
                tags: "tagsClass",
                tagInput: "tagInputClass",
                tagInputField: "tagInputFieldClass",
                selected: "selectedClass",
                tag: "tagClass",
                remove: "removeClass",
              }}
            />
          </div>
          <div className="m-5">
            <button
              onClick={handleSearch}
              className="flex items-center h-10 px-4 font-bold text-white text-[14px] border border-solid rounded bg-primary"
            >
              <FaSearch className="mx-2" />
              Tìm kiếm
            </button>
          </div>
        </div>

        <div className="flex gap-2 py-4">
          <Dropdown
            type="single"
            label="Tất cả địa điểm"
            options={locationOption}
            selectedValue={selectedLocation}
            onSelect={setSelectedLocation}
          />
          <Dropdown
            type="single"
            label="Tất cả cấp bậc"
            options={levelOptions}
            selectedValue={selectedLevel}
            onSelect={setSelectedLevel}
          />
          <Dropdown
            type="multi"
            label="Tất cả loại công việc"
            options={jobTypeOptions}
            selectedValue={selectedJobType}
            onSelect={setSelectedJobType}
          />
          <Dropdown
            type="multi"
            label="Tất cả loại hợp đồng"
            options={contractTypeOptions}
            selectedValue={selectedContractType}
            onSelect={setSelectedContractType}
          />

          <button
            onClick={handleDeleteFilter}
            className="w-1/6 h-12 flex gap-2 justify-center cursor-pointer items-center font-bold rounded-sm text-red-500 bg-[#c2c2c2] hover:bg-gray-300"
          >
            <FaFilterCircleXmark />
            <span>Xóa bộ lọc</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
