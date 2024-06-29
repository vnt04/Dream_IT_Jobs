import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { FaSun } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";

function BestCompany() {
  const { mostFollow } = useContext(DataContext);
  const rowData = [];
  for (let i = 0; i < mostFollow.length; i += 3) {
    rowData.push(mostFollow.slice(i, i + 3));
  }
  return (
    <div className="container h-auto bg-[#f5f5f5]">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <FaSun className="size-10 text-yellow-400" />
          <h1 className="my-5 font-bold text-xl lg:text-2xl">Top công ty </h1>
          <h1 className="my-5 font-bold text-xl lg:text-2xl text-red-600">
            hàng đầu
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          <a href="" className="underline text-blue-500">
            Xem tất cả
          </a>
          <button className="h-8 w-8 font-bold border border-solid text-[18px] rounded-[50%] text-teal-600 border-teal-600">
            &lt;
          </button>
          <button className="h-8 w-8 font-bold border border-solid text-[18px] rounded-[50%] text-teal-600 border-teal-600">
            &gt;
          </button>
        </div>
      </div>

      {rowData.map((row, index) => (
        <div key={index} className="flex gap-4 mb-2">
          {row.map((data, index) => (
            <div
              key={index}
              className="h-64 w-1/3 p-4 border-[2px] rounded-xl bg-white"
            >
              <div className="h-36 w-full flex ">
                <img
                  src="./src/assets/img-company/cybozu.jpg"
                  alt=""
                  className="w-full h-full p-5"
                />
                <CiBookmark className="size-8" />
              </div>
              <div className=" font-bold text-[14px]">{data.name}</div>
              <div>{data.location}</div>
              <div className="flex justify-end underline p-1 text-red-500">
                {data.jobs.length} vị trí tuyển dụng
                <MdNavigateNext className="mt-1.5" />
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="flex gap-3 pb-4 items-center justify-center">
        <button className="h-8 w-8 font-bold border border-solid text-[18px] rounded-[50%] text-teal-600 border-teal-600">
          &lt;
        </button>
        <div className="italic text-sm">1 / 3 trang</div>
        <button className="h-8 w-8 font-bold border border-solid text-[18px] rounded-[50%] text-teal-600 border-teal-600">
          &gt;
        </button>
      </div>
    </div>
  );
}

export default BestCompany;
