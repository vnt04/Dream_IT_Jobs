/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Dropdown = ({ label, options, selectedValue, onSelect, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleOptionClick = (option) => {
    if (type === "multi") {
      if (selectedValue.includes(option)) {
        onSelect(selectedValue.filter((item) => item !== option));
      } else {
        onSelect([...selectedValue, option]);
      }
    } else {
      setIsOpen(false);
      onSelect(option);
    }
  };
  const multiLabel = () => {
    if (type === "multi" && selectedValue.length > 0) {
      if (selectedValue.length === 1) {
        return selectedValue[0].label;
      } else {
        return `L${label.slice(8, label.length)} (+${selectedValue.length})`;
      }
    } else {
      return selectedValue.label || label;
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const isSelected =
    type === "multi" ? selectedValue.length > 0 : selectedValue !== options[0];
  return (
    <div
      ref={dropdownRef}
      className={
        "relative w-1/5 h-12 flex items-center justify-between border-[2px] border-primary rounded "
      }
    >
      <button
        onClick={toggleDropdown}
        className={`w-full h-full flex items-center justify-between px-3 ${isSelected ? "bg-gray-200 font-semibold" : ""}`}
      >
        <span>{multiLabel()}</span>
        <MdOutlineArrowDropDown
          className={`size-6 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute bg-white transition-all ease-out opacity-100 rounded-xl w-full left-0 top-full translate-y-1 shadow-2xl z-10">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className={`${type === "multi" ? "flex gap-2 items-center" : ""} cursor-pointer p-3 hover:bg-gray-100`}
                onClick={() => {
                  handleOptionClick(option);
                }}
              >
                {type === "multi" && (
                  <input
                    type="checkbox"
                    checked={selectedValue.includes(option)}
                    onChange={() => handleOptionClick(option)}
                    className="h-4 w-4 rounded checked:accent-teal-300 "
                  />
                )}
                <span className="line-clamp-1">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
