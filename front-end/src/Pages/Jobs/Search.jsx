/* eslint-disable react/prop-types */
import Dropdown from "../../components/DropDown";
import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";
import axios from "axios";
import apiEndpoint from "../../api";
import {
  locationOption,
  levelOptions,
  jobTypeOptions,
  contractTypeOptions,
} from "../../assets/defaultData";
import { FaSearch } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function Search({ setResultSearch, setShowResult }) {
  const [tags, setTags] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [selectedContractType, setSelectedContractType] = useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteFilter = () => {
    setSelectedLocation("Tất cả địa điểm");
    setSelectedLevel("Tất cả cấp bậc");
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
    <div className="container space-y-2 md:space-y-3">
      <div className="mt-8 flex h-14 items-center space-x-2 rounded-md border-[2px] border-primary bg-white px-2 lg:px-4">
        <div className="flex-1">
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            delimiters={delimiters}
            placeholder="Tìm kiếm theo Kỹ năng, Vị trí công việc..."
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
        <div className="">
          <button
            onClick={handleSearch}
            className="btn-1 flex items-center space-x-1"
          >
            <FaSearch />
            <span className="hidden md:block">Tìm kiếm</span>
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-2 text-sm md:gap-3 md:text-base xl:grid-cols-5">
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
          className="mb-4 flex h-10 cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#c2c2c2] font-bold text-red-500 hover:bg-gray-300 max-xl:col-span-2 lg:mb-8"
        >
          <FaFilterCircleXmark />
          <span>Xóa bộ lọc</span>
        </button>
      </div>
    </div>
  );
}

export default Search;
