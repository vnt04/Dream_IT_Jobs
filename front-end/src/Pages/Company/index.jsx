import { useState } from "react";
import AllCompany from "./AllCompany";
import SearchCompany from "./SearchCompany";
import SearchResult from "./SearchResult";

function Company() {
  const [resultSearch, setResultSearch] = useState([]);

  return (
    <div className="container">
      <SearchCompany setResultSearch={setResultSearch} />
      <AllCompany resultSearch={resultSearch} />
      <SearchResult resultSearch={resultSearch} />
    </div>
  );
}

export default Company;
