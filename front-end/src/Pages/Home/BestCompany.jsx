import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { FaSun } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import Tag from "../../components/Tag";

function BestCompany() {
  const { mostFollow } = useContext(DataContext);

  return (
    <div className="container ">
      <div className="flex justify-between py-4">
        <div className="flex items-center space-x-1">
          <FaSun className="size-6 text-yellow-400 md:size-8" />
          <h1 className="font-bold md:text-xl">Top công ty </h1>
          <h1 className="font-bold text-red-600 md:text-xl">hàng đầu</h1>
        </div>
        <a
          href={"/cong-ty-IT"}
          className="text-sm font-semibold text-red-400 underline hover:text-red-600 md:text-base"
        >
          Xem tất cả
        </a>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-5">
        {mostFollow.map((data, index) => (
          <div
            key={index}
            className="h-64 space-y-2 rounded-xl border-[2px] bg-white p-4"
          >
            <a href={`/cong-ty-IT/${data._id}`} className="flex h-32 w-full">
              <img
                src={`/src/assets/img-company/${data.logo}`}
                alt=""
                className="h-full w-full p-4 object-contain"
              />
              <CiBookmark className="size-8" />
            </a>
            <a
              href={`/cong-ty-IT/${data._id}`}
              className="line-clamp-1 text-[18px] font-bold"
            >
              {data.name}
            </a>
            <div className="line-clamp-1">{data.location.join(" - ")}</div>
            <div className="flex justify-start space-x-2 overflow-hidden whitespace-nowrap">
              {data.tech_stack.map((tech, index) => (
                <Tag key={index} name={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 py-4">
        <button className="h-8 w-8 rounded-[50%] border border-solid border-teal-600 text-[18px] font-bold text-teal-600">
          &lt;
        </button>
        <div className="text-sm italic">1 / 3 trang</div>
        <button className="h-8 w-8 rounded-[50%] border border-solid border-teal-600 text-[18px] font-bold text-teal-600">
          &gt;
        </button>
      </div>
    </div>
  );
}

export default BestCompany;
