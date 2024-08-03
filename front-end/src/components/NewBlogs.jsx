/* eslint-disable react/prop-types */

function NewBlogs({ data }) {
  const blogs = data?.slice(1, 4);
  return (
    <div className="container max-md:space-y-4 md:grid md:grid-cols-2 md:gap-4">
      <div title={data[0]?.title} className="rounded-xl">
        <div className="zoom-container max-h-[60%]">
          <img
            src={`/src/assets/blog/${data[0]?.poster}`}
            alt=""
            className="zoom-image h-full w-full rounded-tl-xl rounded-tr-xl"
          />
        </div>
        <div className="py-1 font-bold text-primary">{data[0]?.field}</div>
        <a
          href={data[0]?.link}
          className="line-clamp-2 py-1 text-xl font-bold hover:text-gray-500"
        >
          {data[0]?.title}
        </a>
        <h4 className="line-clamp-3">{data[0]?.description}</h4>
        <div className="mt-2 flex justify-between">
          <span className="font-bold text-[#555]">{data[0]?.cre}</span>
          <span className="text-sm">{data[0]?.time}</span>
        </div>
        <hr />
      </div>

      <div className="space-y-4 md:grid md:grid-rows-3">
        {blogs.map((blog, index) => (
          <div title={blog.title} key={index} className="flex w-full space-x-4">
            <div className="zoom-container w-2/5">
              <img
                src={`/src/assets/blog/${blog.poster}`}
                alt=""
                className="zoom-image h-full w-full"
              />
            </div>
            <div className="w-3/5">
              <div className="font-semibold text-primary">{blog.field}</div>
              <a
                href={blog.link}
                className="line-clamp-2 font-semibold hover:text-gray-500"
              >
                {blog.title}
              </a>
              <h3 className="line-clamp-2 text-sm"> {blog.description}</h3>
              <div className="mt-2 flex justify-between">
                <span className="font-semibold text-[#555]">{blog.cre}</span>
                <span className="text-[12px]">{blog.time}</span>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewBlogs;
