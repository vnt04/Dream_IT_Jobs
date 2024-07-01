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
    height: "46px",
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
    <div className="flex h-16 w-full mt-4 border rounded border-primary">
      <div className="w-[92%] flex gap-2 p-2 ">
        <div className="w-3/4 p-2 flex items-center gap-3 border rounded border-gray-300 hover:border-2">
          <FaSearch className="text-gray-600 text-xl" />
          <input
            className="w-full h-full outline-none p-1 "
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nhập tên công ty bạn đang tìm kiếm ..."
          ></input>
        </div>
        <div className="w-1/4 h-full">
          <Select
            styles={customStyle}
            placeholder="Địa điểm"
            options={location}
            value={selected}
            onChange={setSelected}
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="h-full w-[8%] bg-primary text-white font-bold hover:bg-[#299C8D] "
      >
        Tìm kiếm
      </button>
    </div>
  );
}

export default SearchCompany;
