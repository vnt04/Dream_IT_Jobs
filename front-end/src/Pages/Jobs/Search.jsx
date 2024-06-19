import { FaSearch } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { MdOutlineArrowDropDown } from "react-icons/md";

function Search() {
  return (
    <div>
      <div className="container h-auto bg-gradient-to-r from-[#206763] to-[#93efeb]">
        <div className=" grid gap-4 m-2 text-white">
          <h1 className="font-bold text-3xl">Việc làm IT</h1>
          <h2 className="font-bold ">
            Việc làm IT xịn dành cho Developer chất
          </h2>
          <div className="flex gap-4 my-2">
            <div className="flex items-center gap-0.5 font-semibold rounded-xl px-1 bg-white text-[#2a8782]">
              <IoCheckmarkCircle className="" />
              Backend
            </div>
            <div className="flex items-center gap-0.5 font-semibold rounded-xl px-1 bg-white text-[#2a8782]">
              <IoCheckmarkCircle className="" />
              Frontend
            </div>
            <div className="flex items-center gap-0.5 font-semibold rounded-xl px-1 bg-white text-[#2a8782]">
              <IoCheckmarkCircle className="" />
              Tester
            </div>
            <div className="flex items-center gap-0.5 font-semibold rounded-xl px-1 bg-white text-[#2a8782]">
              <IoCheckmarkCircle className="" />
              Business Analyst
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className=" flex items-center gap-2 h-12 border-[2px] border-primary rounded bg-white">
          <div className="pl-3 flex-1 lg:text-base">
            <input
              type="text"
              className="w-full border-none outline-none text-[16px]"
              placeholder="Tìm kiếm theo các Kỹ năng, Vị trí, Công ty,..."
            />
          </div>
          <div className="m-5">
            <button className="flex items-center h-8 px-2 font-bold text-white text-[14px] border border-solid rounded bg-primary">
              <FaSearch className="mx-2" />
              Tìm kiếm
            </button>
          </div>
        </div>

        <div className="flex gap-2 py-4">
          <div className="w-1/6 h-12 flex items-center justify-between border-[2px] border-primary rounded">
            <span className=" m-3">Tất cả địa điểm</span>
            <MdOutlineArrowDropDown className="size-6" />
          </div>
          <div className="w-1/6 h-12 flex items-center justify-between border-[2px] border-primary rounded">
            <span className=" m-3">Tất cả cấp bậc</span>
            <MdOutlineArrowDropDown className="size-6" />
          </div>
          <div className="w-1/6 h-12 flex items-center justify-between border-[2px] border-primary rounded">
            <span className=" m-3">Tất cả loại công việc</span>
            <MdOutlineArrowDropDown className="size-6" />
          </div>
          <div className="w-1/6 h-12 flex items-center justify-between border-[2px] border-primary rounded">
            <span className=" m-3">Tất cả loại hợp đồng</span>
            <MdOutlineArrowDropDown className="size-6" />
          </div>
          <div className="w-1/6 h-12 flex items-center justify-between border-[2px] border-primary rounded">
            <span className=" m-3">Tất cả mức lương</span>
            <MdOutlineArrowDropDown className="size-6" />
          </div>
          <div className="w-1/6 h-12 flex gap-2 justify-center cursor-pointer items-center font-bold rounded-sm text-red-500 bg-[#c2c2c2]">
            <FaFilterCircleXmark />
            <span>Xóa bộ lọc</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
