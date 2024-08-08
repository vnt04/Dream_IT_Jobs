import ListJobs from "./ListJobs";
import Search from "./Search";

function Jobs() {
  return (
    <div>
      <Search />
      <div className="bg-[#f5f5f5]">
        <ListJobs />
      </div>
    </div>
  );
}

export default Jobs;
