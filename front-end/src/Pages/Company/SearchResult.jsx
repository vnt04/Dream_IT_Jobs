import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CompanyCard from "../../components/CompanyCard";
import SearchCompany from "./SearchCompany";
import apiEndpoint from "../../api";
import { ClipLoader } from "react-spinners";

function SearchResult() {
  const [resultSearch, setResultSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchedKeyword = location.state.companyName;
  const selectedLocation = location.state.city;

  useEffect(() => {
    if (location.search.slice(1)) {
      setLoading(true);
      axios
        .get(
          `${apiEndpoint.search_company}?${location.search.slice(1).toString()}`,
        )
        .then((response) => {
          setResultSearch(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [location.search]);

  return (
    <div className="container">
      <SearchCompany />
      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader color="#33afa9" loading={loading} size={50} />
        </div>
      ) : resultSearch.length > 0 ? (
        <div>
          <div className="pt-4 font-semibold">
            Tìm thấy <span className="text-primary">{resultSearch.length}</span>{" "}
            công ty liên quan đến{" "}
            <span className="text-primary">{searchedKeyword}</span>
            {selectedLocation && (
              <span>
                <span> tại </span>
                <span className="text-primary"> {selectedLocation}</span>
              </span>
            )}
          </div>
          <div className="md:py-4">
            <CompanyCard companyList={resultSearch} />
          </div>
        </div>
      ) : (
        <div className="py-10 text-center font-bold">
          Xin lỗi! Không thể tìm thấy công ty nào liên quan đến{" "}
          <span className="text-primary">{searchedKeyword}</span>
          {selectedLocation && (
            <span>
              <span> tại </span>
              <span className="text-primary"> {selectedLocation}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
