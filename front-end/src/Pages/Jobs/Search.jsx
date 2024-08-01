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
    <div className="container">
      <div className="flex h-auto items-center gap-2 rounded border-[2px] border-primary bg-white">
        <div className="flex-1 pl-3 lg:text-base">
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            delimiters={delimiters}
            placeholder="Tìm kiếm công việc theo kỹ năng ..."
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
            className="flex h-10 items-center rounded border border-solid bg-primary px-4 text-[14px] font-bold text-white"
          >
            <FaSearch className="mx-2" />
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="flex gap-2 py-2">
        <div className="w-1/5">
          <Dropdown
            type="single"
            label="Tất cả địa điểm"
            options={locationOption}
            selectedValue={selectedLocation}
            onSelect={setSelectedLocation}
          />
        </div>
        <div className="w-1/5">
          <Dropdown
            type="single"
            label="Tất cả cấp bậc"
            options={levelOptions}
            selectedValue={selectedLevel}
            onSelect={setSelectedLevel}
          />
        </div>
        <div className="w-1/5">
          <Dropdown
            type="multi"
            label="Tất cả loại công việc"
            options={jobTypeOptions}
            selectedValue={selectedJobType}
            onSelect={setSelectedJobType}
          />
        </div>
        <div className="w-1/5">
          <Dropdown
            type="multi"
            label="Tất cả loại hợp đồng"
            options={contractTypeOptions}
            selectedValue={selectedContractType}
            onSelect={setSelectedContractType}
          />
        </div>

        <button
          onClick={handleDeleteFilter}
          className="flex h-10 w-1/6 cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#c2c2c2] font-bold text-red-500 hover:bg-gray-300"
        >
          <FaFilterCircleXmark />
          <span>Xóa bộ lọc</span>
        </button>
      </div>
    </div>
  );
}

export default Search;
