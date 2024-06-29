import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { compareDate, getRows } from "../utils";
import NewBlogs from "../components/NewBlogs";

function Blog() {
  const { dataBlog, newBlogs } = useContext(DataContext);
  const [stickyBlog, setStickyBlog] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);
  const [filter, setFilter] = useState("");
  const newFilter = dataFilter.slice(0, 4);
  const rows = filter === "" ? getRows(dataBlog, 4) : getRows(dataFilter, 4);

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
    <div>
      <div className="h-80 relative flex justify-center">
        <img
          src="/src/assets/blog/banner.jpg"
          alt="blog"
          className="w-full h-auto object-center"
        />
        <div className="absolute bottom-[5%] ">
          <h1 className="font-bold text-3xl text-center text-[#022941]">
            Cẩm nang ngành Công nghệ thông tin
          </h1>
          <h4 className="text-center px-96 text-black py-2">
            Khám phá thông tin hữu ích liên quan tới ngành công nghệ thông tin.
            Chia sẻ kinh nghiệm, kiến thức chuyên môn giúp bạn tìm được công
            việc phù hợp và phát triển bản thân.
          </h4>
        </div>
      </div>
      <div
        className={`container flex gap-3 my-4 ${stickyBlog ? "stickyBlog" : ""}`}
      >
        <button onClick={() => handleFilter("Lập trình")} className="menu-blog">
          Lập trình
        </button>
        <button
          onClick={() => handleFilter("Kinh nghiệm phỏng vấn")}
          className="menu-blog"
        >
          Kinh nghiệm phỏng vấn
        </button>
        <button
          onClick={() => handleFilter("Tổng quan ngành IT")}
          className="menu-blog"
        >
          Tổng quan ngành IT
        </button>
        <button
          onClick={() => handleFilter("Kỹ năng viết CV")}
          className="menu-blog"
        >
          Kỹ năng viết CV
        </button>
        <button
          onClick={() => handleFilter("Xu hướng công nghệ")}
          className="menu-blog"
        >
          Xu hướng công nghệ
        </button>
      </div>

      <div>
        <h1 className="container font-bold text-2xl">
          Blog mới nhất{"    "}
          <span className="font-bold text-primary text-[18px]"> {filter}</span>
        </h1>
        {filter === "" ? (
          <NewBlogs data={newBlogs} />
        ) : (
          <NewBlogs data={newFilter} />
        )}
      </div>

      {/* All blog */}
      <div className="container bg-[#f5f5f5] ">
        <span className="text-2xl font-bold">
          Tất cả blog{"    "}
          <span className="font-bold text-primary text-[18px]"> {filter}</span>
        </span>
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-4 ">
            {row.map((data, index) => (
              <div key={index} className="h-80 w-1/4 border rounded-xl mt-4 ">
                <div className="h-[50%] ">
                  <img
                    src={`/src/assets/blog/${data.poster}`}
                    alt="img"
                    className="w-full h-full rounded-tl-xl rounded-tr-xl"
                  />
                </div>
                <div className="mx-2 my-2">
                  <div className="font-semibold text-primary block">
                    {data.field}
                  </div>
                  <a
                    href={data.link}
                    className="font-bold line-clamp-2 hover:text-gray-600 "
                  >
                    {data.title}
                  </a>
                  <h5 className="text-sm line-clamp-2">{data.description}</h5>
                  <div className="flex justify-between mt-2 items-center">
                    <span className="font-semibold text-[#555]">
                      {data.cre}
                    </span>
                    <span className="text-[12px]">{data.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
