/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Dropdown = ({ label, options, selectedValue, onSelect }) => {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-1/6 h-12 flex items-center justify-between border-[2px] border-primary rounded"
    >
      <button
        onClick={toggleDropdown}
        className="w-full h-full flex items-center justify-between px-3"
      >
        <span>{selectedValue.label || label}</span>
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
                className="cursor-pointer p-3 hover:bg-gray-100"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
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
