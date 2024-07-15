import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { FaSun } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import Tag from "../../components/Tag";

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
              <a href={`/cong-ty-IT/${data._id}`} className="h-36 w-full flex ">
                <img
                  src={`/src/assets/img-company/${data.logo}`}
                  alt=""
                  className="w-full h-full p-2"
                />
                <CiBookmark className="size-8" />
              </a>
              <a
                href={`/cong-ty-IT/${data._id}`}
                className=" font-bold text-[18px]"
              >
                {data.name}
              </a>

              <div className="flex gap-2 py-2">
                {data.tech_stack.map((tech, index) => (
                  <Tag key={index} name={tech} />
                ))}
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
