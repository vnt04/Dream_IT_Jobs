import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/actions/blogActions";

import { compareDate } from "../../utils/index";
import NewBlogs from "../../components/NewBlogs";
import BestCompany from "./BestCompany";
import NewJobs from "./NewJobs";
import QuickSearch from "./QuickSearch";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  const { dataBlogs } = useSelector((state) => state.blog);
  const newBlogs = [...dataBlogs];
  newBlogs.sort((a, b) => compareDate(a.time, b.time));

  return (
    <div className="space-y-6">
      <div className="bg-[#acf2ed]">
        <QuickSearch />
      </div>
      <div className="bg-white">
        <NewJobs />
      </div>
      <div className="bg-[#f5f5f5] py-4">
        <BestCompany />
      </div>
      <div className="space-y-4 pb-10">
        <div className="container flex items-center justify-between">
          <h1 className="font-bold md:text-xl">Blog IT</h1>
          <a
            href={"/blog"}
            className="text-sm font-semibold text-red-400 underline hover:text-red-600 md:text-base"
          >
            Xem tất cả
          </a>
        </div>
        <NewBlogs data={newBlogs} />
      </div>
    </div>
  );
}

export default Home;
