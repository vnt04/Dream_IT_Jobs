import { FaSearch } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import Tag from "../../components/Tag";

function QuickSearch() {
  return (
    <div className="container h-60 bg-[#acf2ed]">
      <div className="flex items-center">
        <IoIosFlash className="size-10 text-yellow-400" />
        <h1 className="font-bold text-xl my-5">
          Tìm việc làm IT nhanh chóng - Cơ hội tốt ngay hôm nay!
        </h1>
      </div>
      <div className="flex items-center gap-2 h-16 rounded bg-white">
        <div className="pl-3 flex-1 lg:text-base">
          <input
            type="text"
            className="w-full border-none outline-none text-[16px]"
            placeholder="Tìm kiếm theo các Kỹ năng, Vị trí, Công ty,..."
          />
        </div>
        <div className="m-5">
          <button className="flex items-center h-12 px-4 font-bold text-white text-[18px] border border-solid rounded bg-primary">
            <FaSearch className="mx-2" />
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className="mt-5 flex gap-2 items-center">
        <h2>Đề xuất từ khóa : </h2>
        <div className="flex gap-3">
          {[
            "Java",
            "ReactJS",
            "NodeJS",
            "Javascript",
            "C++",
            "PHP",
            "Backend",
            "Frontend",
            "Angular",
          ].map((tech, index) => (
            <Tag key={index} name={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickSearch;
