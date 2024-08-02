import { useState } from "react";
import ListJobs from "./ListJobs";
import Search from "./Search";

function Jobs() {
  const [resultSearch, setResultSearch] = useState([]);
  const [showResult, setShowResult] = useState(false);
  return (
    <div>
      <Search setResultSearch={setResultSearch} setShowResult={setShowResult} />
      <div className="bg-[#f5f5f5]">
        <ListJobs resultSearch={resultSearch} showResult={showResult} />
      </div>
    </div>
  );
}

export default Jobs;
