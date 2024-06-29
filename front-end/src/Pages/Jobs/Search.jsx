import { FaSearch } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaFilterCircleXmark } from "react-icons/fa6";
import Dropdown from "../../components/DropDown";
import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";

const locationOption = [
  { value: "Tất cả", label: "Tất cả địa điểm" },
  { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
];

const levelOptions = [
  { value: "Tất cả", label: "Tất cả cấp bậc" },
  { value: "Intern", label: "Intern" },
  { value: "Junior", label: "Junior" },
  { value: "Senior", label: "Senior" },
];

const jobTypeOptions = [
  { value: "Tất cả", label: "Tất cả loại công việc" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
];

const contractTypeOptions = [
  { value: "Tất cả", label: "Tất cả loại hợp đồng" },
  { value: "Permanent", label: "Permanent" },
  { value: "Temporary", label: "Temporary" },
];

const salaryOptions = [
  { value: "Tất cả", label: "Tất cả mức lương" },
  { value: "< $1000", label: "< $1000" },
  { value: "$1000 - $2000", label: "$1000 - $2000" },
  { value: "> $2000", label: "> $2000" },
];

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function Search() {
  const [tags, setTags] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(locationOption[0]);
  const [selectedLevel, setSelectedLevel] = useState(levelOptions[0]);
  const [selectedJobType, setSelectedJobType] = useState(jobTypeOptions[0]);
  const [selectedContractType, setSelectedContractType] = useState(
    contractTypeOptions[0]
  );
  const [selectedSalary, setSelectedSalary] = useState(salaryOptions[0]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
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
            <button className="flex items-center h-10 px-4 font-bold text-white text-[14px] border border-solid rounded bg-primary">
              <FaSearch className="mx-2" />
              Tìm kiếm
            </button>
          </div>
        </div>

        <div className="flex gap-2 py-4">
          <Dropdown
            label="Tất cả địa điểm"
            options={locationOption}
            selectedValue={selectedLocation}
            onSelect={setSelectedLocation}
          />
          <Dropdown
            label="Tất cả cấp bậc"
            options={levelOptions}
            selectedValue={selectedLevel}
            onSelect={setSelectedLevel}
          />
          <Dropdown
            label="Tất cả loại công việc"
            options={jobTypeOptions}
            selectedValue={selectedJobType}
            onSelect={setSelectedJobType}
          />
          <Dropdown
            label="Tất cả loại hợp đồng"
            options={contractTypeOptions}
            selectedValue={selectedContractType}
            onSelect={setSelectedContractType}
          />
          <Dropdown
            label="Tất cả mức lương"
            options={salaryOptions}
            selectedValue={selectedSalary}
            onSelect={setSelectedSalary}
          />

          <div className="w-1/6 h-12 flex gap-2 justify-center cursor-pointer items-center font-bold rounded-sm text-red-500 bg-[#c2c2c2]">
            <FaFilterCircleXmark />
            <span>Xóa bộ lọc</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
