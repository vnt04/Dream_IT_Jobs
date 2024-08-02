/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Dropdown = ({ label, options, selectedValue, onSelect, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (event, option) => {
    event.preventDefault();
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
        const newLabel = `${label.slice(7, label.length)} (+${selectedValue.length})`;
        return newLabel.charAt(0).toUpperCase() + newLabel.slice(1);
      }
    } else {
      return selectedValue?.label || label;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSelected =
    type === "multi"
      ? selectedValue.length > 0
      : options.includes(selectedValue);

  return (
    <div
      ref={dropdownRef}
      className={
        "relative flex h-10 items-center justify-between rounded border-[2px] border-primary"
      }
    >
      <button
        onClick={toggleDropdown}
        className={`flex h-full w-full items-center justify-between px-3 ${isSelected ? "bg-gray-200 font-semibold" : ""}`}
      >
        <span>{multiLabel()}</span>
        <MdOutlineArrowDropDown
          className={`size-6 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-10 w-full translate-y-1 rounded-xl bg-white opacity-100 shadow-2xl transition-all ease-out">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className={`${type === "multi" ? "flex items-center gap-2" : ""} cursor-pointer p-3 hover:bg-gray-100`}
                onClick={(event) => {
                  handleOptionClick(event, option);
                }}
              >
                {type === "multi" && (
                  <input
                    type="checkbox"
                    checked={selectedValue.includes(option)}
                    onChange={(event) => handleOptionClick(event, option)}
                    className="h-4 w-4 rounded checked:accent-teal-300"
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
