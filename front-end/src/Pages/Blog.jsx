import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { compareDate } from "../utils/index";
import NewBlogs from "../components/NewBlogs";
import { FaFilter } from "react-icons/fa";

function Blog() {
  const { dataBlog, newBlogs } = useContext(DataContext);
  const [stickyBlog, setStickyBlog] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterMobile, setFilterMobile] = useState(false);
  const newFilter = dataFilter.slice(0, 4);

  const getDataFilter = (input) => {
    const data = [];
    dataBlog.map((blog) => {
      if (blog.field === input) {
        data.push(blog);
      }
    });
    return data.sort((a, b) => compareDate(a.time, b.time));
  };
  const handleFilter = (filter) => {
    setFilter(filter);
    if (filter !== "") {
      setDataFilter(getDataFilter(filter));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (filter !== "") {
      setDataFilter(getDataFilter(filter));
    }
  }, [filter]);
  const toggleVisibility = () => {
    if (window.pageYOffset > 350) {
      setStickyBlog(true);
    } else {
      setStickyBlog(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div className="w-full">
      <div className="relative flex max-h-80 justify-center">
        <img
          src="/src/assets/blog/banner.jpg"
          alt="blog"
          className="w-full max-w-[1680px] object-fill"
        />
        <div className="absolute bottom-[5%] max-w-[60%] text-center">
          <h1 className="font-bold md:text-2xl lg:text-3xl">
            Cẩm nang ngành Công Nghệ Thông Tin
          </h1>
          <h4 className="text-balance text-black max-md:hidden">
            Khám phá thông tin hữu ích liên quan tới ngành công nghệ thông tin.
            Chia sẻ kinh nghiệm, kiến thức chuyên môn giúp bạn tìm được công
            việc phù hợp và phát triển bản thân.
          </h4>
        </div>
      </div>

      <div
        className={`w-full bg-white ${stickyBlog ? "fixed top-20 z-[1000] opacity-100 shadow-lg" : ""}`}
      >
        <div className={`container hidden h-14 justify-between lg:flex`}>
          {[
            "Lập trình",
            "Kinh nghiệm phỏng vấn",
            "Tổng quan ngành IT",
            "Kỹ năng viết CV",
            "Xu hướng công nghệ",
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => {
                handleFilter(topic);
              }}
              className="my-3 rounded-2xl border px-3 shadow-sm hover:bg-gray-50 hover:text-primary"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Filter for medium screen */}
      <div className="relative mr-2 flex justify-end py-2 lg:hidden">
        <button
          onClick={() => {
            setFilterMobile(!filterMobile);
          }}
          className="flex items-center space-x-2 rounded-xl border-2 border-primary px-6 py-2 hover:bg-gray-200"
        >
          <FaFilter />
          <span className="font-bold">Bộ lọc</span>
        </button>

        <div
          className={`${filterMobile ? "" : "hidden"} absolute right-0 top-[90%] z-50 space-y-2 rounded-lg border-2 bg-white px-4 shadow-lg`}
        >
          {[
            "Lập trình",
            "Kinh nghiệm phỏng vấn",
            "Tổng quan ngành IT",
            "Kỹ năng viết CV",
            "Xu hướng công nghệ",
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => {
                handleFilter(topic);
                setFilterMobile(false);
              }}
              className="block w-full hover:text-primary"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h1 className="container text-2xl font-bold">
          Blog mới nhất{"    "}
          <span className="text-[18px] font-bold text-primary"> {filter}</span>
        </h1>
        {filter === "" ? (
          <NewBlogs data={newBlogs} />
        ) : (
          <NewBlogs data={newFilter} />
        )}
      </div>

      {/* All blog */}
      <div className="bg-[#f5f5f5] py-4">
        <div className="container">
          <span className="text-2xl font-bold">
            Tất cả blog{"    "}
            <span className="text-[18px] font-bold text-primary">
              {" "}
              {filter}
            </span>
          </span>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dataBlog.map((data, index) => (
              <div key={index} className="h-80 rounded-xl border-2">
                <div className="h-[50%]">
                  <img
                    src={`/src/assets/blog/${data.poster}`}
                    alt="img"
                    className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
                  />
                </div>
                <div className="mx-2 my-2">
                  <div className="line-clamp-1 font-semibold text-primary">
                    {data.field}
                  </div>
                  <a
                    href={data.link}
                    className="line-clamp-2 font-semibold hover:text-gray-600"
                  >
                    {data.title}
                  </a>
                  <h5 className="line-clamp-2 text-sm">{data.description}</h5>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-[#555]">
                      {data.cre}
                    </span>
                    <span className="text-[12px]">{data.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
