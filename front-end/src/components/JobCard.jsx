/* eslint-disable react/prop-types */
import Tag from "./Tag";

function JobCard({ jobCard }) {
  return (
    <div className="">
      {jobCard.map((jobData) => (
        <div
          key={jobData._id}
          className="mb-4 flex h-40 cursor-pointer bg-white p-2"
        >
          <div className="w-1/3">
            <img
              src={`/src/assets/img-company/${jobData.company.logo}`}
              title=""
              className="h-full w-full object-contain p-5"
            />
          </div>
          <div className="w-2/3 space-y-2">
            <a
              href={`/viec-lam-it/${jobData._id}`}
              title={jobData.job_title}
              className="line-clamp-1 font-semibold hover:text-primary"
            >
              {jobData.job_title}
            </a>
            <div>{jobData.company.name}</div>
            <div className="line-clamp-1">{jobData.location}</div>

            <div className="flex justify-start space-x-2 overflow-hidden whitespace-nowrap">
              {jobData.tech_stack.map((tag, index) => (
                <Tag key={index} name={tag} />
              ))}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default JobCard;
