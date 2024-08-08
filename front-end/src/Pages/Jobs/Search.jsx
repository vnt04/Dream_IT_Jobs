/* eslint-disable react-hooks/exhaustive-deps */
import Dropdown from "../../components/DropDown";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import { useState, useEffect } from "react";
import {
  locationOption,
  levelOptions,
  jobTypeOptions,
  contractTypeOptions,
} from "../../assets/defaultData";
import { FaSearch } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Search() {
  const [tags, setTags] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState({
    label: "Tất cả địa điểm",
    value: "Tất cả địa điểm",
  });
  const [selectedLevel, setSelectedLevel] = useState({
    label: "Tất cả cấp bậc",
    value: "Tất cả cấp bậc",
  });
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [selectedContractType, setSelectedContractType] = useState([]);

  const handleDelete = (i) => {
    setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags((currentTags) => [...currentTags, tag]);
  };

  const handleDeleteFilter = () => {
    setSelectedLocation({
      label: "Tất cả địa điểm",
      value: "Tất cả địa điểm",
    });
    setSelectedLevel({
      label: "Tất cả cấp bậc",
      value: "Tất cả cấp bậc",
    });
    setSelectedJobType([]);
    setSelectedContractType([]);
  };

  const handleSearch = () => {
    let updatedTags = [...tags];
    if (currentInput) {
      const newTag = {
        id: currentInput,
        text: currentInput,
        className: "",
      };
      const isDuplicate = updatedTags.some((tag) => tag.text === newTag.text);

      if (!isDuplicate) {
        updatedTags = [...updatedTags, newTag];
        setTags(updatedTags);
      }
      setCurrentInput("");
    }
    setLoading(true);
    const searchParams = new URLSearchParams();
    if (updatedTags.length > 0)
      updatedTags.forEach((tag) => searchParams.append("tech", tag.text));
    if (selectedLocation.value !== "Tất cả địa điểm")
      searchParams.append("location", selectedLocation.value);
    if (selectedLevel.value !== "Tất cả cấp bậc")
      searchParams.append("level", selectedLevel.value);
    if (selectedJobType.length > 0)
      selectedJobType.map((type) => searchParams.append("jobType", type.value));
    if (selectedContractType.length > 0)
      selectedContractType.map((contract) =>
        searchParams.append("contractType", contract.value),
      );
    navigate(`/viec-lam-it?${searchParams.toString()}`);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    if (tags.length > 0) {
      handleSearch();
    }
  }, [tags]);

  return (
    <div className="container space-y-2 md:space-y-3">
      <div className="mt-8 flex h-14 items-center space-x-2 rounded-md border-[2px] border-primary bg-white px-2 lg:px-4">
        <div className="flex-1">
          <ReactTags
            tags={tags}
            inputValue={currentInput}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            separators={[SEPARATORS.COMMA, SEPARATORS.ENTER]}
            placeholder="Tìm kiếm theo Kỹ năng, Vị trí công việc..."
            inputFieldPosition="inline"
            handleInputChange={(e) => {
              setCurrentInput(e);
            }}
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
        <button onClick={handleSearch} className="btn-1" disabled={loading}>
          {loading ? (
            <ClipLoader color="#ffffff" loading={loading} size={10} />
          ) : (
            <div className="flex items-center space-x-1">
              <FaSearch />
              <span className="hidden md:block">Tìm kiếm</span>
            </div>
          )}
        </button>
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
