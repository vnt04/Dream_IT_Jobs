/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { locationOption } from "../../resources/defaultData";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import apiEndpoint from "../../api";

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

function SearchCompany() {
  const [companyName, setCompanyName] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [relatedCompany, setRelatedCompany] = useState([]);
  const [showRelatedCompany, setShowRelatedCompany] = useState(false);
  const relative = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (companyName) {
      axios
        .get(`${apiEndpoint.search_company}?name=${companyName}`)
        .then((response) => setRelatedCompany(response.data))
        .catch((error) => console.log(error));
    } else {
      setRelatedCompany([]);
    }
  }, [companyName]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideRelative);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideRelative);
    };
  });
  const handleClickOutsideRelative = (e) => {
    if (relative && !relative.current.contains(e.target)) {
      setRelatedCompany(false);
    }
  };

  const handleSearch = () => {
    setRelatedCompany(false);
    setLoading(true);
    const name = companyName;
    const city = selected ? selected.value : null;
    const searchParams = new URLSearchParams();
    searchParams.append("name", name);
    searchParams.append("city", city);
    navigate(`/cong-ty-it/search?${searchParams.toString()}`);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="mt-6 grid grid-rows-2 items-center space-y-1 text-sm lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:space-x-2 lg:text-base">
      <div className="relative flex h-12 w-full items-center space-x-3 rounded border border-primary p-2">
        <FaSearch className="size-5 text-gray-600" />
        <input
          className="h-full w-full outline-none"
          value={companyName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCompanyName(e.target.value);
              handleSearch();
            }
          }}
          onChange={(e) => {
            setCompanyName(e.target.value);
            setShowRelatedCompany(true);
          }}
          placeholder="Nhập tên công ty bạn đang tìm kiếm ..."
        ></input>
        {relatedCompany?.length > 0 && showRelatedCompany && (
          <div
            ref={relative}
            className="absolute right-0 top-[110%] z-50 flex w-full flex-col space-y-1 rounded-lg border bg-white shadow-2xl"
          >
            {relatedCompany.map((company) => (
              <button
                key={company._id}
                onClick={() => {
                  setCompanyName(company.name);
                  setShowRelatedCompany(false);
                }}
                className="flex items-center space-x-4 p-2"
              >
                <FaSearch className="size-3" />
                <span>{company.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid h-full grid-cols-4 space-x-2">
        <div className="col-span-3">
          <Select
            styles={customStyle}
            placeholder="Tất cả địa điểm"
            options={locationOption}
            value={selected}
            onChange={setSelected}
          />
        </div>
        <button
          onClick={handleSearch}
          className="flex h-12 items-center justify-center rounded bg-primary font-bold text-white hover:bg-[#299C8D]"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" loading={loading} size={20} />
          ) : (
            "Tìm kiếm"
          )}
        </button>
      </div>
    </div>
  );
}

export default SearchCompany;
