// import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Tag from "../../components/Tag";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import apiEndpoint from "../../api";
import { techStack } from "../../assets/defaultData";
import { useNavigate } from "react-router-dom";

function QuickSearch() {
  const [relatedCompany, setRelatedCompany] = useState([]);
  const [relatedSkill, setRelatedSkill] = useState([]);
  const [showRelatedSearch, setShowRelatedSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const related = useRef(null);

  useEffect(() => {
    if (inputValue) {
      const skillFilter = techStack.filter((tech) =>
        tech.value.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setRelatedSkill(skillFilter);
      axios
        .get(`${apiEndpoint.search_company}?name=${inputValue}`)
        .then((response) => setRelatedCompany(response.data))
        .catch((error) => console.log(error));
    } else {
      setRelatedCompany([]);
      setRelatedSkill([]);
    }
  }, [inputValue]);

  const handleSearch = () => {
    if (inputValue) {
      if (relatedCompany.length > 0 && relatedSkill.length > 0) {
        navigate(`/viec-lam-it?tech=${inputValue}`);
      } else if (relatedCompany.length > 0) {
        navigate(`/cong-ty-it/search?name=${inputValue}`);
      } else {
        navigate(`/viec-lam-it?tech=${inputValue}`);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideRelative);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideRelative);
    };
  });
  const handleClickOutsideRelative = (e) => {
    if (related && !related.current?.contains(e.target)) {
      setShowRelatedSearch(false);
    }
  };
  return (
    <div className="container">
      <h1 className="text-balance pb-2 pt-6 text-center font-bold text-blue-950 md:text-2xl">
        Việc làm IT trong mơ, nơi đam mê gặp gỡ cơ hội
      </h1>
      <div className="relative flex h-16 items-center space-x-2 rounded-md bg-white px-2 lg:px-4">
        <div className="flex-1">
          <input
            type="text"
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowRelatedSearch(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setInputValue(e.target.value);
                handleSearch();
              }
            }}
            className="w-full border-none text-[14px] outline-none md:text-base"
            placeholder="Nhập từ khóa theo kỹ năng, chức vụ, công ty..."
          />
        </div>
        <button
          onClick={handleSearch}
          className="btn-1 flex items-center space-x-1"
        >
          <IoSearch className="size-6" />
          <span className="hidden md:block">Tìm kiếm</span>
        </button>

        {/* Related Search */}
        {(relatedSkill?.length > 0 || relatedCompany?.length > 0) &&
          showRelatedSearch && (
            <div
              ref={related}
              className="absolute right-0 top-[102%] z-50 w-full space-y-1 rounded-b-2xl border bg-white p-1 shadow-2xl"
            >
              {relatedSkill?.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-[#aaa]">
                    Kỹ năng
                  </span>
                  <div className="flex flex-col items-start">
                    {relatedSkill.slice(0, 5).map((skill) => (
                      <a
                        key={skill.label}
                        href={`/viec-lam-it?tech=${skill.value}`}
                        onClick={() => setShowRelatedSearch(false)}
                        className="flex items-center space-x-4 p-2"
                      >
                        <FaSearch className="size-3" />
                        <span>{skill.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {relatedCompany?.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-[#aaa]">
                    Công ty
                  </span>
                  <div className="flex flex-col items-start">
                    {relatedCompany.slice(0, 5).map((company) => (
                      <a
                        className="flex items-center space-x-4 p-2"
                        key={company.name}
                        href={`/cong-ty-it/${company._id}`}
                        onClick={() => setShowRelatedSearch(false)}
                      >
                        <FaSearch className="size-3" />
                        <span>{company.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
      <div className="w-full space-y-2 pb-6 pt-4">
        <span>Đề xuất từ khóa: </span>
        <div className="flex flex-wrap gap-2">
          {[
            "Java",
            "ReactJS",
            "NodeJS",
            "Javascript",
            "C++",
            "PHP",
            "Backend",
            "Frontend",
            "Business Analyst",
          ].map((tech, index) => (
            <Tag key={index} name={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickSearch;
