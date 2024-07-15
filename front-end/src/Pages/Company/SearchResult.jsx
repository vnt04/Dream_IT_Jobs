/* eslint-disable react/prop-types */
import { getRows } from "../../utils";
import { CiBookmark } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

function SearchResult({ resultSearch }) {
  const rowData = getRows(resultSearch, 3);
  return (
    <div>
      {resultSearch?.length > 0 ? (
        <div>
          <div>Có {resultSearch?.length} kết quả về</div>
          {rowData.map((row, index) => (
            <div key={index} className="flex gap-4 mb-2">
              {row.map((data, index) => (
                <div
                  key={index}
                  className="mt-2 w-1/4 h-[358px] rounded-xl border"
                >
                  <div className="h-60 relative mb-2">
                    <img
                      src="/src/assets/img-company/banner_fpt.jpg"
                      className="h-[90%] w-full rounded-tl-xl rounded-tr-xl"
                      alt="banner"
                    />
                    <div className="absolute bottom-0 h-20 w-20 left-4 rounded-md border border-gray-100">
                      <img src="/src/assets/img-company/fpt.png" alt="" />
                    </div>
                  </div>

                  <div className="px-4">
                    <h3 className="text-[#333] text-left font-semibold uppercase">
                      {data.name}
                    </h3>
                    <div className="flex justify-between py-1">
                      <h3 className="text-[#aaa]">{data.location}</h3>
                      <div className=" flex items-center gap-1">
                        <span className="text-[#aaa]">123</span>
                        <CiBookmark className="size-6 text-[#aaa]" />
                      </div>
                    </div>
                    <div className="flex justify-between ">
                      <h3 className="text-[#aaa]">{data.field}</h3>
                      <div className=" flex items-center gap-1 underline text-red-600">
                        <span>{data.jobs.length} việc làm</span>
                        <FaLongArrowAltRight className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>Khoong tim thay</div>
      )}
    </div>
  );
}

export default SearchResult;
