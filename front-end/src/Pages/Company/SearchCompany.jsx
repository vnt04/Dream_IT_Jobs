/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import apiEndpoint from "../../api";

const location = [
  { value: "Tất cả", label: "Tất cả" },
  { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
];
const customStyle = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #d1d5db",
    boxShadow: state.isFocused ? "#d1d5db" : "none",
    "&:hover": {
      border: "2px solid #d1d5db",
    },
    height: "48px",
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

function SearchCompany({ setResultSearch }) {
  const [companyName, setCompanyName] = useState("");
  const [selected, setSelected] = useState(null);
  const handleSearch = () => {
    const name = companyName;
    const city = selected ? selected.value : null;
    axios
      .get(apiEndpoint.search_company, { params: { name, city } })
      .then((response) => setResultSearch(response.data))
      .catch((error) => console.log(error));
  };
  return (
    <div className="mt-6 grid grid-rows-2 items-center space-y-1 text-sm lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:space-x-2 lg:text-base">
      <div className="flex h-12 w-full items-center space-x-3 rounded border border-primary p-2">
        <FaSearch className="size-5 text-gray-600" />
        <input
          className="h-full w-full outline-none"
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Nhập tên công ty bạn đang tìm kiếm ..."
        ></input>
      </div>
      <div className="grid h-full grid-cols-4 space-x-2">
        <div className="col-span-3">
          <Select
            styles={customStyle}
            placeholder="Địa điểm"
            options={location}
            value={selected}
            onChange={setSelected}
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-12 rounded bg-primary font-bold text-white hover:bg-[#299C8D]"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}

export default SearchCompany;
