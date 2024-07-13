/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Tag from "./Tag";

function JobCard({ jobCard }) {
  return (
    <div>
      {jobCard.map((jobData) => (
        <div
          key={jobData._id}
          className="h-40 flex border-b-[1px] py-5 cursor-pointer "
        >
          <div className="w-1/3">
            <img
              src={`/src/assets/img-company/${jobData.img}`}
              alt=""
              className="w-full h-full p-5"
            />
          </div>
          <div>
            <Link
              to={`/viec-lam-it/${jobData._id}`}
              className="font-bold text-[18px] line-clamp-1 hover:text-primary"
            >
              {jobData.job_title}
            </Link>
            <div className="my-1">{jobData.company}</div>
            <div className="my-1">{jobData.address}</div>
            
            <div className="flex gap-3 mt-2">
              {jobData.tag.map((tag, index) => (
                <Tag key={index} name={tag} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobCard;
