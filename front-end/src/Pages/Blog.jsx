import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

function Blog() {
  const { dataBlog } = useContext(DataContext);
  const rows = [];
  for (let i = 0; i < dataBlog.length; i += 5) {
    rows.push(dataBlog.slice(i, i + 5));
  }

  return (
    <div>
      <div className="h-96 relative flex justify-center">
        <img
          src="/src/assets/blog/banner.png"
          alt="blog"
          className="w-full h-full object-fill"
        />
        <div className="absolute bottom-[-10px] ">
          <h1 className="font-bold text-3xl text-center text-primary">
            Cẩm nang ngành Công nghệ thông tin
          </h1>
          <h5 className="text-center py-2">
            Khám phá thông tin hữu ích liên quan tới ngành công nghệ thông tin.
            Chia sẻ kinh nghiệm, kiến thức chuyên môn giúp bạn tìm được công
            việc phù hợp và phát triển bản thân.
          </h5>
        </div>
      </div>
      <div className="container flex gap-3 mt-5">
        <button className="menu-blog">Lập trình</button>
        <button className="menu-blog">Kinh nghiệm phỏng vấn</button>
        <button className="menu-blog">Tổng quan ngành IT</button>
        <button className="menu-blog">Kỹ năng viết CV</button>
        <button className="menu-blog">Xu hướng công nghệ</button>
      </div>
      <div className="container mt-5">
        <span className="text-2xl font-bold">Blog mới nhất</span>
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-4">
            {row.map((data, index) => (
              <div key={index} className="h-64 w-1/5 border rounded-xl mt-4">
                <div className="h-[55%] ">
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
                  <a href={data.link} className="font-bold line-clamp-2 hover:text-gray-600">
                    {data.title}
                  </a>
                  <div>{data.cre}</div>
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
