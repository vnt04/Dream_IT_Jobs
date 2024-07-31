import { IoSearch } from "react-icons/io5";
import Tag from "../../components/Tag";

function QuickSearch() {
  return (
    <div className="container bg-[#acf2ed]">
      <h1 className="text-balance pb-2 pt-6 text-center font-bold text-blue-950 md:text-2xl">
        Việc làm IT trong mơ, nơi đam mê gặp gỡ cơ hội
      </h1>
      <div className="flex h-16 items-center space-x-2 rounded-md bg-white px-2 lg:px-4">
        <div className="flex-1">
          <input
            type="text"
            className="w-full border-none text-[14px] outline-none md:text-base"
            placeholder="Tìm theo các Kỹ năng, Vị trí, Công ty,..."
          />
        </div>
        <button className="btn-1 flex items-center space-x-1">
          <IoSearch className="size-6" />
          <span className="hidden md:block">Tìm kiếm</span>
        </button>
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
