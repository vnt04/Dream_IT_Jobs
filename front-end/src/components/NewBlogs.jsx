/* eslint-disable react/prop-types */

function NewBlogs({ data }) {
  const blogs = data?.slice(1, 4);
  return (
    <div className="container h-auto mb-4">
      <div className="flex items-center gap-4">
        <div className="h-[484px] w-1/2 rounded-xl ">
          <div className="h-[60%] zoom-container">
            <img
              src={`/src/assets/blog/${data[0]?.poster}`}
              alt=""
              className="w-full h-full rounded-tl-xl rounded-tr-xl zoom-image"
            />
          </div>
          <div className="font-bold text-primary py-1">{data[0]?.field}</div>
          <a
            href={data[0]?.link}
            className="font-bold text-xl py-1 line-clamp-2 hover:text-gray-500"
          >
            {data[0]?.title}
          </a>
          <h4 className="line-clamp-3">{data[0]?.description}</h4>
          <div className="flex justify-between mt-2">
            <span className="font-bold text-[#555]">{data[0]?.cre}</span>
            <span className="text-sm">{data[0]?.time}</span>
          </div>
        </div>

        <div className="h-[484px] w-1/2">
          {blogs.map((blog, index) => (
            <div key={index} className="h-[33%] w-full flex gap-3 mb-2 ">
              <div className="h-full w-2/5 zoom-container">
                <img
                  src={`/src/assets/blog/${blog.poster}`}
                  alt=""
                  className="w-full h-full zoom-image"
                />
              </div>
              <div className="w-3/5">
                <div className="font-semibold text-primary">{blog.field}</div>
                <a
                  href={blog.link}
                  className="font-semibold line-clamp-2 hover:text-gray-500"
                >
                  {blog.title}
                </a>
                <h3 className="line-clamp-2 text-sm"> {blog.description}</h3>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold text-[#555]">{blog.cre}</span>
                  <span className="text-[12px]">{blog.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewBlogs;
