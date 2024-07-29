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
          <h1 className="my-5 text-xl font-bold lg:text-2xl">Top công ty </h1>
          <h1 className="my-5 text-xl font-bold text-red-600 lg:text-2xl">
            hàng đầu
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <a href="" className="text-blue-500 underline">
            Xem tất cả
          </a>
          <button className="h-8 w-8 rounded-[50%] border border-solid border-teal-600 text-[18px] font-bold text-teal-600">
            &lt;
          </button>
          <button className="h-8 w-8 rounded-[50%] border border-solid border-teal-600 text-[18px] font-bold text-teal-600">
            &gt;
          </button>
        </div>
      </div>

      {rowData.map((row, index) => (
        <div key={index} className="mb-2 flex gap-4">
          {row.map((data, index) => (
            <div
              key={index}
              className="h-64 w-1/3 rounded-xl border-[2px] bg-white p-4"
            >
              <a href={`/cong-ty-IT/${data._id}`} className="flex h-36 w-full">
                <img
                  src={`/src/assets/img-company/${data.logo}`}
                  alt=""
                  className="h-full w-full p-2"
                />
                <CiBookmark className="size-8" />
              </a>
              <a
                href={`/cong-ty-IT/${data._id}`}
                className="text-[18px] font-bold"
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

      <div className="flex items-center justify-center gap-3 pb-4">
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
