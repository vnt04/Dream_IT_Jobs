import { useContext } from "react";
import NewBlogs from "../../components/NewBlogs";
import BestCompany from "./BestCompany";
import NewJobs from "./NewJobs";
import QuickSearch from "./QuickSearch";
import { DataContext } from "../../context/DataProvider";

function Home() {
  const { newBlogs } = useContext(DataContext);
  return (
    <div>
      <QuickSearch />
      <NewJobs />
      <BestCompany />
      <div className="py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl font-bold lg:text-2xl">Blog IT</h1>
          <a href="/blog" className="underline text-red-600">
            Xem tất cả
          </a>
        </div>
        <NewBlogs data={newBlogs} />
      </div>
    </div>
  );
}

export default Home;
